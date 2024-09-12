import { TextArea as FoundationTextArea } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import {
	errorText,
	type ErrorText,
	type FormElement,
	FormElementCharCount,
	FormElementHelperText,
	formElements,
	FormElementSuccessText,
} from '../../shared/patterns';
import { Reflector } from '../../shared/utils/Reflector';
import { applyMixinsWithObservables } from '../../shared/utils/applyMixinsWithObservables';

export type TextAreaWrap = 'hard' | 'soft' | 'off';

/**
 * @public
 * @component text-area
 * @slot helper-text - Describes how to use the text-area. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} change - Emits a custom 'change' event when the textarea emits a change event
 * @vueModel modelValue value input `(event.target as HTMLInputElement).value`
 */
@errorText
@formElements
export class TextArea extends FoundationTextArea {
	/**
	 * The wrap attribute
	 *
	 * @public
	 * HTML Attribute: wrap
	 */
	@attr wrap?: TextAreaWrap;

	#reflectToTextArea?: Reflector<this, HTMLTextAreaElement>;

	override connectedCallback() {
		super.connectedCallback();
		this.#reflectToTextArea = new Reflector(this, this.control);
		this.#reflectToTextArea.property('value', 'value', true);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this.#reflectToTextArea!.destroy();
	}
}

export interface TextArea
	extends FormElement,
		ErrorText,
		FormElementCharCount,
		FormElementHelperText,
		FormElementSuccessText {}
applyMixinsWithObservables(
	TextArea,
	FormElementCharCount,
	FormElementHelperText,
	FormElementSuccessText
);
