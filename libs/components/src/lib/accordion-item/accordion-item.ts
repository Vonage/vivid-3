import { attr, nullableNumberConverter } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';
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
export class AccordionItem extends FoundationElement {
	/**
	 * Configures the {@link https://www.w3.org/TR/wai-aria-1.1/#aria-level | level} of the
	 * heading element.
	 *
	 * @defaultValue 2
	 * @public
	 * @remarks
	 * HTML attribute: heading-level
	 */
	@attr({
		attribute: 'heading-level',
		mode: 'fromView',
		converter: nullableNumberConverter,
	})
	headinglevel: 1 | 2 | 3 | 4 | 5 | 6 = 2;

	/**
	 * Expands or collapses the item.
	 *
	 * @public
	 * @remarks
	 * HTML attribute: expanded
	 */
	@attr({ mode: 'boolean' })
	expanded = false;

	/**
	 * The item ID
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: id
	 */
	@attr
	// @ts-expect-error Type is incorrectly non-optional
	id: string;

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

	/**
	 * @internal
	 */
	// @ts-expect-error Type is incorrectly non-optional
	expandbutton: HTMLElement;

	/**
	 * @internal
	 */
	clickHandler = () => {
		this.expanded = !this.expanded;
		this.change();
	};

	private change = (): void => {
		this.$emit('change');
	};
}

export interface AccordionItem extends AffixIconWithTrailing {}
applyMixins(AccordionItem, AffixIconWithTrailing);
