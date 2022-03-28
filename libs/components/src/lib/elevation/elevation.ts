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
	@attr dp?: 0 | 2 | 4 | 8 | 12 | 16 | 24; // TODO: get values from design tokens
}
