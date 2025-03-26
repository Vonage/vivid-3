import { html, repeat } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../../shared/design-system/defineVividComponent';
import { Button } from '../../button/button';
import { Menu } from '../../menu/menu';
import { MenuBar } from './menubar.js';
import { MenuItem } from '../../menu-item/menu-item';

function notifyMenuBarChange(
	menuBar: MenuBar,
	eventName: string,
	payload: any
): any {
	menuBar.$emit(eventName, payload, { bubbles: false, composed: false });
	return true;
}

const MENU_BAR_ITEMS: {
	[key: string]: (
		context: VividElementDefinitionContext
	) => ViewTemplate<any, any>;
} = {
	textSize: function (context) {
		const buttonTag = context.tagFor(Button);
		const menuTag = context.tagFor(Menu);
		const menuItemTag = context.tagFor(MenuItem);
		return html`
			<${menuTag}
				trigger="auto"
				id="text-size"
				aria-label="Menu example"
				placement="bottom-end"
			>
				<${buttonTag}
					slot="anchor"
					aria-label="Open menu"
					appearance="ghost-light"
					size="super-condensed"
					shape="pill"
					icon="text-size-line"
				></${buttonTag}>
				<${menuItemTag}
					text="Title"
					internal-part
					class="title"
					connotation="cta"
					value="title"
					@click="${(_, { parent }) =>
						notifyMenuBarChange(parent, 'text-size-selected', 'title')}"
				></${menuItemTag}>
				<${menuItemTag}
					text="Subtitle"
					internal-part
					class="subtitle"
					connotation="cta"
					value="subtitle"
					@click="${(_, { parent }) =>
						notifyMenuBarChange(parent, 'text-size-selected', 'subtitle')}"
				></${menuItemTag}>
				<${menuItemTag}
					text="Body"
					internal-part
					class="body"
					connotation="cta"
					value="body"
					@click="${(_, { parent }) =>
						notifyMenuBarChange(parent, 'text-size-selected', 'body')}"
				></${menuItemTag}>
			</${menuTag}>
		`;
	},
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

function renderMenuItems(context: VividElementDefinitionContext) {
	return () =>
		html<MenuBar>`${repeat(
			getValidMenuItems,
			html`${(menuItemName) => createMenuItem(menuItemName)(context)}`
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
