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

export type SelectableBoxControl = 'checkbox' | 'radio';


/**
 * Base class for selectable-box
 *
 * @public
 */
export class SelectableBox extends FoundationElement {
	@attr({attribute: 'aria-label'}) override ariaLabel: string | null = null;
	@attr({attribute: 'aria-labelledby'}) ariaLabelledby: string | null = null;
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
	@attr size?: SelectableBoxSize;

	/**
	* Removes the padding around the box's slot content
	*
	* @public
	* HTML Attribute: no-padding
	*/
	@attr({ mode: 'boolean' }) tight = false;

	/**
	* Controls the selected state of the box
	*
	* @public
	* HTML Attribute: no-padding
	*/
	@attr({ mode: 'boolean'}) checked = false;

	/**
	* Controls the selected state of the box
	*
	* @public
	* HTML Attribute: no-padding
	*/
	@attr({ mode: 'boolean'}) clickable = false;

	handleCheckedChange() {
		console.log('checked change!');
		if (this.control === 'radio' && this.checked) return;
		this.checked = !this.checked;
		this.$emit('change', { checked: this.checked });
	}

	handleKeydown(event: KeyboardEvent) {
		if (event.code === 'Space' && this.clickable) this.handleCheckedChange();
		return true;
	}
}