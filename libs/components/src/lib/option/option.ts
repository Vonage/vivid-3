import { applyMixins, ListboxOption as FoundationListboxOption } from '@microsoft/fast-foundation';
import {attr} from '@microsoft/fast-element';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';


/**
 * Base class for option
 *
 * @public
 * @slot icon - Slot to add an icon to the option.
 */
export class ListboxOption extends FoundationListboxOption {
	/**
	 *
	 * @public
	 *
	 * HTML Attribute: text
	 */
	@attr({
		attribute: 'text',
	}) _text?: string;

	// #region overrides base class accessor
	override set text(value) {
		this._text = value;
	}

	override get text() {
		return this._text ?? '';
	}

	@attr({
		attribute: 'label',
	}) _label?: string;
	override get label(): string {
		return this._label ?? this.text;
	}
	override set label(value: string) {
		this._label = value;
	}
	// #endregion overrides
}

export interface ListboxOption extends AffixIconWithTrailing { }
applyMixins(ListboxOption, AffixIconWithTrailing);
