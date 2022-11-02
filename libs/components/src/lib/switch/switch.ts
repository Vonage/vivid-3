import { Switch as FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for switch
 *
 * @public
 */
export class Switch extends FoundationElement {
	/**
	 * Indicates the switch's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;
	@attr connotation?: string;
}
