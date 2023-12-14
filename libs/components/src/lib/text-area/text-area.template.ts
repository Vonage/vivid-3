import { html, ref, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { getFeedbackTemplate } from '../../shared/patterns';
import type { TextArea } from './text-area';

const getClasses = ({ value, errorValidationMessage, disabled, placeholder, readOnly, successText }: TextArea) => classNames(
	'base',
	['readonly', readOnly],
	['placeholder', Boolean(placeholder)],
	['disabled', disabled],
	['error', Boolean(errorValidationMessage)],
	['has-value', Boolean(value)],
	['success', !!successText]
);

/**
 *
 */
function renderLabel() {
	return html<TextArea>`
	  <label for="control" class="label">
		  ${x => x.label}
	  </label>`;
}

function renderCharCount() {
	return html<TextArea>`
		<span class="char-count">${x => x.value ? x.value.length : 0 } / ${ x => x.maxlength }</span>
	`;
}

/**
 * The template for the TextArea component.
 *
 * @param context - element definition context
 * @public
 */
export const TextAreaTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<TextArea> = (context: ElementDefinitionContext) => {
	return html`
	  <div class="${getClasses}">
		${when(x => x.charCount && x.maxlength, renderCharCount())}
		${when(x => x.label, renderLabel())}
			<textarea class="control" id="control"
				?autofocus="${x => x.autofocus}"
				placeholder="${x => x.placeholder ? x.placeholder : null}"
				name="${x => x.name ? x.name : null}"
				minlength="${x => x.minlength ? x.minlength : null}"
				maxlength="${x => x.maxlength ? x.maxlength : null}"
				rows="${x => x.rows ? x.rows : null}"
				cols="${x => x.cols ? x.cols : null}"
				wrap="${x => x.wrap ? x.wrap : null}"
				?readonly="${x => x.readOnly}"
				?disabled="${x => x.disabled}"
				?required="${x => x.required}"
				?spellcheck="${x => x.spellcheck}"
				aria-atomic="${x => x.ariaAtomic}"
				aria-busy="${x => x.ariaBusy}"
				aria-current="${x => x.ariaCurrent}"
				aria-details="${x => x.ariaDetails}"
				aria-disabled="${x => x.ariaDisabled}"
				aria-errormessage="${x => x.ariaErrormessage}"
				aria-haspopup="${x => x.ariaHaspopup}"
				aria-hidden="${x => x.ariaHidden}"
				aria-invalid="${x => x.ariaInvalid}"
				aria-keyshortcuts="${x => x.ariaKeyshortcuts}"
				aria-label="${x => x.ariaLabel}"
				aria-live="${x => x.ariaLive}"
				aria-relevant="${x => x.ariaRelevant}"
				aria-roledescription="${x => x.ariaRoledescription}"
				@input="${(x) => x.handleTextInput()}"
				@change="${x => x.handleChange()}"
				${ref('control')}
	  >
			</textarea>
		${when(x => !x.successText && !x.errorValidationMessage && x.helperText?.length, getFeedbackTemplate('helper', context))}
		${when(x => !x.successText && x.errorValidationMessage, getFeedbackTemplate('error', context))}
		${when(x => x.successText, getFeedbackTemplate('success', context))}
	  </div>
	`;
};
