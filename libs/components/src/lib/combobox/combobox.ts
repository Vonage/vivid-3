import { attr } from '@microsoft/fast-element';
import { applyMixins, Combobox as FoundationCombobox } from '@microsoft/fast-foundation';
import type { Popup } from '../popup/popup';
import { FormElement, formElements } from '../../shared/patterns';
import { AffixIcon } from '../../shared/patterns';

/**
 * Types of popup placement
 *
 * @public
 */
export type PopupPlacement = 'top' | 'bottom';

/**
 * Base class for combobox
 *
 * @slot - Default slot.
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

export interface Combobox extends AffixIcon, FormElement { }
applyMixins(Combobox, AffixIcon);
