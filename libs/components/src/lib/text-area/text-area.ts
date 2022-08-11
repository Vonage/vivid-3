import { TextArea as FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import {formElements} from '../../shared/patterns/form-elements';

/**
 * Base class for text-area
 *
 * @public
 */
@formElements
export class TextArea extends FoundationElement {
	/**
	 * Indicates the text's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;
}
