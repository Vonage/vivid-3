import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import type { ListItem } from './list-item';

const getClasses = ({
	iconTrailing, icon
}: ListItem) => classNames(
	'base',
	['icon', Boolean(icon)],
	['icon-trailing', iconTrailing],
);

export const ListItemTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<ListItem> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html`
	<li class="${getClasses}"
		?selected="${(x) => x.selected}"
		?checked="${(x) => x.checked}"
		?disabled="${(x) => x.disabled}"
		aria-checked="${x => x.ariaChecked}"
		aria-disabled="${x => x.ariaDisabled}"
		aria-posinset="${x => x.ariaPosInSet}"
		aria-selected="${x => x.ariaSelected}"
		aria-setsize="${x => x.ariaSetSize}"
		role="option">
		<slot name="start">${x => affixIconTemplate(x.icon)}</slot>
		<div class="text-content">
			${when(x => x.textPrimary, html`<div class="text-primary">${x => x.textPrimary}</div>`)}
			${when(x => x.textSecondary, html`<div class="text-secondary">${x => x.textSecondary}</div>`)}
		</div>
		<slot name="end"><slot name="meta"></slot></slot>
	</li>`;
};
