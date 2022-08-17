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
	 * HTML Attribute: textPrimary
	 */
	@attr({
		attribute: 'text',
	}) textPrimary?: string; // TODO: This should be named text

	/**
	 *
	 * @public
	 *
	 * HTML Attribute: textSecondary
	 */
	@attr({
		attribute: 'text-secondary',
	}) textSecondary?: string;
}

export interface ListboxOption extends AffixIconWithTrailing { }
applyMixins(ListboxOption, AffixIconWithTrailing);
