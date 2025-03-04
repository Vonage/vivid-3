import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * @public
 * @component rich-text-editor
 */
export class RichTextEditor extends FoundationElement {
	/**
	 * Indicates the rich text editor's value.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: value
	 */
	@attr value?: string;

	constructor() {
		super();
		this.value = '';
	}
}
