import { attr } from '@microsoft/fast-element';
import type { Connotation } from '../enums.js';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import { replaces } from '../../shared/deprecation/replaced-props';

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
 * Types of selectable-box control-placement.
 *
 * @public
 */
export type SelectableBoxControlPlacement =
	| 'start'
	| 'start-stacked'
	| 'end'
	| 'end-stacked';

/**
 * @public
 * @component selectable-box
 * @slot default - Slot for box's content.
 * @event {CustomEvent<undefined>} change - Fired when the checked state changes
 * @testAction check check #control
 * @testAction uncheck uncheck #control
 * @testQuery checked checked true
 * @testQuery unchecked checked false
 * @testRef control nestedShadow [data-vvd-component].control div.control
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
	 * @deprecated Renamed to clickable-box. Use clickable-box instead.
	 * @public
	 * HTML Attribute: clickable
	 */
	@attr({ mode: 'boolean' }) clickable = false;

	/**
	 * Makes the entire selectable box clickable
	 *
	 * @public
	 * HTML Attribute: clickable-box
	 */
	@replaces<boolean>({
		deprecatedPropertyName: 'clickable',
		fromDeprecated: (v) => v,
	})
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
	 * Defines where the control (checkbox or radio) should be located.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: control-placement
	 */
	@attr({ attribute: 'control-placement', mode: 'fromView' })
	controlPlacement: SelectableBoxControlPlacement = 'end-stacked';

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
