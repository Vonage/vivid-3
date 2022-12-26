import type {ViewTemplate} from '@microsoft/fast-element';
import {html, ref, when} from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { focusTemplateFactory } from '../../shared/patterns/focus';
import {getFeedbackTemplate} from '../../shared/patterns';
import type {TextField} from './text-field';

const getStateClasses = ({
	errorValidationMessage,
	disabled,
	value,
	readOnly,
	placeholder,
	appearance,
	shape,
	label,
	successText
}: TextField) => classNames(
	['error connotation-alert', Boolean(errorValidationMessage)],
	['disabled', disabled],
	['has-value', Boolean(value)],
	['readonly', readOnly],
	['placeholder', Boolean(placeholder)],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
	['no-label', !label],
	['success connotation-success', Boolean(successText)]
);

/**
 * renderLabel
 * 
 * @returns HTMLElement - template
 */
function renderLabel() {
	return html<TextField>`
	  <label for="control" class="label">
		  ${x => x.label}
	  </label>`;
}

/**
 *
 * @returns HTMLElement - template
 */
function renderCharCount() {
	return html<TextField>`
		<span class="char-count">${x => x.value ? x.value.length : 0 } / ${ x => x.maxlength }</span>
	`;
}

/**
 * 
 * @param ElementDefinitionContext - context element definition 
 * @returns HTMLElement - template
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
            autocomplete="${x => x.autoComplete}"
            name="${x => x.name}"
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
	  ${when(x => !x.successText && !x.errorValidationMessage && x.helperText?.length, getFeedbackTemplate('helper', context))}
	  ${when(x => !x.successText && x.errorValidationMessage, getFeedbackTemplate('error', context))}
	  ${when(x => x.successText, getFeedbackTemplate('success', context))}
	</div>`;
};
