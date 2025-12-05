import type { EditorView } from 'prosemirror-view';
import { MarkType } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands';
import { Button } from '../../../button/button';
import { RteInstanceImpl } from '../instance';
import { Tooltip } from '../../../tooltip/tooltip';
import { Menu } from '../../../menu/menu';
import { MenuItem } from '../../../menu-item/menu-item';
import { Select } from '../../../select/select';
import { ListboxOption } from '../../../option/option';
import { Divider } from '../../../divider/divider';
import { TextField } from '../../../text-field/text-field';

// UI element rendering inside the editor
// Rendered is done using direct DOM manipulation instead of FAST to be able to use ProseMirror's render cycle and state.
// All elements are rendered within a UiCtx, which connects them to the editor.

// Props can be static values or functions that derive values on each state update
type Prop<T> = T | ((ctx: UiCtx) => T);
const isPropBinding = <T>(prop: Prop<T>): prop is (ctx: UiCtx) => T =>
	typeof prop === 'function';
type Props<T> = {
	[P in keyof T]: Prop<T[P]>;
};

type EventBinding = [
	string,
	unknown,
	(value: unknown) => (event: Event) => void
];
const on = <E extends keyof HTMLElementEventMap, T>(
	event: E,
	prop: T | undefined,
	handler: (value: T) => (event: HTMLElementEventMap[E]) => void
): EventBinding => [event, prop, handler as any];

/// Props available to all elements inside the context
type CtxProps = {
	popupPlacement: 'top' | 'bottom';
};

export class UiCtx {
	constructor(
		readonly view: EditorView,
		readonly rte: RteInstanceImpl,
		readonly props: Props<CtxProps>
	) {}

	/// Evaluates a prop, returning its current value.
	evalProp<T>(prop: Prop<T>): T {
		return isPropBinding(prop) ? prop(this) : prop;
	}

	private bindings: Array<() => void> = [];

	/// On every state change, prop is re-evaluated and passed to bindFn.
	bindProp<T>(prop: Prop<T> | undefined, bindFn: (value: T) => void) {
		if (prop === undefined) {
			return;
		} else if (isPropBinding(prop)) {
			const binding = () => bindFn(prop(this));
			this.bindings.push(binding);
			binding();
		} else {
			bindFn(prop);
		}
	}

	/// To be called on each state update to refresh all bindings.
	updateBindings() {
		for (const binding of this.bindings) {
			binding();
		}
	}

	/// Utility to more conveniently bind props to elements
	bindToEl<T extends Node>(
		target: T,
		props: Partial<Props<T>> = {},
		events: EventBinding[] = [],
		children: Array<Node> = []
	) {
		for (const name in props) {
			this.bindProp(props[name], (value) => {
				(target as any)[name] = value;
			});
		}
		for (const [name, value, bindFn] of events) {
			if (value) {
				target.addEventListener(name, bindFn(value));
			}
		}
		for (const child of children) {
			target.appendChild(child);
		}
	}
}

export const createDiv = (
	ctx: UiCtx,
	props: { className?: string; slot?: string; children: Array<Node> }
) => {
	const div = document.createElement('div');
	ctx.bindToEl(
		div,
		{
			className: props.className,
			slot: props.slot,
		},
		[],
		props.children
	);
	return div;
};

export const createAnchor = (
	ctx: UiCtx,
	props: {
		href: Prop<string>;
		target?: string;
		rel?: string;
		className?: string;
		children: Array<Node>;
	}
) => {
	const anchor = document.createElement('a');
	ctx.bindToEl(
		anchor,
		{
			href: props.href,
			target: props.target,
			rel: props.rel,
			className: props.className,
		},
		[],
		props.children
	);
	return anchor;
};

// Allow elements anchored elements to find their target in the wrapper
const wrapperTargets = new WeakMap<HTMLElement, HTMLElement>();

export const createOptionalTooltip = (
	ctx: UiCtx,
	props: {
		enabled: Prop<boolean>;
		label: Prop<string>;
		anchor: HTMLElement;
		slot?: string;
	}
) => {
	const tooltip = ctx.rte.createComponent(Tooltip);
	tooltip.setAttribute('exportparts', 'vvd-theme-alternate');
	ctx.bindToEl(tooltip, {
		className: 'ui-tooltip',
		text: props.label,
		placement: ctx.props.popupPlacement,
	});

	ctx.bindProp(props.enabled, (enabled) => {
		if (!enabled) {
			tooltip.open = false;
		}
		tooltip.anchor = enabled ? props.anchor : undefined;
	});

	const wrapper = createDiv(ctx, {
		className: 'ui-tooltip-wrapper',
		slot: props.slot,
		children: [props.anchor, tooltip],
	});
	wrapperTargets.set(wrapper, props.anchor);
	return wrapper;
};

