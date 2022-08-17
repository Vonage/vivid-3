import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import type { ListboxOption } from './listbox-option';

const getClasses = ({
	iconTrailing, icon, disabled, selected, textSecondary
}: ListboxOption) => classNames(
	'base',
	['disabled', disabled],
	['selected', selected],
	['icon', Boolean(icon)],
	['secondary', Boolean(textSecondary)],
	['icon-trailing', iconTrailing],
);

export const ListboxOptionTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<ListboxOption> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html`
	<li class="${getClasses}"
		?selected="${(x) => x.selected}"
		?disabled="${(x) => x.disabled}"
		aria-disabled="${x => x.ariaDisabled}"
		aria-posinset="${x => x.ariaPosInSet}"
		aria-selected="${x => x.ariaSelected}"
		aria-setsize="${x => x.ariaSetSize}"
		role="option">
		${x => affixIconTemplate(x.icon)}
		<div class="text-content">
			${when(x => x.textPrimary, html`<div class="text-primary">${x => x.textPrimary}</div>`)}
			${when(x => x.textSecondary, html`<div class="text-secondary">${x => x.textSecondary}</div>`)}
		</div>
		<slot name="meta"></slot>
	</li>`;
};
