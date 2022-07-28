import {html, ref, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { focusTemplateFactory } from '../../shared/patterns/focus';
import type { NumberField } from './number-field';

const getStateClasses = ({
	errorValidationMessage,
	disabled,
	value,
	readOnly,
	placeholder,
	density,
	appearance,
	shape,
	label,
}: NumberField) => classNames(
	['error', Boolean(errorValidationMessage)],
	['disabled', disabled],
	['has-value', Boolean(value)],
	['readonly', readOnly],
	['placeholder', Boolean(placeholder)],
	[`density-${density}`, Boolean(density)],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
	['no-label', !label],
);

/**
 *
 */
function renderLabel() {
	return html<NumberField>`
	  <label for="control" class="label">
		  ${x => x.label}
	  </label>`;
}

/**
 *
 */
function renderHelperText() {
	return html<NumberField>`<span class="helper-text">${x => x.helperText}</span>`;
}

/**
 *
 */
function renderErrorMessage() {
	return html<NumberField>`
    <vwc-icon class="error-message-icon" type="info-negative"></vwc-icon>
    <span class="error-message">${x => x.errorValidationMessage}</span>
	`;
}

function numberControlButtons() {
	return html<NumberField>`
			<div class="control-buttons">
		    <vwc-button id="subtract" label="-"></vwc-button>
		    <vwc-button id="add" label="+"></vwc-button>
		  </div>
	`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#NumberField} component.
 *
 * @param context
 * @public
 */
export const NumberFieldTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<NumberField> = (context) => {
	const focusTemplate = focusTemplateFactory(context);

	return html<NumberField>`
<div class="base ${getStateClasses}">
    ${when(x => x.label, renderLabel())}
    <div class="fieldset">
      <input class="control"
            id="control"
            @input="${x => x.handleTextInput()}"
            @change="${x => x.handleChange()}"
            ?autofocus="${x => x.autofocus}"
            ?disabled="${x => x.disabled}"
            list="${x => x.list}"
            step="${x => x.step ? x.step : null}"
            maxlength="${x => x.maxlength}"
            minlength="${x => x.minlength}"
            pattern="${x => x.pattern}"
            placeholder="${x => x.placeholder}"
            ?readonly="${x => x.readOnly}"
            ?required="${x => x.required}"
            size="${x => x.size}"
            autocomplete="${x => x.autoComplete}"
            name="${x => x.name}"
            ?spellcheck="${x => x.spellcheck}"
            :value="${x => x.value}"
            type="number"
            aria-atomic="${x => x.ariaAtomic}"
            aria-busy="${x => x.ariaBusy}"
            aria-controls="${x => x.ariaControls}"
            aria-current="${x => x.ariaCurrent}"
            aria-describedby="${x => x.ariaDescribedby}"
            aria-details="${x => x.ariaDetails}"
            aria-disabled="${x => x.ariaDisabled}"
            aria-errormessage="${x => x.ariaErrormessage}"
            aria-flowto="${x => x.ariaFlowto}"
            aria-haspopup="${x => x.ariaHaspopup}"
            aria-hidden="${x => x.ariaHidden}"
            aria-invalid="${x => x.ariaInvalid}"
            aria-keyshortcuts="${x => x.ariaKeyshortcuts}"
            aria-label="${x => x.ariaLabel}"
            aria-labelledby="${x => x.ariaLabelledby}"
            aria-live="${x => x.ariaLive}"
            aria-owns="${x => x.ariaOwns}"
            aria-relevant="${x => x.ariaRelevant}"
            aria-roledescription="${x => x.ariaRoledescription}"
            ${ref('control')}
      />
      ${() => focusTemplate}
      ${() => numberControlButtons()}
    </div>
	  ${when(x => !x.errorValidationMessage && x.helperText?.length, renderHelperText())}
	  ${when(x => x.errorValidationMessage, renderErrorMessage())}
	</div>
`;
}
