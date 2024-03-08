import {
	applyMixins,
	TextArea as FoundationTextArea,
} from '@microsoft/fast-foundation';
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

export type TextAreaWrap = 'hard' | 'soft' | 'off';

/**
 * Base class for text-area
 *
 * @public
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
applyMixins(
	TextArea,
	FormElementCharCount,
	FormElementHelperText,
	FormElementSuccessText
);
