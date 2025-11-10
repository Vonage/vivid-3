import type { EditorView } from 'prosemirror-view';
import { MarkType } from 'prosemirror-model';
import { EditorState } from 'prosemirror-state';
import { toggleMark } from 'prosemirror-commands';
import { Button } from '../../../button/button';
import { RTEInstance } from '../instance';
import { Tooltip } from '../../../tooltip/tooltip';
import { Menu } from '../../../menu/menu';
import { MenuItem } from '../../../menu-item/menu-item';
import { Select } from '../../../select/select';
import { ListboxOption } from '../../../option/option';
import { Divider } from '../../../divider/divider';
import { TextField } from '../../../text-field/text-field';

// Props can be static values or functions that derive values on each state update
type Prop<T> = T | ((ctx: ToolbarCtx) => T);
const isPropBinding = <T>(prop: Prop<T>): prop is (ctx: ToolbarCtx) => T =>
	typeof prop === 'function';

export class ToolbarCtx {
	constructor(readonly view: EditorView, readonly rte: RTEInstance) {}

	private bindings: Array<() => void> = [];
	bindProp<T>(prop: Prop<T>, bindFn: (value: T) => void) {
		if (isPropBinding(prop)) {
			const binding = () => bindFn(prop(this));
			this.bindings.push(binding);
			binding();
		} else {
			bindFn(prop);
		}
	}

	evalProp<T>(prop: Prop<T>): T {
		return isPropBinding(prop) ? prop(this) : prop;
	}

	updateBindings() {
		for (const binding of this.bindings) {
			binding();
		}
	}
}

export interface ToolbarItemSpec {
	section: 'history' | 'font' | 'text-style' | 'textblock' | 'insert';
	order: number;

	render(ctx: ToolbarCtx): HTMLElement | DocumentFragment;
}

export const createDiv = (
	ctx: ToolbarCtx,
	props: { className?: string; slot?: string; children: Array<Node> }
) => {
	const div = document.createElement('div');
	if (props.className) {
		div.className = props.className;
	}
	if (props.slot) {
		div.slot = props.slot;
	}
	for (const child of props.children) {
		div.appendChild(child);
	}
	return div;
};

export const createAnchor = (
	ctx: ToolbarCtx,
	props: {
		href: Prop<string>;
		target?: string;
		rel?: string;
		className?: string;
		children: Array<Node>;
	}
) => {
	const anchor = document.createElement('a');
	ctx.bindProp(props.href, (href) => (anchor.href = href));
	if (props.target) {
		anchor.target = props.target;
	}
	if (props.rel) {
		anchor.rel = props.rel;
	}
	if (props.className) {
		anchor.className = props.className;
	}
	for (const child of props.children) {
		anchor.appendChild(child);
	}
	return anchor;
};

export const createTooltip = (
	ctx: ToolbarCtx,
	props: { label: Prop<string> }
) => {
	const tooltip = ctx.rte.createComponent(Tooltip);
	tooltip.setAttribute('exportparts', 'vvd-theme-alternate');
	ctx.bindProp(props.label, (label) => (tooltip.text = label));
	return tooltip;
};

export const createButton = (
	ctx: ToolbarCtx,
	props: {
		label: Prop<string>;
		icon?: Prop<string>;
		noTooltip?: boolean;
		autofocus?: Prop<boolean>;
		slot?: string;
		active?: Prop<boolean>;
		disabled?: Prop<boolean>;
		connotation?: Prop<'alert'>;
		appearance?: Prop<'outlined'>;
		size?: Prop<'condensed'>;
		onClick?: () => void | boolean;
	}
) => {
	const button = ctx.rte.createComponent(Button);
	ctx.bindProp(
		props.size ?? ('super-condensed' as const),
		(size) => (button.size = size)
	);
	ctx.bindProp(
		props.active ?? false,
		(active) => (button.appearance = active ? 'filled' : 'ghost-light')
	);
	if (props.disabled) {
		ctx.bindProp(props.disabled, (disabled) => (button.disabled = disabled));
	}
	if (props.onClick) {
		button.addEventListener('click', () => {
			if (!props.onClick!()) {
				ctx.view.focus();
			}
		});
	}
	ctx.bindProp(props.icon, (icon) => (button.icon = icon));
	if (props.autofocus) {
		ctx.bindProp(
			props.autofocus,
			(autofocus) => (button.autofocus = autofocus)
		);
	}
	if (props.icon) {
		ctx.bindProp(props.label, (label) => (button.ariaLabel = label));
	} else {
		ctx.bindProp(props.label, (label) => (button.label = label));
	}
	if (props.connotation) {
		ctx.bindProp(
			props.connotation,
			(connotation) => (button.connotation = connotation)
		);
	}
	if (props.appearance) {
		ctx.bindProp(
			props.appearance,
			(appearance) => (button.appearance = appearance)
		);
	}
	let element: HTMLElement = button;
	if (props.icon && !props.noTooltip) {
		const tooltip = createTooltip(ctx, { label: props.label });
		button.slot = 'anchor';
		tooltip.appendChild(button);
		element = tooltip;
	}
	if (props.slot) {
		element.slot = props.slot;
	}
	return element;
};

