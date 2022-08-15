import { applyMixins, ListboxOption as FastListboxOption } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';

/**
 * Base class for list-item
 *
 * @public
 */
export class ListItem extends FastListboxOption {
	/**
	 *
	 * @public
	 *
	 * HTML Attribute: textPrimary
	 */
	@attr({
		attribute: 'text-primary',
	}) textPrimary?: string;

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

export interface ListItem extends AffixIconWithTrailing { }
applyMixins(ListItem, AffixIconWithTrailing);
