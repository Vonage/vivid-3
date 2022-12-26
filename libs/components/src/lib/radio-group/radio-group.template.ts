import { elements, html, slotted, when } from '@microsoft/fast-element';
import { Orientation } from '@microsoft/fast-web-utilities';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';

import { Radio } from '../radio/radio';
import type { RadioGroup } from './radio-group';

/**
 * The template for the {@link @microsoft/fast-foundation#RadioGroup} component.
 *
 * @param  ElementDefinitionContext - context element definition
 * @returns HTMLElement - template
 */
export const RadioGroupTemplate: (context: ElementDefinitionContext) => ViewTemplate<RadioGroup> = (context: ElementDefinitionContext) => {
	return html<RadioGroup>`
		<template
			role="radiogroup"
			aria-disabled="${x => x.disabled}"
			aria-readonly="${x => x.readOnly}"
			aria-orientation="${x => x.orientation}"
			@click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
			@keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
			@focusout="${(x, c) => x.focusOutHandler(c.event as FocusEvent)}"
		>

			${when(x => x.label, html<RadioGroup>`<label>${x => x.label}</label>`)}

			<div class="positioning-region ${x => x.orientation === Orientation.horizontal ? 'horizontal' : 'vertical'}">
				<slot ${slotted({ property: 'slottedRadioButtons', filter: elements(context.tagFor(Radio)) })}></slot>
			</div>
		</template>
	`;
};
