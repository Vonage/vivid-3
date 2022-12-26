import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { focusTemplateFactory } from '../../shared/patterns';
import type { ListboxOption } from './option';

const getClasses = ({
	icon, disabled, selected, checked
}: ListboxOption) => classNames(
	'base',
	['disabled', disabled],
	['selected', Boolean(selected)],
	['active', Boolean(checked)],
	['icon', Boolean(icon)],
);

/**
 * 
 * @param  ElementDefinitionContext - context element definition 
 * @returns HTMLElement - template
 */
export const ListboxOptionTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<ListboxOption> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);

	return html`
	<template
		aria-checked="${x => x.ariaChecked}"
		aria-disabled="${x => x.ariaDisabled}"
		aria-posinset="${x => x.ariaPosInSet}"
		aria-selected="${x => x.ariaSelected}"
		aria-setsize="${x => x.ariaSetSize}"
		role="option">
		<div class="${getClasses}">
			${() => focusTemplate}
			${x => affixIconTemplate(x.icon)}
			${when(x => x.text, html`<div class="text">${x => x.text}</div>`)}
		</div>
	</template>
	`;
};
