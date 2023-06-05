import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for file-picker
 *
 * @public
 */
export class FilePicker extends FoundationElement {
	/**
	 * Indicates the text's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;
}
