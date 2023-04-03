import { html, ref, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { getFeedbackTemplate } from '../../shared/patterns';
// import { focusTemplateFactory } from '../../shared/patterns';
import type { TextArea } from './text-area';

const getClasses = ({ value, errorValidationMessage, disabled, placeholder, readOnly, successText }: TextArea) => classNames(
	'base',
	['readonly', readOnly],
	['placeholder', Boolean(placeholder)],
	['disabled', disabled],
	['error connotation-alert', Boolean(errorValidationMessage)],
	['has-value', Boolean(value)],
	['success connotation-success', !!successText]
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

/**
 * The template for the {@link @microsoft/fast-foundation#TextArea} component.
 *
 * @param context
 * @public
 */
export const TextAreaTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<TextArea> = (context: ElementDefinitionContext) => {
	// const focusTemplate = focusTemplateFactory(context);
	return html`
	  <div class="${getClasses}">
		  ${when(x => x.label, renderLabel())}
			<textarea class="control"
				?autofocus="${x => x.autofocus}"
				placeholder="${x => x.placeholder ? x.placeholder : null}"
				name="${x => x.name ? x.name : null}"
				maxlength="${x => x.maxlength ? x.maxlength : null}"
				rows="${x => x.rows ? x.rows : null}"
				cols="${x => x.cols ? x.cols : null}"
				wrap="${x => x.wrap ? x.wrap : null}"
				?readonly="${x => x.readOnly}"
				?disabled="${x => x.disabled}"
				?required="${x => x.required}"
				?spellcheck="${x => x.spellcheck}"
				:value="${x => x.value}"
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
