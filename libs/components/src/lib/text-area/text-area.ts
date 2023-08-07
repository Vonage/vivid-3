import { applyMixins, TextArea as FoundationElement } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import {
	errorText,
	type ErrorText,
	type FormElement,
	FormElementCharCount,
	FormElementHelperText,
	formElements,
	FormElementSuccessText} from '../../shared/patterns';


export type TextAreaWrap = 'hard' | 'soft' | 'off';

/**
 * Base class for text-area
 *
 * @public
 */
@errorText
@formElements
export class TextArea extends FoundationElement {
	@attr wrap?: TextAreaWrap;
}

export interface TextArea extends FormElement, ErrorText, FormElementCharCount, FormElementHelperText, FormElementSuccessText{}
applyMixins(TextArea, FormElementCharCount, FormElementHelperText, FormElementSuccessText);
