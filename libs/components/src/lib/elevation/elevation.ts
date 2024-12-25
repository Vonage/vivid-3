import { attr } from '@microsoft/fast-element';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/**
 * @component elevation
 * @slot - Default slot.
 */
export class Elevation extends VividElement {
	/**
	 * Indicates the elevation's dp.
	 *
	 * @public
	 * HTML Attribute: dp
	 */
	@attr dp?: 0 | 2 | 4 | 8 | 12 | 16 | 24; // TODO: get values from design tokens

	/**
	 * toggles the elevation's shadow.
	 *
	 * @public
	 * HTML Attribute: boolean
	 */
	@attr({ attribute: 'no-shadow', mode: 'boolean' }) noShadow?: boolean;
	@attr({ attribute: 'no-position', mode: 'boolean' }) noPosition?: boolean;
}
