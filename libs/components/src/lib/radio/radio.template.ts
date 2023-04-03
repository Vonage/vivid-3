import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';

import { focusTemplateFactory } from '../../shared/patterns/focus';
import type { Radio } from './radio';


const getClasses = ({ checked, readOnly, disabled }: Radio) => classNames(
	'base',
	['checked', Boolean(checked)],
	['readonly', Boolean(readOnly)],
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
	<div class="${getClasses}"
		role="radio"
		aria-checked="${x => x.checked}"
		aria-required="${x => x.required}"
		aria-disabled="${x => x.disabled}"
		@keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
		@click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
	>
		<div class="control">
			${() => focusTemplate}
		</div>
		${when(x => x.label, html<Radio>`<label class="label">${x => x.label}</label>`)}
	</div>
	`;
};
