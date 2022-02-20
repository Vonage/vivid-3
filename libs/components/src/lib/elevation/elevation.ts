import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';

/**
 * Base class for elevation
 *
 * @public
 */
export class Elevation extends FoundationElement {
	/**
	 * Indicates the elevation's dp.
	 *
	 * @public
	 * HTML Attribute: dp
	 */
	@attr dp = 2;
}