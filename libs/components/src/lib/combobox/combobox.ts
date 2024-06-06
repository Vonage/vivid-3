import { attr } from '@microsoft/fast-element';
import {
	applyMixins,
	Combobox as FoundationCombobox,
} from '@microsoft/fast-foundation';
import type { Popup } from '../popup/popup';
import type { TextFieldAppearance } from '../components';
import {
	AffixIcon,
	type FormElement,
	formElements,
} from '../../shared/patterns';

/**
 * Types of popup placement
 *
 * @public
 */
export type PopupPlacement = 'top' | 'bottom';

/**
 * @public
 * @component combobox
 * @slot - Default slot.
 * @vueModel modelValue current-value change `(event.target as HTMLInputElement).value`
 */
@formElements
export class Combobox extends FoundationCombobox {
	/**
	 * The appearance attribute.
	 *
	 * @public
	 * HTML Attribute: appearance
	 */
	@attr appearance?: TextFieldAppearance;

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
