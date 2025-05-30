import { elements, html, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { applyHostSemantics } from '../../shared/aria/host-semantics';
import { MenuItem } from './menu-item';
import { MenuItemRole } from './menu-item-role';
import { menuName } from '../menu/name';

const getIndicatorIcon = (x: MenuItem) => {
	if (x.checkedAppearance === 'tick-only') {
		return x.checked ? 'check-line' : '';
	}

	const iconType = x.controlType === 'checkbox' ? 'checkbox' : 'radio';
	const iconStatus = x.checked ? 'checked' : 'unchecked';
	return `${iconType}-${iconStatus}-2-line`;
};

const getClasses = ({
	connotation,
	disabled,
	checked,
	controlType,
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
		['selected', Boolean(controlType && checked)],
		['trailing', Boolean(controlType && (checkTrailing || Boolean(icon)))],
		['item-checkbox', controlType === 'checkbox'],
		['item-radio', controlType === 'radio'],
		['two-lines', Boolean(text?.length) && Boolean(textSecondary?.length)],
		['has-meta', Boolean(metaSlottedContent?.length)]
	);

function checkIndicator(context: VividElementDefinitionContext) {
	const iconTag = context.tagFor(Icon);

	return html<MenuItem>`${when(
		(x) => Boolean(x.controlType),
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
				ariaChecked: (x) => (x.controlType ? x.checked : void 0),
				ariaDisabled: (x) => x.disabled,
				ariaExpanded: (x) => x.expanded,
			})}
			@keydown="${(x, c) => x.handleMenuItemKeyDown(c.event as KeyboardEvent)}"
			@click="${(x, c) => x.handleMenuItemClick(c.event as MouseEvent)}"
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
