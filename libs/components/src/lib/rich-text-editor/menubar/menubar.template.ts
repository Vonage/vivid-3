import { html, repeat } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../../shared/design-system/defineVividComponent';
import { MenuBar } from './menubar.js';

function notifyMenuBarChange(
	menuBar: MenuBar,
	eventName: string,
	payload: any
): any {
	menuBar.$emit(eventName, payload, { bubbles: false, composed: false });
	return true;
}

const MENU_BAR_ITEMS: { [key: string]: ViewTemplate<any, any> } = {
	textSize: html`
		<vwc-menu
			trigger="auto"
			id="text-size"
			aria-label="Menu example"
			placement="bottom-end"
		>
			<vwc-button
				slot="anchor"
				aria-label="Open menu"
				size="condensed"
				shape="rounded"
				icon="text-size-line"
			></vwc-button>
			<vwc-menu-item
				text="Title"
				value="title"
				@click="${(_, { parent }) =>
					notifyMenuBarChange(parent, 'text-size-selected', 'title')}"
			></vwc-menu-item>
			<vwc-menu-item
				text="Subtitle"
				value="subtitle"
				@click="${(_, { parent }) =>
					notifyMenuBarChange(parent, 'text-size-selected', 'subtitle')}"
			></vwc-menu-item>
			<vwc-menu-item
				text="Body"
				value="body"
				@click="${(_, { parent }) =>
					notifyMenuBarChange(parent, 'text-size-selected', 'body')}"
			></vwc-menu-item>
		</vwc-menu>
	`,
};

const getClasses = (_: MenuBar) => classNames('control');

const validItems = ['textSize'];

function createMenuItem(item: string) {
	return MENU_BAR_ITEMS[item];
}

function getValidMenuItems({ menuItems }: MenuBar) {
	return menuItems
		? menuItems.split(' ').filter((item) => validItems.includes(item))
		: [];
}

function renderMenuItems() {
	return html<MenuBar>`${repeat(getValidMenuItems, html`${createMenuItem}`)}`;
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
	return html`<template class="${getClasses}"> ${renderMenuItems} </template>`;
};