export const createMenu = (
	ctx: ToolbarCtx,
	props: {
		label: Prop<string>;
		trigger: HTMLElement;
		children: Array<HTMLElement>;
	}
) => {
	const menu = ctx.rte.createComponent(Menu);
	menu.autoDismiss = true;
	ctx.bindProp(props.label, (label) => (menu.ariaLabel = label));
	props.trigger.slot = 'anchor';
	menu.appendChild(props.trigger);
	for (const child of props.children) {
		menu.appendChild(child);
	}
	return menu;
};

export const createMenuItem = (
	ctx: ToolbarCtx,
	props: {
		text: Prop<string>;
		checked: Prop<boolean>;
		disabled?: Prop<boolean>;
		onSelect: () => void;
	}
) => {
	const item = ctx.rte.createComponent(MenuItem);
	item.controlType = 'radio';
	ctx.bindProp(props.text, (text) => (item.text = text));
	ctx.bindProp(props.checked, (checked) => (item.checked = checked));
	if (props.disabled) {
		ctx.bindProp(props.disabled, (disabled) => (item.disabled = disabled));
	}
	item.checkedAppearance = 'tick-only';
	item.addEventListener('change', () => {
		if (item.checked && !item.disabled) {
			// Ignore non-user initiated change events
			if (ctx.evalProp(props.checked) !== item.checked) {
				props.onSelect();
				ctx.view.focus();
			}
		}
	});
	return item;
};

function markActive(state: EditorState, type: MarkType) {
	const { from, $from, to, empty } = state.selection;
	if (empty) return !!type.isInSet(state.storedMarks || $from.marks());
	else return state.doc.rangeHasMark(from, to, type);
}

export const createMarkToggle = (
	ctx: ToolbarCtx,
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
	ctx: ToolbarCtx,
	props: {
		text: Prop<string>;
		value: string;
		disabled?: Prop<boolean>;
	}
) => {
	const option = ctx.rte.createComponent(ListboxOption);
	option.value = props.value;
	ctx.bindProp(props.text, (text) => (option.text = text));
	if (props.disabled) {
		ctx.bindProp(props.disabled, (disabled) => (option.disabled = disabled));
	}
	return option;
};

export const createSelect = (
	ctx: ToolbarCtx,
	props: {
		label: Prop<string>;
		value: Prop<string>;
		children: Array<HTMLElement>;
		onSelect: (value: string) => void;
	}
) => {
	const select = ctx.rte.createComponent(Select);
	select.className = 'toolbar-select';
	select.placeholder = ' ';
	ctx.bindProp(props.label, (label) => (select.ariaLabel = label));
	select.scale = 'condensed';
	select.appearance = 'ghost';
	for (const child of props.children) {
		select.appendChild(child);
	}
	queueMicrotask(() => {
		// Wait until select has recognized its options before setting value
		ctx.bindProp(props.value, (value) => (select.value = value));
	});
	select.addEventListener('change', () => {
		const value = select.value;
		if (value) {
			props.onSelect(value);
			ctx.view.focus();
		}
	});
	const tooltip = createTooltip(ctx, { label: props.label });
	const fragment = document.createDocumentFragment();
	fragment.appendChild(select);
	fragment.appendChild(tooltip);
	tooltip.anchor = select;
	// Hide tooltip while select is open
	select.addEventListener('vwc-popup:open', () => {
		tooltip.open = false;
		tooltip.anchor = undefined;
	});
	select.addEventListener('vwc-popup:close', () => {
		tooltip.anchor = select;
	});
	return fragment;
};

export const createDivider = (ctx: ToolbarCtx) => {
	const divider = ctx.rte.createComponent(Divider);
	divider.className = 'toolbar-divider';
	divider.orientation = 'vertical';
	return divider;
};

export const createTextField = (
	ctx: ToolbarCtx,
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
	ctx.bindProp(props.label, (label) => (textField.label = label));
	ctx.bindProp(props.value, (value) => (textField.value = value));
	if (props.placeholder) {
		ctx.bindProp(
			props.placeholder,
			(placeholder) => (textField.placeholder = placeholder)
		);
	}
	if (props.slot) {
		textField.slot = props.slot;
	}
	if (props.autofocus) {
		textField.autofocus = true;
	}
	if (props.type) {
		textField.type = props.type;
	}
	if (props.onInput) {
		textField.addEventListener('input', () => {
			props.onInput!(textField.value);
		});
	}
	return textField;
};

export const createText = (ctx: ToolbarCtx, props: { text: Prop<string> }) => {
	const textNode = document.createTextNode('');
	ctx.bindProp(props.text, (text) => (textNode.textContent = text));
	return textNode;
};

/// Creates a slot expecting a single assigned element. Binds provided props and events to the slotted element.
export const createSingleSlot = (
	ctx: ToolbarCtx,
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
