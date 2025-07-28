import { attr } from '@microsoft/fast-element';
import type { Connotation } from '../enums.js';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { DelegatesAria } from '../../shared/aria/delegates-aria';

/**
 * Types of selectable-box connotation.
 *
 * @public
 */
export type SelectableBoxConnotation = Connotation.Accent | Connotation.CTA;

/**
 * Types of selectable-box control-type.
 *
 * @public
 */
export type SelectableBoxControlType = 'checkbox' | 'radio';

/**
 * @public
 * @component selectable-box
 * @slot default - Slot for box's content.
 * @event {CustomEvent<undefined>} change - Fired when the checked state changes
 */
export class SelectableBox extends DelegatesAria(VividElement) {
	/**
	 * Controls the checked state of the box
	 *
	 * @public
	 * HTML Attribute: checked
	 */
	@attr({ mode: 'boolean' }) checked = false;

	/**
	 * Makes the entire selectable box clickable
	 *
	 * @public
	 * HTML Attribute: clickable-box
	 */
	@attr({ attribute: 'clickable-box', mode: 'boolean' })
	clickableBox = false;

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
	 * HTML Attribute: control-type
	 */
	@attr({ attribute: 'control-type' }) controlType?: SelectableBoxControlType;

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
		if (this.clickableBox) this.$emit('change');
	}

	/**
	 * @internal
	 */
	_handleKeydown(event: KeyboardEvent) {
		if ((event.code === 'Space' || event.code === 'Enter') && this.clickableBox)
			return this._handleCheckedChange();
		return true;
	}
}
