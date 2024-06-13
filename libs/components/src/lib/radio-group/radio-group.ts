import { attr } from '@microsoft/fast-element';
import { RadioGroup as FastRadioGroup } from '@microsoft/fast-foundation';

/**
 * @public
 * @component radio-group
 * @slot - Default slot.
 * @event {CustomEvent<undefined>} change - Fires a custom 'change' event when the value changes
 * @vueModel modelValue value change `(event.target as HTMLInputElement).value`
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