export const createButton = (
	ctx: UiCtx,
	props: {
		variant?: Prop<'toolbar' | 'popover' | 'popover-primary'>;
		label: Prop<string>;
		icon?: Prop<string>;
		noTooltip?: boolean;
		autofocus?: Prop<boolean>;
		slot?: string;
		active?: Prop<boolean>;
		disabled?: Prop<boolean>;
		connotation?: Prop<'alert'>;
		onClick?: () => void | boolean;
	}
) => {
	const variant = () => ctx.evalProp(props.variant) ?? 'toolbar';
	const size = () =>
		variant() === 'toolbar' ? 'super-condensed' : 'condensed';
	const appearanceInactive = () =>
		variant() === 'popover-primary' ? 'outlined' : 'ghost-light';
	const appearance = () =>
		ctx.evalProp(props.active) ? 'filled' : appearanceInactive();

	const button = ctx.rte.createComponent(Button);
	ctx.bindToEl(
		button,
		{
			size,
			appearance,
			disabled: props.disabled,
			icon: props.icon,
			autofocus: props.autofocus,
			connotation: props.connotation,
			[props.icon ? 'ariaLabel' : 'label']: props.label,
		},
		[
			on('click', props.onClick, (onClick) => () => {
				if (!onClick()) {
					ctx.view.focus();
				}
			}),
		]
	);

	return createOptionalTooltip(ctx, {
		enabled: () =>
			Boolean(ctx.evalProp(props.icon) && !ctx.evalProp(props.noTooltip)),
		label: props.label,
		anchor: button,
		slot: props.slot,
	});
};

export const createMenu = (
	ctx: UiCtx,
	props: {
		label: Prop<string>;
		trigger: HTMLElement;
		children: Array<HTMLElement>;
	}
) => {
	const menu = ctx.rte.createComponent(Menu);
	ctx.bindToEl(
		menu,
		{
			className: 'ui-menu',
			autoDismiss: true,
			ariaLabel: props.label,
			anchor: wrapperTargets.get(props.trigger) ?? props.trigger,
			placement: ctx.props.popupPlacement,
		},
		[],
		props.children
	);

	const fragment = document.createDocumentFragment();
	fragment.appendChild(props.trigger);
	fragment.appendChild(menu);
	return fragment;
};

export const createMenuItem = (
	ctx: UiCtx,
	props: {
		text: Prop<string>;
		checked: Prop<boolean>;
		disabled?: Prop<boolean>;
		onSelect: () => void;
	}
) => {
	const item = ctx.rte.createComponent(MenuItem);
	ctx.bindToEl(
		item,
		{
			text: props.text,
			checked: props.checked,
			disabled: props.disabled,
			controlType: 'radio',
			checkedAppearance: 'tick-only',
		},
		[
			on('change', props.onSelect, (onSelect) => () => {
				if (item.checked && !item.disabled) {
					// Ignore non-user initiated change events
					if (ctx.evalProp(props.checked) !== item.checked) {
						onSelect();
						ctx.view.focus();
					}
				}
			}),
		]
	);
	return item;
};

export const createButtonGroup = (
	ctx: UiCtx,
	props: {
		children: Array<Node>;
	}
) =>
	createDiv(ctx, {
		className: 'ui-button-group',
		children: props.children,
	});

function markActive(state: EditorState, type: MarkType) {
	const { from, $from, to, empty } = state.selection;
	if (empty) return !!type.isInSet(state.storedMarks || $from.marks());
	else return state.doc.rangeHasMark(from, to, type);
}

export const createMarkToggle = (
	ctx: UiCtx,
	props: {
		label: Prop<string>;
		icon: string;
		markType: MarkType;
	}
) =>
	createButton(ctx, {
		label: props.label,
		icon: props.icon,
		active: () => markActive(ctx.view.state, props.markType),
		disabled: () => !toggleMark(props.markType)(ctx.view.state),
		onClick: () => {
			toggleMark(props.markType)(ctx.view.state, ctx.view.dispatch);
		},
	});

