import { html, ref, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { TextArea } from './text-area';

const getClasses = ({
	value,
	errorValidationMessage,
	disabled,
	placeholder,
	readOnly,
	successText,
}: TextArea) =>
	classNames(
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
	return html<TextArea>` <label for="control" class="label">
		${(x) => x.label}
	</label>`;
}

export const TextAreaTemplate = (context: VividElementDefinitionContext) => {
	return html`
		<div class="${getClasses}">
			<div
				class="label-suffix"
				?hidden=${(x) => !(x.charCount && x.maxlength) && !x._hasContextualHelp}
			>
				${when(
					(x) => x.charCount && x.maxlength,
					(x) => x._getCharCountTemplate(context)
				)}
				<slot
					name="contextual-help"
					${slotted('_contextualHelpSlottedContent')}
				></slot>
			</div>
			${when((x) => x.label, renderLabel())}
			<textarea
				class="control"
				id="control"
				?autofocus="${(x) => x.autofocus}"
				placeholder="${(x) => (x.placeholder ? x.placeholder : null)}"
				name="${(x) => (x.name ? x.name : null)}"
				list="${(x) => x.list}"
				minlength="${(x) => (x.minlength ? x.minlength : null)}"
				maxlength="${(x) => (x.maxlength ? x.maxlength : null)}"
				rows="${(x) => (x.rows ? x.rows : null)}"
				cols="${(x) => (x.cols ? x.cols : null)}"
				wrap="${(x) => (x.wrap ? x.wrap : null)}"
				?readonly="${(x) => x.readOnly}"
				?disabled="${(x) => x.disabled}"
				?required="${(x) => x.required}"
				?spellcheck="${(x) => x.spellcheck}"
				aria-describedby="${(x) => x._feedbackDescribedBy} ${(x) =>
					x.charCount && x.maxlength ? x._charCountDescribedBy : null}"
				${delegateAria()}
				@input="${(x) => x.handleTextInput()}"
				@change="${(x) => x.handleChange()}"
				${ref('control')}
			>
			</textarea>
			${(x) => x._getFeedbackTemplate(context)}
		</div>
	`;
};
