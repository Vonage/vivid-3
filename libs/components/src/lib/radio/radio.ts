import { attr } from '@microsoft/fast-element';
import { Radio as FastRadio } from '@microsoft/fast-foundation';

/**
 * Base class for radio
 *
 * @public
 */
export class Radio extends FastRadio {
	/**
	 * Indicates the radio's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;
}
