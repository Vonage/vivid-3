import { html, repeat } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../../shared/design-system/defineVividComponent';
import { MENU_BAR_ITEMS } from './consts.js';
import { MenuBar } from './menubar.js';

const getClasses = (menuBar: MenuBar) =>
	classNames('control', [
		'hide-menubar',
		getValidMenuItems(menuBar).length === 0,
	]);

const validItems = ['textBlock', 'textDecoration', 'textSize'];

function getPropertyStateRgistrationFunction(item: string) {
	return MENU_BAR_ITEMS[item].registerStateProperty;
}

function createMenuItem(item: string) {
	return MENU_BAR_ITEMS[item].render;
}

function getValidMenuItems({ menuItems }: MenuBar) {
	return menuItems
		? menuItems.split(' ').filter((item) => validItems.includes(item))
		: [];
}

function renderMenuItems(context: VividElementDefinitionContext) {
	return () =>
		html<MenuBar>`${repeat(
			getValidMenuItems,
			html`${(menuItemName, { parent }) => {
				getPropertyStateRgistrationFunction(menuItemName)?.(parent);
				return createMenuItem(menuItemName)(context);
			}}`
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
) => ViewTemplate<MenuBar> = (context: VividElementDefinitionContext) => {
	return html`<template class="${getClasses}">
		${renderMenuItems(context)}
	</template>`;
};
