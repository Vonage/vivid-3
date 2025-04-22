import { html, repeat } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../../shared/design-system/defineVividComponent';
import { Button } from '../../button/button';
import { Divider } from '../../divider/divider';
import { Tooltip } from '../../tooltip/tooltip';
import { Select } from '../../select/select';
import { ListboxOption } from '../../option/option';
import type { MenuBar } from './menubar.js';

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

export const MENU_BAR_ITEMS: {
	[key: string]: {
		registerStateProperty?: (menuBar: MenuBar) => void;
		render: (context: VividElementDefinitionContext) => ViewTemplate<any, any>;
	};
} = {
	textBlock: {
		registerStateProperty: function (menuBar: MenuBar) {
			menuBar.addEventListener('text-styles-changed', (event: Event) => {
				const customEvent = event as CustomEvent;
				if (
					!customEvent ||
					!customEvent.detail ||
					customEvent.detail.textBlockType === undefined
				) {
					return;
				}
				menuBar
					.shadowRoot!.querySelector('#text-block')!
					.setAttribute('current-value', customEvent.detail.textBlockType);
			});
		},
		render: function (context) {
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
		render: function (context) {
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
	},
};
