import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { Connotation, Size } from '../enums.js';

/**
 * Types of selectable-box connotation.
 *
 * @public
 */
export type SelectableBoxConnotation = Connotation.Accent | Connotation.CTA;

/**
 * Types of selectable-box connotation.
 *
 * @public
 */
export type SelectableBoxSpacing = Size.Normal | Size.Condensed;

export type SelectableBoxControl = 'checkbox' | 'radio';


/**
 * Base class for selectable-box
 *
 * @public
 */
export class SelectableBox extends FoundationElement {
	/**
	 * The connotation the selectable box should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: SelectableBoxConnotation;

	/**
	 * The type of control the box should have: checkbox or radio.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr control?: SelectableBoxControl;

	/**
	 * The amount of spacing the selectable box should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: spacing
	 */
	@attr spacing?: SelectableBoxSpacing;

	/**
	* Removes the padding around the box's content
	*
	* @public
	* HTML Attribute: no-padding
	*/
	@attr({ mode: 'boolean', attribute: 'no-padding' }) noPadding = false;

	/**
	* Controls the selected state of the box
	*
	* @public
	* HTML Attribute: no-padding
	*/
	@attr({ mode: 'boolean'}) selected = false;
}