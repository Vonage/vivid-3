import {
	applyMixins,
	ListboxOption as FoundationListboxOption,
} from '@microsoft/fast-foundation';
import { attr, observable } from '@microsoft/fast-element';
import type { Size } from '../enums';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';


export type OptionSize = Extract<Size, Size.Condensed | Size.Normal>;
/**
 * @public
 * @component option
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
	})
	_text?: string;

	// #region overrides base class accessor
	override set text(value) {
		this._text = value;
	}

	override get text() {
		return this._text ?? '';
	}

	/**
	 * The size the option should have
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr() scale?: OptionSize;

	@attr({
		attribute: 'label',
	})
	_label?: string;
	override get label(): string {
		return this._label ?? this.text;
	}
	override set label(value: string) {
		this._label = value;
	}
	// #endregion overrides

	/**
	 * Whether to appear highlighted to indicate visual focus for keyboard interactions.
	 * @internal
	 */
	@observable _highlighted = false;

	/**
	 * Whether selected options should be decorated with a checkmark.
	 * @internal
	 */
	@observable _displayCheckmark = false;
}

export interface ListboxOption extends AffixIconWithTrailing {}
applyMixins(ListboxOption, AffixIconWithTrailing);
