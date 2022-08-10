import { FoundationElement } from '@microsoft/fast-foundation';
import { applyMixins } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';

/**
 * Base class for list-item
 *
 * @public
 */
export class ListItem extends FoundationElement {
	/**
	 *
	 * @public
	 *
	 * HTML Attribute: text
	 */
	@attr text?: string;

	/**
	 *
	 * @public
	 *
	 * HTML Attribute: subtext
	 */
	@attr subtext?: string;
	/**
	 *
	 * @public
	 *
	 * HTML Attribute: meta
	 */
	@attr meta?: string;
}

export interface ListItem extends AffixIconWithTrailing { }
applyMixins(ListItem, AffixIconWithTrailing);
