import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { CheckboxConnotation } from '../../../lib/checkbox/checkbox';

/**
 * Base class for check-mark
 *
 * @public
 */
export class CheckMark extends FoundationElement {
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
	@attr connotation?: CheckboxConnotation;

	/**
	 * The disabled state of the check mark.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	@attr({ mode: 'boolean'}) disabled? = false;

	/**
	 * The indeterminate state of the check mark
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: indeterminate
	 */
	@attr({ mode: 'boolean'}) indeterminate? = false;

	/**
	 * The disables the hover styles when set to true
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: noHover
	 */
	@attr({ attribute: 'no-hover', mode: 'boolean'}) noHover? = false;

	/**
	 * The readonly state of the check mark.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: readonly
	 */
	@attr({ mode: 'boolean'}) readOnly? = false;
}
