import { html, repeat } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../../shared/design-system/defineVividComponent';
import { Button } from '../../button/button';
import { Divider } from '../../divider/divider';
import { Tooltip } from '../../tooltip/tooltip';
import { Select } from '../../select/select';
import { ListboxOption } from '../../option/option';
import { MenuBar } from './menubar.js';

function notifyMenuBarChange(
	menuBar: MenuBar,
	eventName: string,
	payload: any
): any {
	menuBar.$emit(eventName, payload, { bubbles: false, composed: false });
	return true;
}

const TEXT_DECORATION_ITEMS = [
	{
		text: 'Bold',
		icon: 'bold-line',
		value: 'bold',
	},
	{
		text: 'Italic',
		icon: 'italic-line',
		value: 'italics',
	},
	{
		text: 'Underline',
		icon: 'underline-line',
		value: 'underline',
	},
	{
		text: 'Strikethrough',
		icon: 'strikethrough-line',
		value: 'strikethrough',
	},
	{
		text: 'Monospace',
		icon: 'monospace-line',
		value: 'monospace',
	},
];

const MENU_BAR_ITEMS: {
	[key: string]: (
		context: VividElementDefinitionContext
	) => ViewTemplate<any, any>;
} = {
	/*textSize: function (context) {
		const buttonTag = context.tagFor(Button);
		const menuTag = context.tagFor(Menu);
		const menuItemTag = context.tagFor(MenuItem);
		const tooltipTag = context.tagFor(Tooltip);
		return html`
			<${menuTag}
				trigger="auto"
				id="text-block"
				aria-label="Text Block"
				placement="bottom-end"
			>
				<${tooltipTag} slot="anchor" text="Text Block Type" placement="top">
					<${buttonTag}
						slot="anchor"
						aria-label="Open text block menu"
						size="super-condensed"
						appearance="ghost-light"
						shape="pill"
						icon="text-size-line"
					></${buttonTag}>
				</${tooltipTag}>
				<${menuItemTag}
					text="Title"
					value="title"
					internal-part
					class="title"
					connotation="cta"
					@click="${(_, { parent }) =>
						notifyMenuBarChange(parent, 'text-block-selected', 'title')}"
				></${menuItemTag}>
				<${menuItemTag}
					text="Subtitle"
					value="subtitle"
					internal-part
					class="subtitle"
					connotation="cta"
					@click="${(_, { parent }) =>
						notifyMenuBarChange(parent, 'text-block-selected', 'subtitle')}"
				></${menuItemTag}>
				<${menuItemTag}
					text="Body"
					value="body"
					internal-part
					class="body"
					connotation="cta"
					@click="${(_, { parent }) =>
						notifyMenuBarChange(parent, 'text-block-selected', 'body')}"
				></${menuItemTag}>
			</${menuTag}>
		`;
	},*/
	textBlock: function (context) {
		const selectTag = context.tagFor(Select);
		const optionTag = context.tagFor(ListboxOption);
		const tooltipTag = context.tagFor(Tooltip);

		return html`
		<${tooltipTag} text="Text Block Type" placement="top">
			<${selectTag}
				slot="anchor"
				trigger="auto"
				id="text-block"
				aria-label="Text Block"
				placement="bottom-end"
				@change="${(_, { parent, event }) =>
					notifyMenuBarChange(
						parent,
						'text-block-selected',
						(event.target as HTMLSelectElement).value
					)}"
			>
				<${optionTag}
					text="Title"
					value="title"
					internal-part
					class="title"
					connotation="cta"
				></${optionTag}>
				<${optionTag}
					text="Subtitle"
					value="subtitle"
					internal-part
					class="subtitle"
					connotation="cta"
				></${optionTag}>
				<${optionTag}
					text="Body"
					value="body"
					internal-part
					class="body"
					connotation="cta"
				></${optionTag}>
			</${selectTag}>
		</${tooltipTag}>
		`;
	},
	textDecoration: function (context) {
		const buttonTag = context.tagFor(Button);
		const dividerTag = context.tagFor(Divider);
		const tooltipTag = context.tagFor(Tooltip);
		return html`
			<${dividerTag} class="divider" orientation="vertical"></${dividerTag}>
			${repeat(
				(_) => TEXT_DECORATION_ITEMS,
				html`
					<${tooltipTag} text="${(x) => x.text}" placement="top">
						<${buttonTag}
							slot="anchor"
							aria-label="${(x) => x.text}"
							size="super-condensed"
							appearance="ghost-light"
							shape="pill"
							icon="${(x) => x.icon}"
							@click="${(x, c) =>
								notifyMenuBarChange(
									c.parentContext.parent,
									'text-decoration-selected',
									x.value
								)}"')}"
						></${buttonTag}>
					</${tooltipTag}>
				`
			)}
			<${dividerTag} class="divider" orientation="vertical"></${dividerTag}>
		`;
	},
};

const getClasses = (menuBar: MenuBar) =>
	classNames('control', [
		'hide-menubar',
		getValidMenuItems(menuBar).length === 0,
	]);

const validItems = ['textBlock', 'textDecoration'];

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
