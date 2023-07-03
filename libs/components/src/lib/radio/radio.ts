import { attr } from '@microsoft/fast-element';
import { Radio as FastRadio } from '@microsoft/fast-foundation';
import type {Connotation} from '../enums.js';

/**
 * Types of Checkbox connotation.
 *
 * @public
 */
export type RadioConnotation = Extract<Connotation,
| Connotation.Accent
| Connotation.CTA>;

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

	/**
	 * The connotation the radioButton should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: RadioConnotation;

}
