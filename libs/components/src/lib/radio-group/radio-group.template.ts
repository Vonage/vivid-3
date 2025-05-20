import { elements, html, slotted, when } from '@microsoft/fast-element';
import { Orientation } from '@microsoft/fast-web-utilities';
import { Radio } from '../radio/radio';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { RadioGroup } from './radio-group';

export const RadioGroupTemplate = (context: VividElementDefinitionContext) => {
	return html<RadioGroup>`
		<template
			@keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
			@focusin="${(x, c) => x.focusInHandler(c.event as FocusEvent)}"
		>
			<div class="base">
				<fieldset
					${delegateAria({
						role: 'radiogroup',
						ariaDisabled: (x) => x.disabled,
						ariaReadOnly: (x) => x.readOnly,
						ariaOrientation: (x) => x.orientation,
					})}
					aria-labelledby="label"
					aria-describedby="${(x) => x._feedbackDescribedBy}"
					aria-invalid="${(x) => (x.errorText ? 'true' : 'false')}"
					class="control positioning-region ${(x) =>
						x.orientation === Orientation.horizontal
							? 'horizontal'
							: 'vertical'}"
				>
					${when(
						(x) => x.label,
						html<RadioGroup>`<legend id="label">${(x) => x.label}</legend>`
					)}
					<slot
						${slotted({
							property: 'slottedRadioButtons',
							filter: elements(context.tagFor(Radio)),
						})}
						@slotchange="${(x) => x.handleSlotChange()}"
					></slot>
				</fieldset>
				${(x) => x._getFeedbackTemplate(context)}
			</div>
		</template>
	`;
};
