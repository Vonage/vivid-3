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
	section: 'history' | 'font' | 'text-style';
	order: number;

	render(ctx: ToolbarCtx): HTMLElement | DocumentFragment;
}

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
		icon: string;
		active?: Prop<boolean>;
		disabled?: Prop<boolean>;
		onClick?: () => void;
	}
) => {
	const button = ctx.rte.createComponent(Button);
	button.size = 'super-condensed';
	ctx.bindProp(
		props.active ?? false,
		(active) => (button.appearance = active ? 'filled' : 'ghost-light')
	);
	if (props.disabled) {
		ctx.bindProp(props.disabled, (disabled) => (button.disabled = disabled));
	}
	if (props.onClick) {
		button.addEventListener('click', () => {
			props.onClick!();
			ctx.view.focus();
		});
	}
	button.icon = props.icon;
	ctx.bindProp(props.label, (label) => (button.ariaLabel = label));
	const tooltip = createTooltip(ctx, { label: props.label });
	button.slot = 'anchor';
	tooltip.appendChild(button);
	return tooltip;
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
	}
) => {
	const option = ctx.rte.createComponent(ListboxOption);
	option.value = props.value;
	ctx.bindProp(props.text, (text) => (option.text = text));
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
	ctx.bindProp(props.value, (value) => (select.value = value));
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
