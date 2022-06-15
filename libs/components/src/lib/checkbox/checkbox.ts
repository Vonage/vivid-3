import { attr } from '@microsoft/fast-element';
import { Checkbox as FastCheckbox } from '@microsoft/fast-foundation';


/**
 * Base class for checkbox
 *
 * @public
 */
export class Checkbox extends FastCheckbox {
	/**
	 * Indicates the checkbox's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;
}
