import {
	attr,
	nullableNumberConverter,
	observable,
} from '@microsoft/fast-element';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';
import type { Size } from '../enums.js';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { ExtractFromEnum } from '../../shared/utils/enums';

/**
 * Types of accordion size.
 *
 * @public
 */
export type AccordionItemSize = ExtractFromEnum<
	Size,
	Size.Condensed | Size.Normal
>;

/**
 * @public
 * @component accordion-item
 * @slot - Default slot.
 * @slot icon - The preferred way to add an icon to the component.
 * @slot meta - Used to add additional content to the heading.
 * @slot heading - Used to add content to the heading.
 * @event {CustomEvent<undefined>} change - Fires a custom 'change' event when the button is invoked
 */
export class AccordionItem extends AffixIconWithTrailing(VividElement) {
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
	 * @internal
	 */
	@observable _headingSlottedContent?: HTMLElement[];

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
	 * @internal
	 */
	@observable _metaSlottedContent?: HTMLElement[];

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
