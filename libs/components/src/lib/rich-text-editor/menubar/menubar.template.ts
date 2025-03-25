import { html, repeat } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { MenuBar } from './menubar.js';

const MENU_BAR_ITEMS: { [key: string]: ViewTemplate<any, any> } = {
	textSize: html`<vwc-button icon="text-size-line"></vwc-button>`,
}

const getClasses = (_: MenuBar) => classNames('control');

const validItems = ['textSize'];

function createMenuItem(item: string) {
	return MENU_BAR_ITEMS[item] || html`<br/>`;
}

function getValidMenuItems({ menuItems }: MenuBar) {
	return menuItems ? menuItems.split(' ').filter(item => validItems.includes(item)) : [];
}

function renderMenuItems() {
	return html<MenuBar>`${repeat(
		getValidMenuItems,
		html`${createMenuItem}`
	)}`;
}

/**
 * The template for the MenuBar component.
 *
 * @param context - element definition context
 * @public
 */
export const MenuBarTemplate: (
	context: VividElementDefinitionContext
) => ViewTemplate<MenuBar> = (_: VividElementDefinitionContext) => {
	return html`<template class="${getClasses}">
		${renderMenuItems}
	</template>`;
};
