import { attr } from '@microsoft/fast-element';
import {
	applyMixins,
	AccordionItem as FASTAccordionItem,
} from '@microsoft/fast-foundation';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';
import type { Size } from '../enums.js';

/**
 * Types of accordion size.
 *
 * @public
 */
export type AccordionItemSize = Extract<Size, Size.Condensed | Size.Normal>;

/**
 * @public
 * @component accordion-item
 * @slot - Default slot.
 * @slot icon - Add an icon to the component.
 * @event {CustomEvent<undefined>} change - Fires a custom 'change' event when the button is invoked
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

export interface AccordionItem extends AffixIconWithTrailing {}
applyMixins(AccordionItem, AffixIconWithTrailing);
