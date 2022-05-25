import type {ViewTemplate} from '@microsoft/fast-element';
import {html, ref, when} from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { focusTemplateFactory } from '../../shared/patterns/focus';
import '../icon/index';
import type {TextField} from './text-field';

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
}: TextField) => classNames(
	['error', Boolean(errorValidationMessage)],
	['disabled', disabled],
	['active', Boolean(value)],
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
	return html<TextField>`
	  <label for="control" class="label">
		  ${x => x.label}
	  </label>`;
}

/**
 *
 */
function renderHelperText() {
	return html<TextField>`<span class="helper-text">${x => x.helperText}</span>`;
}

/**
 *
 */
function renderCharCount() {
	return html<TextField>`
		<span class="char-count">${x => x.value ? x.value.length : 0 } / ${ x => x.maxlength }</span>
	`;
}

/**
 *
 */
function renderErrorMessage() {
	return html<TextField>`
    <vwc-icon class="error-message-icon" type="info-negative"></vwc-icon>
    <span class="error-message">${x => x.errorValidationMessage}</span>
	`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#TextField} component.
 *
 * @param context
 * @public
 */
export const TextfieldTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<TextField> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);

	return html<TextField>`
	<div class="base ${getStateClasses}">
    ${when(x => x.charCount && x.maxlength, renderCharCount())}
    ${when(x => x.label, renderLabel())}
    <div class="fieldset">
      ${x => affixIconTemplate(x.icon)}
      <input class="control"
            id="control"
            @input="${x => x.handleTextInput()}"
            @change="${x => x.handleChange()}"
            ?autofocus="${x => x.autofocus}"
            ?disabled="${x => x.disabled}"
            list="${x => x.list}"
            maxlength="${x => x.maxlength}"
            minlength="${x => x.minlength}"
            pattern="${x => x.pattern}"
            placeholder="${x => x.placeholder}"
            ?readonly="${x => x.readOnly}"
            ?required="${x => x.required}"
            size="${x => x.size}"
            ?spellcheck="${x => x.spellcheck}"
            :value="${x => x.value}"
            type="${x => x.type}"
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
    </div>
	  ${when(x => !x.errorValidationMessage && x.helperText?.length, renderHelperText())}
	  ${when(x => x.errorValidationMessage, renderErrorMessage())}
	</div>`;
};
