import { applyMixins, ListboxOption as FoundationListboxOption } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';


/**
 * Base class for option
 *
 * @public
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

	override set text(value) {
		this._text = value;
	}

	override get text() {
		return this._text ?? '';
	}
}

export interface ListboxOption extends AffixIconWithTrailing { }
applyMixins(ListboxOption, AffixIconWithTrailing);
