import { Switch as FoundationSwitch } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type {Connotation} from '../enums';

export type SwitchConnotation =
	Connotation.Accent |
	Connotation.Alert |
	Connotation.Success |
	Connotation.CTA;
/**
 * Base class for switch
 *
 * @public
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