export const createOption = (
	ctx: UiCtx,
	props: {
		text: Prop<string>;
		value: string;
		disabled?: Prop<boolean>;
	}
) => {
	const option = ctx.rte.createComponent(ListboxOption);
	ctx.bindToEl(option, {
		value: props.value,
		text: props.text,
		disabled: props.disabled,
	});
	return option;
};

export const createSelect = (
	ctx: UiCtx,
	props: {
		label: Prop<string>;
		value: Prop<string>;
		children: Array<HTMLElement>;
		onSelect: (value: string) => void;
	}
) => {
	const select = ctx.rte.createComponent(Select);
	select.setAttribute('data-class', 'ui-select'); // Cannot use CSS class since Select overwrites it with "base"
	ctx.bindToEl(
		select,
		{
			placeholder: ' ',
			ariaLabel: props.label,
			scale: 'condensed',
			appearance: 'ghost',
		},
		[
			on('change', props.onSelect, (onSelect) => () => {
				const value = select.value;
				if (value) {
					onSelect(value);
					ctx.view.focus();
				}
			}),
		],
		props.children
	);
	queueMicrotask(() => {
		// Wait until select has recognized its options before setting value
		ctx.bindProp(props.value, (value) => (select.value = value));
	});

	let hideTooltip = false;
	select.addEventListener('vwc-popup:open', () => {
		hideTooltip = true;
		ctx.updateBindings();
	});
	select.addEventListener('vwc-popup:close', () => {
		hideTooltip = false;
		ctx.updateBindings();
	});
	return createOptionalTooltip(ctx, {
		enabled: () => !hideTooltip,
		label: props.label,
		anchor: select,
	});
};

export const createDivider = (ctx: UiCtx) => {
	const divider = ctx.rte.createComponent(Divider);
	ctx.bindToEl(divider, {
		className: 'ui-divider',
		orientation: 'vertical',
	});
	return divider;
};

export const createTextField = (
	ctx: UiCtx,
	props: {
		label: Prop<string>;
		value: Prop<string>;
		placeholder?: Prop<string>;
		slot?: string;
		autofocus?: boolean;
		type?: 'url';
		onInput?: (value: string) => void;
	}
) => {
	const textField = ctx.rte.createComponent(TextField);
	ctx.bindToEl(
		textField,
		{
			label: props.label,
			value: props.value,
			placeholder: props.placeholder,
			slot: props.slot,
			autofocus: props.autofocus,
			type: props.type,
		},
		[
			on('input', props.onInput, (onInput) => () => {
				onInput(textField.value);
			}),
		]
	);
	return textField;
};

export const createText = (ctx: UiCtx, props: { text: Prop<string> }) => {
	const textNode = document.createTextNode('');
	ctx.bindToEl(textNode, {
		textContent: props.text,
	});
	return textNode;
};

/// Creates a slot expecting a single assigned element. Binds provided props and events to the slotted element.
export const createSingleSlot = (
	ctx: UiCtx,
	props: {
		name: string;
		assignedProps: Record<string, Prop<any>>;
		assignedEvents: Record<string, (e: Event) => void>;
	}
) => {
	const slot = document.createElement('slot');
	slot.name = props.name;

	let currentEl: Element | null = null;
	const listeners: Array<{
		el: Element;
		type: string;
		handler: EventListener;
	}> = [];

	function cleanup() {
		for (const { el, type, handler } of listeners) {
			el.removeEventListener(type, handler);
		}
		listeners.length = 0;
		currentEl = null;
	}

	for (const [key, prop] of Object.entries(props.assignedProps)) {
		ctx.bindProp(prop, (value) => {
			if (currentEl) {
				(currentEl as any)[key] = value;
			}
		});
	}

	function applyPropsAndEvents(el: Element) {
		for (const [key, prop] of Object.entries(props.assignedProps)) {
			(el as any)[key] = ctx.evalProp(prop);
		}
		for (const [type, handler] of Object.entries(props.assignedEvents)) {
			const listener: EventListener = (e) => {
				handler(e);
				ctx.view.focus();
			};
			el.addEventListener(type, listener);
			listeners.push({ el, type, handler: listener });
		}
	}

	const processSlot = () => {
		const assigned = slot.assignedElements({ flatten: true });
		const first = assigned[0];
		if (first === currentEl) return; // nothing changed
		cleanup();
		if (first) {
			currentEl = first;
			applyPropsAndEvents(first);
		}
	};

	slot.addEventListener('slotchange', processSlot);

	// Initial binding after microtask (in case slot content already present)
	queueMicrotask(processSlot);

	return slot;
};
