import { FoundationElement } from '@microsoft/fast-foundation';
import { attr, observable } from '@microsoft/fast-element';
import { type AccordionItem, isAccordionItem } from '../accordion-item/accordion-item';

/**
 * Base class for accordion
 *
 * @public
 */
export class Accordion extends FoundationElement {
	/**
	 * A static filter to include only accordion items.
	 *
	 * @param n - element to filter
	 * @public
	 */
	static slottedAccordionItemFilter = (n: HTMLElement) =>
		isAccordionItem(n) && !n.hidden;

	/**
	 * The default slotted elements.
	 *
	 * @internal
	 */
	@observable
		slottedAccordionItems?: AccordionItem[];

	/**
	 * if accordion not set multi, keep only a single accordion item open at a time
	 *
	 * @param prev - the previous list of slotted options
	 * @param next - the current list of slotted options
	 * @internal
	 */
	slottedAccordionItemsChanged(prev: AccordionItem[] | undefined, next: AccordionItem[]) {
		// const new1 = next.filter();
		// [...new Set([...prev, ...next])];
		// next.find((item) => item.open);
	}

	/**
	 *
	 * @public
	 * HTML Attribute: multi
	 */
	@attr({
		mode: 'boolean',
	}) multi = false;

	/**
	 * Handle click events for accordion items.
	 *
	 * @param e
	 * @internal
	 */
	clickHandler(e: MouseEvent): boolean | void {
		const captured = isAccordionItem(e.target as HTMLElement) &&
			(e.composedPath() as HTMLElement[])[0].closest('button[aria-expanded="false"]');

		if (captured && !this.multi) {
			this.closeAccordionItems(e.target as AccordionItem);
			return true;
		}
	}

	private closeAccordionItems(itemToExclude?: AccordionItem) {
		this.slottedAccordionItems?.forEach((item: AccordionItem) => {
			if (item !== itemToExclude) {
				item.open = false;
			}
		});
	}

	closeAll(): void {
		this.closeAccordionItems();
	}
}

