import { attr } from '@microsoft/fast-element';
import { applyMixins, AccordionItem as FASTAccordionItem } from '@microsoft/fast-foundation';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';
import type { Size } from '../enums.js';
import { Localized } from '../../shared/patterns';


/**
 * Types of accordion size.
 *
 * @public
 */
export type AccordionItemSize = Extract<Size, Size.Condensed | Size.Normal>;

/**
 * @slot - Default slot.
 */
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

	/**
	 * The size the accordion-item should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: AccordionItemSize;
}





export interface AccordionItem extends AffixIconWithTrailing, Localized { }
applyMixins(AccordionItem, AffixIconWithTrailing, Localized);
