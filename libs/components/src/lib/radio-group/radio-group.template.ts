import { elements, html, slotted, when } from '@microsoft/fast-element';
import { Orientation } from '@microsoft/fast-web-utilities';
import { Radio } from '../radio/radio';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { RadioGroup } from './radio-group';

export const RadioGroupTemplate = (context: VividElementDefinitionContext) => {
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
