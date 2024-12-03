import { attr } from '@microsoft/fast-element';
import { applyMixins } from '@microsoft/fast-foundation';
import type { Popup } from '../popup/popup';
import type { Appearance } from '../enums';
import {
	AffixIcon,
	type FormElement,
	formElements,
} from '../../shared/patterns';
import { FormAssociatedCombobox } from './combobox.form-associated';

/**
 * Types of popup placement
 *
 * @public
 */
export type PopupPlacement = 'top' | 'bottom';

/**
 * Types of input appearance
 *
 * @public
 */
export type ComboboxAppearance = Extract<
	Appearance,
	Appearance.Fieldset | Appearance.Ghost
>;

/**
 * @public
 * @component combobox
 * @slot - Default slot.
 * @event {CustomEvent<undefined>} change - Fires a custom 'change' event when the value updates
 * @vueModel modelValue value change `(event.target as HTMLInputElement).value`
 */
@formElements
export class Combobox extends FormAssociatedCombobox {
	/**
	 * The appearance attribute.
	 *
	 * @public
	 * HTML Attribute: appearance
	 */
	@attr appearance?: ComboboxAppearance;

	/**
	 * the placement of the combobox
	 *
	 * HTML Attribute: string
	 */
	@attr placement?: PopupPlacement;

	/**
	 * Whether the dropdown is using a fixed positioning strategy.
	 *
	 * @public
	 * HTML Attribute: fixed-dropdown
	 */
	@attr({ mode: 'boolean', attribute: 'fixed-dropdown' }) fixedDropdown = false;

	_popup!: Popup;
	_anchor!: HTMLElement;

	override connectedCallback() {
		super.connectedCallback();
		this._popup.anchor = this._anchor;
	}
}

export interface Combobox extends AffixIcon, FormElement {}
applyMixins(Combobox, AffixIcon);
