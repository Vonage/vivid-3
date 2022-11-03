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
	 * HTML Attribute: optionText
	 */
	@attr({
		attribute: 'text',
	}) optionText?: string; // TODO: This should be named text
}

export interface ListboxOption extends AffixIconWithTrailing { }
applyMixins(ListboxOption, AffixIconWithTrailing);
