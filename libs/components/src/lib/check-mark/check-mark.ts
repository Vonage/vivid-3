import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { CheckboxConnotation } from '../checkbox/checkbox';

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
	 * The readonly state of the check mark.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: readonly
	 */
	@attr({ mode: 'boolean'}) readOnly? = false;
}
