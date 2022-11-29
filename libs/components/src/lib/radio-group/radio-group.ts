import { attr } from '@microsoft/fast-element';
import { RadioGroup as FastRadioGroup } from '@microsoft/fast-foundation';

/**
 * Base class for radio-group
 *
 * 
 */
export class RadioGroup extends FastRadioGroup {
	/**
	 * Indicates the group's label.
	 *
	 * 
	 * 
	 * HTML Attribute: label
	 */
	@attr label?: string;
}
