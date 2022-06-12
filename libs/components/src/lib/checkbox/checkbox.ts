import { attr } from '@microsoft/fast-element';
import { Checkbox as FastCheckbox } from '@microsoft/fast-foundation';


/**
 * Base class for checkbox
 *
 * @public
 */
export class Checkbox extends FastCheckbox {
	/**
	 * Indicates the text's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr label?: string;
}
