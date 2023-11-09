import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { RadioConnotation } from '../radio/radio';

/**
 * Base class for radio-mark
 *
 * @public
 */
export class RadioMark extends FoundationElement {
	/**
	 * The checked state of the check mark
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: checked
	 */
	@attr({ mode: 'boolean'}) checked? = false;

	/**
	 * The connotation the chec kmark should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: RadioConnotation;

	/**
	 * The disabled state of the check mark.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	@attr({ mode: 'boolean'}) disabled? = false;

	/**
	 * The readonly state of the check mark.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: readonly
	 */
	@attr({ mode: 'boolean'}) readOnly? = false;
}
