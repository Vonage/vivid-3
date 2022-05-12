import {html, ref, when} from '@microsoft/fast-element';
import type {ViewTemplate} from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import type {Textfield} from './textfield';

const getStateClasses = (textField: Textfield) => classNames(
	['error', !!textField.errorValidationMessage],
	['disabled', textField.disabled],
	['active', !!textField.value],
	['readonly', textField.readOnly]
);

/**
 *
 */
function renderLabel() {
	return html<Textfield>`
	  <label for="control">
		  ${x => x.label}
	  </label>`;
}

/**
 *
 */
function renderHelperText() {
	return html<Textfield>`<span class="helper-text">${x => x.helperText}</span>`;
}

/**
 *
 */
function renderCharCount() {
	return html<Textfield>`
		<span class="char-count">${x => x.value ? x.value.length : 0 } / ${ x => x.maxlength }</span>
	`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Textfield} component.
 *
 * @param context
 * @public
 */
export const TextfieldTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Textfield> = () => html<Textfield>`
	<div class="root ${getStateClasses}">
			<div class="form-field">
				${when(x => x.label, renderLabel())}
				${when(x => x.charCount && x.maxlength, renderCharCount())}
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
		</div>
	  ${when(x => !x.errorValidationMessage, renderHelperText())}
	  <span class="error-message">${x => x.errorValidationMessage}</span>
	</div>`;
