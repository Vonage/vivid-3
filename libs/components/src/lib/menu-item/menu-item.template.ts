import {
	elements,
	ExecutionContext,
	html,
	slotted,
	when,
} from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { Icon } from '../icon/icon';
import { menuName } from '../menu/definition';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { applyHostSemantics } from '../../shared/aria/host-semantics';
import { MenuItem } from './menu-item';
import { MenuItemRole } from './menu-item-role';

const getIndicatorIcon = (x: MenuItem) => {
	if (x.checkedAppearance === 'tick-only') {
		return x.checked ? 'check-line' : '';
	}

	const iconType =
		x.role === MenuItemRole.menuitemcheckbox || x.role === MenuItemRole.checkbox
			? 'checkbox'
			: 'radio';
	const iconStatus = x.checked ? 'checked' : 'unchecked';
	return `${iconType}-${iconStatus}-2-line`;
};

const getClasses = ({
	connotation,
	disabled,
	checked,
	role,
	text,
	textSecondary,
	icon,
	metaSlottedContent,
	checkTrailing,
}: MenuItem) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		['disabled', Boolean(disabled)],
		['selected', role !== MenuItemRole.menuitem && Boolean(checked)],
		[
			'trailing',
			role !== MenuItemRole.menuitem && (checkTrailing || Boolean(icon)),
		],
		['item-checkbox', role === MenuItemRole.menuitemcheckbox],
		['item-checkbox', role === MenuItemRole.checkbox],
		['item-radio', role === MenuItemRole.menuitemradio],
		['item-radio', role === MenuItemRole.radio],
		['two-lines', Boolean(text?.length) && Boolean(textSecondary?.length)],
		['has-meta', Boolean(metaSlottedContent?.length)]
	);

function handleClick(x: MenuItem, { event }: ExecutionContext<MenuItem>) {
	if (x._isSyntheticClickEvent(event)) {
		// Ignore synthetic events created through keyboard input
		return true;
	}

	x.handleMenuItemClick(event as MouseEvent);
	return (x as any).role === MenuItemRole.presentation;
}

function checkIndicator(context: VividElementDefinitionContext) {
	const iconTag = context.tagFor(Icon);

	return html<MenuItem>`${when(
		(x) =>
			x.role === MenuItemRole.menuitemcheckbox ||
			x.role === MenuItemRole.checkbox ||
			x.role === MenuItemRole.menuitemradio ||
			x.role === MenuItemRole.radio,
		html`<span class="action"><${iconTag} class="icon" name="${(x) =>
			getIndicatorIcon(x)}"></${iconTag}></span>`
	)}`;
}

function text() {
	return html<MenuItem>`${when(
		(x) => x.text || x.textSecondary,
		html`<span class="text">
			${when(
				(x) => x.text,
				html`<span class="text-primary">${(x) => x.text}</span>`
			)}
			${when(
				(x) => x.textSecondary,
				html`<span class="text-secondary">${(x) => x.textSecondary}</span>`
			)}
		</span>`
	)}`;
}

export const MenuItemTemplate = (context: VividElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const iconTag = context.tagFor(Icon);

	return html<MenuItem>`
		<template
			${applyHostSemantics({
				role: MenuItemRole.menuitem,
				ariaHasPopup: (x) => (x.hasSubmenu ? 'menu' : void 0),
				ariaChecked: (x) =>
					x.role !== MenuItemRole.menuitem ? x.checked : void 0,
				ariaDisabled: (x) => x.disabled,
				ariaExpanded: (x) => x.expanded,
			})}
			@keydown="${(x, c) => x.handleMenuItemKeyDown(c.event as KeyboardEvent)}"
			@click="${handleClick}"
			@mouseover="${(x, c) => x.handleMouseOver(c.event as MouseEvent)}"
			@mouseout="${(x, c) => x.handleMouseOut(c.event as MouseEvent)}"
		>
			<div class="${getClasses}">
				<slot name="meta" ${slotted('metaSlottedContent')}></slot>
				${checkIndicator(context)}
				${when(
					(x) => x.icon,
					html`<span class="decorative"
						>${(x) => affixIconTemplate(x.icon)}</span
					>`
				)}
				${text()}
				<slot
					name="trailing-meta"
					${slotted('trailingMetaSlottedContent')}
				></slot>
				${when(
					(x) => x.hasSubmenu,
					html`<${iconTag} class="chevron" name="chevron-right-line"></${iconTag}>`
				)}
			</div>
			<slot
				name="submenu"
				${slotted({
					property: 'slottedSubmenu',
					filter: elements(context.tagForNonDependency(menuName)),
				})}
			></slot>
		</template>
	`;
};
