import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { FormElementHelperText } from '../../shared/patterns';
import { FormElement, formElements } from '../../shared/patterns';
import { AffixIcon } from '../../shared/patterns/affix';

/**
 * Base class for file-picker
 *
 * @public
 */

@formElements
export class FilePicker extends FoundationElement {
	/**
	 * Indicates the text's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;
	helperText: any;
}

export interface FilePicker extends FormElement, FormElementHelperText, AffixIcon{}
applyMixins(FilePicker, FormElementHelperText, AffixIcon);