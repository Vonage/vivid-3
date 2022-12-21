import { FoundationElement } from '@microsoft/fast-foundation';
import { applyMixins } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { isHTMLElement } from '@microsoft/fast-web-utilities';
import { AffixIconWithTrailing } from '../../shared/patterns/affix';

/**
 * Determines if the element is a {@link (AccordionItem:class)}
 *
 * @param element - the element to test.
 * @param el
 * @public
 */
export function isAccordionItem(el: Element): el is AccordionItem {
	return (
		isHTMLElement(el) && el.tagName.endsWith('accordion-item'.toUpperCase())
	);
}

/**
 * Base class for accordion-item
 *
 * @public
 */
export class AccordionItem extends FoundationElement {
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
	 * HTML Attribute: heading-level
	 */
	@attr({ attribute: 'heading-level' }) headingLevel?: 2 | 3 | 4 | 5 | 6;

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
	 * Indicates whether the accordion-item is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;

	override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		super.attributeChangedCallback(name, oldValue, newValue);
		if (name === 'open') {
			newValue === null ? this.$emit('closed', undefined, { bubbles: false })
				:	this.$emit('opened', undefined, { bubbles: false });
		}
	}
}

export interface AccordionItem extends AffixIconWithTrailing { }
applyMixins(AccordionItem, AffixIconWithTrailing);
