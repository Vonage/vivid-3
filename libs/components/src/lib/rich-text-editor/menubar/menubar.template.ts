import { html, repeat } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../../shared/design-system/defineVividComponent';
import { MENU_BAR_ITEMS } from './consts.js';
import { Menubar } from './menubar.js';

const getClasses = (menubar: Menubar) =>
	classNames('control', [
		'hide-menubar',
		getValidMenuItems(menubar).length === 0,
	]);

const validItems = ['textBlock', 'textDecoration', 'textSize', 'divider'];

function getPropertyStateRgistrationFunction(item: string) {
	return MENU_BAR_ITEMS[item].registerStateProperty;
}

function createMenuItem(item: string) {
	return MENU_BAR_ITEMS[item].render;
}

function getValidMenuItems({ menuItems }: Menubar) {
	return menuItems
		? menuItems.split(' ').filter((item) => validItems.includes(item))
		: [];
}

function renderMenuItems(context: VividElementDefinitionContext) {
	return () =>
		html<Menubar>`${repeat(
			getValidMenuItems,
			html`${(menuItemName, { parent }) => {
				getPropertyStateRgistrationFunction(menuItemName)?.(parent);
				return createMenuItem(menuItemName)(context);
			}}`
		)}`;
}

/**
 * The template for the Menubar component.
 *
 * @param context - element definition context
 * @public
 */
export const MenubarTemplate: (
	context: VividElementDefinitionContext
) => ViewTemplate<Menubar> = (context: VividElementDefinitionContext) => {
	return html`<template class="${getClasses}">
		${renderMenuItems(context)}
	</template>`;
};
