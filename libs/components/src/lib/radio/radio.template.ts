import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';

import { focusTemplateFactory } from '../../shared/patterns/focus';
import type { Radio } from './radio';


const getClasses = ({ readOnly, checked, disabled }: Radio) => classNames(
	'base',
	['readonly', Boolean(readOnly)],
	['checked', Boolean(checked)],
	['disabled', Boolean(disabled)]
);

/**
 * The template for the {@link @microsoft/fast-foundation#Radio} component.
 *
 * @param context
 * @public
 */
export const RadioTemplate: (context: ElementDefinitionContext) => ViewTemplate<Radio> = (context: ElementDefinitionContext) => {
	const focusTemplate = focusTemplateFactory(context);

	return html<Radio>`
	<template
		role="radio"
		aria-checked="${x => x.checked}"
		aria-required="${x => x.required}"
		aria-disabled="${x => x.disabled}"
		aria-readonly="${x => x.readOnly}"
		tabindex="${x => (x.disabled ? null : 0)}"
		@keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
		@click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
	>
		<div class="${getClasses}">
			<div class="control">
				${() => focusTemplate}
			</div>
			${when(x => x.label, html<Radio>`<label>${x => x.label}</label>`)}
		</div>
	</template>
	`;
};
