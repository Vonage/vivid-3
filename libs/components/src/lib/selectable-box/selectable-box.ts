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
export type SelectableBoxSize = Size.Normal | Size.Condensed;

/**
 * Types of selectable-box control-type.
 *
 * @public
 */
export type SelectableBoxControlType = 'checkbox' | 'radio';


/**
 * Base class for selectable-box
 *
 * @public
 * @slot default - Slot for box's content.
 * @event change - Fired when the checked state changes
 */
export class SelectableBox extends FoundationElement {
	/**
	* Controls the checked state of the box
	*
	* @public
	* HTML Attribute: checked
	*/
	@attr({ mode: 'boolean'}) checked = false;

	/**
	* Makes the whole selectable box clickable
	*
	* @public
	* HTML Attribute: clickable
	*/
	@attr({ mode: 'boolean'}) clickable = false;

	/**
	 * The connotation the selectable box should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: SelectableBoxConnotation;

	/**
	 * Adds an accessible label to selectable box
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: control-aria-label
	 */
	@attr({ attribute: 'control-aria-label' }) controlAriaLabel: string | null = null;

	/**
	 * Links a piece of content as an accessible label
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: control-aria-labelledby
	 */
	@attr({ attribute: 'control-aria-labelledby' }) controlAriaLabelledby: string | null = null;

	/**
	 * The type of control the box should have: checkbox or radio.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: control-type
	 */
	@attr({ attribute: 'control-type' }) controlType?: SelectableBoxControlType;

	/**
	 * The amount of spacing the selectable box should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: SelectableBoxSize;

	/**
	* Removes the padding around the box's slot content
	*
	* @public
	* HTML Attribute: tight
	*/
	@attr({ mode: 'boolean' }) tight = false;

	/**
	 * @internal
	 */
	_handleCheckedChange() {
		if (this.controlType === 'radio' && this.checked) return;
		this.checked = !this.checked;
		this.$emit('change');
	}

	/**
	 * @internal
	 */
	_handleKeydown(event: KeyboardEvent) {
		if (event.code === 'Space' || event.code === 'Enter' && this.clickable) 
			this._handleCheckedChange();
		return true;
	}
}