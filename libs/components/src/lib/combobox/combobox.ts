import { attr } from '@microsoft/fast-element';
import {
	applyMixins,
	Combobox as FoundationCombobox,
} from '@microsoft/fast-foundation';
import type { Popup } from '../popup/popup';
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
	 * the placement of the combobox
	 *
	 * HTML Attribute: string
	 */
	@attr placement?: PopupPlacement;

	_popup!: Popup;
	_anchor!: HTMLElement;

	override connectedCallback() {
		super.connectedCallback();
		this._popup.anchor = this._anchor;
	}
}

export interface Combobox extends AffixIcon, FormElement {}
applyMixins(Combobox, AffixIcon);
