import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';

import { focusTemplateFactory } from '../../shared/patterns/focus';
import { RadioMark } from '../radio-mark/radio-mark';
import type { Radio } from './radio';


const getClasses = ({ disabled }: Radio) => classNames(
	'base',
	['disabled', Boolean(disabled)]
);

/**
 * The template for the Radio component.
 *
 * @param context - element definition context
 * @public
 */
export const RadioTemplate: (context: ElementDefinitionContext) => ViewTemplate<Radio> = (context: ElementDefinitionContext) => {
	const focusTemplate = focusTemplateFactory(context);
	const radioMarkTag = context.tagFor(RadioMark);

	return html<Radio>`<template role="${x => x.ariaLabel ? 'presentation' : null}">
	<div class="${getClasses}"
		role="radio"
		aria-label="${x => x.ariaLabel}"
		aria-checked="${x => x.checked}"
		aria-required="${x => x.required}"
		aria-disabled="${x => x.disabled}"
		@keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
		@click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
	>
		<${radioMarkTag}
			:checked="${x => x.checked}"
			:readOnly="${x => x.readOnly}"
			:disabled="${x => x.disabled}"
			connotation="${x => x.connotation}"
		>
			${() => focusTemplate}
		</${radioMarkTag}>
		${when(x => x.label, html<Radio>`<label class="label">${x => x.label}</label>`)}
	</div>
</template>`;
};
