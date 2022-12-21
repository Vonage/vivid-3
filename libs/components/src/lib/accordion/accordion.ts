import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { AccordionItem } from '../accordion-item/accordion-item';

/**
 * Base class for accordion
 *
 * @public
 */
export class Accordion extends FoundationElement {
	private accordionItems: HTMLCollectionOf<AccordionItem> | undefined = undefined;

	/**
	 *
	 * @public
	 * HTML Attribute: multi
	 */
	@attr({
		mode: 'boolean',
	}) multi = false;

	override connectedCallback(): void {
		super.connectedCallback();
		this.addEventListener('opened', this.handleOpened);
		this.accordionItems = this.children as HTMLCollectionOf<AccordionItem>;
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeEventListener('opened', this.handleOpened);
	}

	private handleOpened(e: Event): any {
		if (!this.multi && this.accordionItems) {
			for (let i = 0; i < this.accordionItems.length; i++) {
				if (this.accordionItems[i] !== e.target) {
					this.accordionItems[i].open = false;
				}
			}
		}
	}

	closeAll(): void {
		if (this.accordionItems) {
			for (let i = 0; i < this.accordionItems.length; i++) {
				this.accordionItems[i].open = false;
			}
		}
	}
}
