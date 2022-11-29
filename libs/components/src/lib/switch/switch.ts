import { Switch as FoundationElement } from '@microsoft/fast-foundation';
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
 * 
 */
export class Switch extends FoundationElement {
	/**
	 * Indicates the switch's label.
	 *
	 * 
	 * 
	 * HTML Attribute: label
	 */
	@attr label?: string;
	@attr connotation?: SwitchConnotation;
}
