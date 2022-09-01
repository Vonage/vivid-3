import { applyMixins, ListboxOption as FastListboxOption } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';

/**
 * Base class for listbox-option
 *
 * @public
 */


export class ListboxOption extends FastListboxOption {
	/**
	 *
	 * @public
	 *
	 * HTML Attribute: optionText
	 */
	@attr({
		attribute: 'text',
	}) optionText?: string; // TODO: This should be named text
}

export interface ListboxOption extends AffixIconWithTrailing { }
applyMixins(ListboxOption, AffixIconWithTrailing);
