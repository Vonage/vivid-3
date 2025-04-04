import { elements, html, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Orientation } from '@microsoft/fast-web-utilities';
import { Radio } from '../radio/radio';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { applyHostSemantics } from '../../shared/aria/host-semantics';
import type { RadioGroup } from './radio-group';

const isFeedbackAvailable = (x: RadioGroup) =>
	Boolean(x.errorText || x.helperText || x._helperTextSlottedContent?.length);

const renderMessageText = (context: VividElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);
	return html<RadioGroup>`
		<div
			class="${(x) =>
				classNames(
					'message',
					['message--visible', isFeedbackAvailable(x)],
					`${x.errorText ? 'error' : 'helper'}-message`
				)}"
			role="${(x) => (x.errorText ? 'status' : null)}"
			aria-atomic="false"
		>
			<div class="message-text">
				${when(
					(x) => !x.errorText,
					() => html<RadioGroup>`
						<span id="helper-text">
							<slot name="helper-text" ${slotted('_helperTextSlottedContent')}
								>${(x) => x.helperText}</slot
							>
						</span>
					`
				)}
				${when(
					(x) => x.errorText,
					() => html<RadioGroup>`
					<${iconTag} class="message-icon" name="info-line"></${iconTag}>
					<span id="error-text">${(x) => x.errorText}</span>
				`
				)}
			</div>
		</div>
	`;
};

export const RadioGroupTemplate = (context: VividElementDefinitionContext) => {
	return html<RadioGroup>`
		<template
			${applyHostSemantics({
				role: 'radiogroup',
				ariaDisabled: (x) => x.disabled,
				ariaReadOnly: (x) => x.readOnly,
				ariaOrientation: (x) => x.orientation,
			})}
			@keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
			@focusin="${(x, c) => x.focusInHandler(c.event as FocusEvent)}"
		>
			${when(
				(x) => x.label,
				html<RadioGroup>`<label id="label">${(x) => x.label}</label>`
			)}
			<div
				role="radiogroup"
				aria-disabled="${(x) => x.disabled}"
				aria-readonly="${(x) => x.readOnly}"
				aria-orientation="${(x) => x.orientation}"
				aria-labelledby="label"
				aria-describedby="helper-text"
				aria-invalid="${(x) => (x.errorText ? 'true' : null)}"
				aria-errormessage="error-text"
				class="control positioning-region ${(x) =>
					x.orientation === Orientation.horizontal ? 'horizontal' : 'vertical'}"
			>
				<slot
					${slotted({
						property: 'slottedRadioButtons',
						filter: elements(context.tagFor(Radio)),
					})}
				></slot>
			</div>
			${renderMessageText(context)}
		</template>
	`;
};
