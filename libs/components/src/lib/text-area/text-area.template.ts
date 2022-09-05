import {html, when, ref} from '@microsoft/fast-element';
import type {ViewTemplate} from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import type {TextArea} from './text-area';

const getClasses = ({errorValidationMessage, density, disabled, placeholder, readOnly}: TextArea) => classNames(
	'base',
	['readonly', readOnly],
	['placeholder', Boolean(placeholder)],
	['disabled', disabled],
	[`density-${density}`, Boolean(density)],
	['error', Boolean(errorValidationMessage)],
);

function renderLabel() {
	return html<TextArea>`
	  <label for="control" class="label">
		  ${x => x.label}
	  </label>`;
}

function renderHelperText() {
	return html<TextArea>`<span class="helper-text">${x => x.helperText}</span>`;
}

function renderErrorMessage() {
	return html<TextArea>`
    <vwc-icon class="error-message-icon" type="info-negative"></vwc-icon>
    <span class="error-message">${x => x.errorValidationMessage}</span>
	`;
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
) => ViewTemplate<TextArea> = (_: ElementDefinitionContext) => html`
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
								${ref("control")}
			>
					
			</textarea>
	  ${when(x => !x.errorValidationMessage && x.helperText?.length, renderHelperText())}
	  ${when(x => x.errorValidationMessage, renderErrorMessage())}
	</div>
`;
