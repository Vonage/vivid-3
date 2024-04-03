import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';

import type { Radio } from './radio';

const getClasses = ({ connotation, checked, readOnly, disabled }: Radio) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		['checked', Boolean(checked)],
		['readonly', Boolean(readOnly)],
		['disabled', Boolean(disabled)]
	);

/**
 * The template for the Radio component.
 *
 * @param context - element definition context
 * @public
 */
export const RadioTemplate: (
	context: ElementDefinitionContext
) => ViewTemplate<Radio> = () => {
	return html<Radio>`<template
		role="${(x) => (x.ariaLabel ? 'presentation' : null)}"
	>
		<div
			class="${getClasses}"
			role="radio"
			aria-label="${(x) => x.ariaLabel}"
			aria-checked="${(x) => x.checked}"
			aria-required="${(x) => x.required}"
			aria-disabled="${(x) => x.disabled}"
			@keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
			@click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
		>
			<div class="control"></div>
			${when(
				(x) => x.label,
				html<Radio>`<label class="label">${(x) => x.label}</label>`
			)}
		</div>
	</template>`;
};
