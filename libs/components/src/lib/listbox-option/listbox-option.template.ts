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
	icon, disabled, selected, checked
}: ListboxOption) => classNames(
	'base',
	['disabled', disabled],
	['selected', selected || Boolean(checked)],
	['icon', Boolean(icon)],
);

export const ListboxOptionTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<ListboxOption> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html`
	<div class="${getClasses}"
		?selected="${(x) => x.selected}"
		?disabled="${(x) => x.disabled}"
		?checked="${(x) => x.checked}"
		aria-disabled="${x => x.ariaDisabled}"
		aria-posinset="${x => x.ariaPosInSet}"
		aria-selected="${x => x.ariaSelected}"
		aria-checked="${x => x.ariaChecked}"
		aria-setsize="${x => x.ariaSetSize}"
		role="option">
		${x => affixIconTemplate(x.icon)}
		${when(x => x.optionText, html`<div class="text">${x => x.optionText}</div>`)}
	</div>
	`;
};
