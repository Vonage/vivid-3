import { FoundationElement } from '@microsoft/fast-foundation';
import { applyMixins } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { AffixIconWithTrailing } from '../../shared/patterns/affix.js';

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
	@attr({ attribute: 'heading-level'}) headingLevel?: 2 | 3 | 4 | 5 | 6;

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

	override attributeChangedCallback(name: string, oldValue: string, newValue: string): void{
		super.attributeChangedCallback(name, oldValue, newValue);
		if (name === 'open') {
			newValue === null ? this.emitEvent('closed') : this.emitEvent('opened');
		}
	}

	private emitEvent(name: string): void {
		const init: CustomEventInit = { bubbles: true, composed: true };
		const ev = new CustomEvent(name, init);
		this.dispatchEvent(ev);
	}
}

export interface AccordionItem extends AffixIconWithTrailing {}
applyMixins(AccordionItem, AffixIconWithTrailing);
