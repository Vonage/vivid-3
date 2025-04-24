import { html, repeat } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../../shared/design-system/defineVividComponent';
import { Button } from '../../button/button.js';
import { Divider } from '../../divider/divider.js';
import { Tooltip } from '../../tooltip/tooltip.js';
import { Select } from '../../select/select.js';
import { ListboxOption } from '../../option/option.js';
import { Menu } from '../../menu/menu.js';
import { MenuItem } from '../../menu-item/menu-item.js';
import type { MenuBar } from './menubar.js';

function notifyMenuBarChange(
	menuBar: MenuBar,
	eventName: string,
	payload: any
): any {
	menuBar.$emit(eventName, payload, { bubbles: false, composed: false });
	return true;
}

export const TEXT_DECORATION_ITEMS = [
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

export const TEXT_SIZES = [
	{
		text: 'Extra Large',
		value: 'extra-large',
	},
	{
		text: 'Large',
		value: 'large',
	},
	{
		text: 'Normal',
		value: 'normal',
	},
	{
		text: 'Small',
		value: 'small',
	},
];

const textBlockEventHandler = (event: Event) => {
	const customEvent = event as CustomEvent;
	if (
		!customEvent ||
		!customEvent.detail ||
		customEvent.detail.textBlockType === undefined
	) {
		return;
	}
	const menu = customEvent.target as HTMLElement;
	menu
		.shadowRoot!.querySelector('#text-block')!
		.setAttribute('current-value', customEvent.detail.textBlockType);
};

const textDecorationEventHandler = (event: Event) => {
	const customEvent = event as CustomEvent;
	if (!customEvent || !customEvent.detail) {
		return;
	}
	const menu = customEvent.target as HTMLElement;

	const selectionButtons = menu.shadowRoot!.querySelectorAll(
		'#text-decoration .selection-button'
	);

	selectionButtons.forEach((button) => button.removeAttribute('active'));

	customEvent.detail.textDecoration !== undefined &&
		TEXT_DECORATION_ITEMS.forEach((menuItemConfig, index) => {
			if (
				customEvent.detail.textDecoration.indexOf(menuItemConfig.value) >= 0
			) {
				selectionButtons[index].toggleAttribute('active', true);
			}
		});
};

const textSizeEventHandler = (event: Event) => {
	const customEvent = event as CustomEvent;
	if (!customEvent || !customEvent.detail) {
		return;
	}
	const menu = customEvent.target as HTMLElement;
	const selectionTextSize = customEvent.detail.textSize ?? 'normal';

	const textSizeElements = menu.shadowRoot!.querySelectorAll('.menubar-selector-menuitem');
	textSizeElements.forEach(textSizeElement => {
		textSizeElement.toggleAttribute('checked', textSizeElement.getAttribute('value') === selectionTextSize);
	});

}
export const MENU_BAR_ITEMS: {
	[key: string]: {
		registerStateProperty?: (menuBar: MenuBar) => void;
		render: (context: VividElementDefinitionContext) => ViewTemplate<any, any>;
	};
} = {
	textBlock: {
		registerStateProperty: function (menuBar: MenuBar) {
			menuBar.addEventListener('text-styles-changed', textBlockEventHandler);
		},
		render: function (context) {
			const selectTag = context.tagFor(Select);
			const optionTag = context.tagFor(ListboxOption);
			const tooltipTag = context.tagFor(Tooltip);

			return html`
		<${tooltipTag} text="Text Block Type" placement="top">
			<${selectTag}
                scale="condensed"
                shape="rounded"
                appearance="ghost"
				slot="anchor"
				trigger="auto"
				id="text-block"
				aria-label="Text Block"
				placement="bottom-end"
				value="${(_, { parent }) => parent.textBlockType}"
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
	},
	textDecoration: {
		registerStateProperty: function (menuBar) {
			menuBar.addEventListener(
				'text-styles-changed',
				textDecorationEventHandler
			);
		},
		render: function (context) {
			const buttonTag = context.tagFor(Button);
			const tooltipTag = context.tagFor(Tooltip);
			return html`
			<span id="text-decoration">  
                ${repeat(
									(_) => TEXT_DECORATION_ITEMS,
									html`
                        <${tooltipTag} text="${(x) => x.text}" placement="top">
                            <${buttonTag}
                                class="selection-button"
                                slot="anchor"
                                aria-label="${(x) => x.text}"
                                size="super-condensed"
                                appearance="ghost-light"
                                shape="rounded"
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
								</span>
		`;
		},
	},
	textSize: {
		registerStateProperty: function(menuBar) {
			menuBar.addEventListener('text-styles-changed', textSizeEventHandler);
		},
		render: function (context) {
			const menuTag = context.tagFor(Menu);
			const buttonTag = context.tagFor(Button);
			const tooltipTag = context.tagFor(Tooltip);
			const menuItemTag = context.tagFor(MenuItem);
			return html`
                    <${menuTag}
						auto-dismiss
                        trigger="auto"
                        id="text-size"
                        aria-label="Text Size"
                        placement="bottom-end"
                    >
						<${tooltipTag} slot="anchor" text="Text Size" placement="top">
                            <${buttonTag}
                                slot="anchor"
                                aria-label="Open text size menu"
                                size="super-condensed"
                                appearance="ghost-light"
                                shape="pill"
                                icon="text-size-line"
                            ></${buttonTag}>
						</${tooltipTag}>
						${repeat(
							(_) => TEXT_SIZES,
							html`
							<${menuItemTag}
								check-appearance="tick-only"
								role="menuitemcheckbox"
								text="${(x) => x.text}"
								value="${(x) => x.value}"
								internal-part
								class="menubar-selector-menuitem"
								connotation="cta"
								@click="${(x, c) =>
									notifyMenuBarChange(
										c.parentContext.parent,
										'text-size-selected',
										x.value
									)}"
                        ></${menuItemTag}>
							`
						)}
                    </${menuTag}>
                `;
		},
	},
	divider: {
		render: function(context) {
			const dividerTag = context.tagFor(Divider);
			return html`
				<${dividerTag} class="divider" orientation="vertical"></${dividerTag}>
			`;
		}
	}
};
