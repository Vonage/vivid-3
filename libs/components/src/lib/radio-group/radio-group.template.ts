import { elements, html, slotted, when } from '@microsoft/fast-element';
import { Orientation } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';

import { Radio } from '../radio/radio';
import type { RadioGroup } from './radio-group';

/**
 * The template for the RadioGroup component.
 *
 * @param context - element definition context
 * @public
 */
export const RadioGroupTemplate: (
	context: ElementDefinitionContext
) => ViewTemplate<RadioGroup> = (context: ElementDefinitionContext) => {
	return html<RadioGroup>`
		<template
			role="radiogroup"
			aria-disabled="${(x) => x.disabled}"
			aria-readonly="${(x) => x.readOnly}"
			aria-orientation="${(x) => x.orientation}"
			@keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
			@focusin="${(x, c) => x.focusInHandler(c.event as FocusEvent)}"
		>
			${when(
				(x) => x.label,
				html<RadioGroup>`<label>${(x) => x.label}</label>`
			)}

			<div
				class="positioning-region ${(x) =>
					x.orientation === Orientation.horizontal ? 'horizontal' : 'vertical'}"
			>
				<slot
					${slotted({
						property: 'slottedRadioButtons',
						filter: elements(context.tagFor(Radio)),
					})}
				></slot>
			</div>
		</template>
	`;
};
