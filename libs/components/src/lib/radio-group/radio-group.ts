import { attr } from '@microsoft/fast-element';
import { RadioGroup as FastRadioGroup } from '@microsoft/fast-foundation';

/**
 * Base class for radio-group
 *
 * @public
 * @slot - Default slot.
 */
export class RadioGroup extends FastRadioGroup {
	/**
	 * Indicates the group's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;
}
