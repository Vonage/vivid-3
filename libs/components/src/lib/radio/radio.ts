import { attr } from '@microsoft/fast-element';
import { Radio as FastRadio } from '@microsoft/fast-foundation';

/**
 * Base class for radio
 *
 * 
 */
export class Radio extends FastRadio {
	/**
	 * Indicates the radio's label.
	 *
	 * 
	 * 
	 * HTML Attribute: label
	 */
	@attr label?: string;
}
