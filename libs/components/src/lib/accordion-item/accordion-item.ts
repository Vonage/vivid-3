import { attr } from '@microsoft/fast-element';
import { applyMixins, AccordionItem as FASTAccordionItem } from '@microsoft/fast-foundation';
import { AffixIconWithTrailing } from '../shared/patterns/affix';

export class AccordionItem extends FASTAccordionItem {
	/**
	 *
	 *
	 * @public
	 *
	 * HTML Attribute: heading
	 */
	@attr heading?: string;

	/**
	 *
	 * @public
	 * HTML Attribute: leading
	 */
	@attr({ mode: 'boolean'	}) leading = false;

	/**
	 * Indicates whether the accordion-item has indicator
	 *
	 * @public
	 * HTML Attribute: no-indicator
	 */
	@attr({ mode: 'boolean', attribute: 'no-indicator' }) noIndicator = false;

	/**
	 *
	 * @public
	 *
	 * HTML Attribute: meta
	 */
	@attr meta?: string;
}

export interface AccordionItem extends AffixIconWithTrailing { }
applyMixins(AccordionItem, AffixIconWithTrailing);
