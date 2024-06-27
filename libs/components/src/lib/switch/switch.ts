import { Switch as FoundationSwitch } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { Connotation } from '../enums';

export type SwitchConnotation =
	| Connotation.Accent
	| Connotation.Alert
	| Connotation.Success
	| Connotation.CTA;
/**
 * @public
 * @component switch
 * @event {CustomEvent<undefined>} change - Emits a custom change event when the checked state changes
 * @vueModel modelValue checked change `(event.target as HTMLInputElement).checked`
 */
export class Switch extends FoundationSwitch {
	/**
	 * Indicates the switch's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * Indicates the switch's connotation.
	 *
	 * @public
	 * HTML Attribute: connotation
	 */
	@attr connotation?: SwitchConnotation;
}
