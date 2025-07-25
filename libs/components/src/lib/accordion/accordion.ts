import { attr, observable } from '@microsoft/fast-element';
import {
	keyArrowDown,
	keyArrowUp,
	keyEnd,
	keyHome,
	wrapInBounds,
} from '@microsoft/fast-web-utilities';
import { AccordionItem } from '../accordion-item/accordion-item';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/**
 * Expand mode for {@link Accordion}
 * @public
 */
export const AccordionExpandMode = {
	/**
	 * Designates only a single AccordionItem can be open a time.
	 */
	single: 'single',

	/**
	 * Designates multiple AccordionItems can be open simultaneously.
	 */
	multi: 'multi',
} as const;

/**
 * Type for the {@link Accordion} Expand Mode
 * @public
 */
export type AccordionExpandMode =
	typeof AccordionExpandMode[keyof typeof AccordionExpandMode];

/**
 * @public
 * @component accordion
 * @event {CustomEvent<string | null>} change - Fires a custom 'change' event when the active item changes
 * @slot - Default slot.
 */
export class Accordion extends VividElement {
	/**
	 * Controls the expand mode of the Accordion, either allowing
	 * single or multiple item expansion.
	 * @public
	 *
	 * @remarks
	 * HTML attribute: expand-mode
	 */
	@attr({ attribute: 'expand-mode' })
	/* eslint-disable-next-line @repo/repo/no-attribute-default-value */
	expandmode: AccordionExpandMode = AccordionExpandMode.single;

	/**
	 * @internal
	 */
	@observable
	// @ts-expect-error Type is incorrectly non-optional
	accordionItems: HTMLElement[];

	/**
	 * @internal
	 */
	accordionItemsChanged(oldValue: HTMLElement[]): void {
		if (this.$fastController.isConnected) {
			this.removeItemListeners(oldValue);
			this.setItems();
		}
	}

	// @ts-expect-error Type is incorrectly non-optional
	activeid: string | null;
	activeItemIndex = 0;
	// @ts-expect-error Type is incorrectly non-optional
	accordionIds: Array<string | null>;

	private change = (): void => {
		this.$emit('change', this.activeid);
	};

	private findExpandedItem(): AccordionItem | null {
		for (let item = 0; item < this.accordionItems.length; item++) {
			if (this.accordionItems[item].hasAttribute('expanded') === true) {
				return this.accordionItems[item] as AccordionItem;
			}
		}
		return null;
	}

	private setItems = (): void => {
		if (this.accordionItems.length === 0) {
			return;
		}
		this.accordionIds = this.getItemIds();
		this.activeid = this.accordionIds[this.activeItemIndex] as string;
		this.accordionItems.forEach((item: HTMLElement, index: number) => {
			if (item instanceof AccordionItem) {
				item.addEventListener('change', this.activeItemChange);
				if (this.isSingleExpandMode()) {
					const expandedItem = this.findExpandedItem();
					if (expandedItem === null && index === 0) {
						item.expanded = true;
					} else {
						item !== this.findExpandedItem()
							? (item.expanded = false)
							: (item.expanded = true);
					}
				}
			}
			const itemId: string | null = this.accordionIds[index];
			item.setAttribute(
				'id',
				typeof itemId !== 'string' ? `accordion-${index + 1}` : itemId
			);
			item.addEventListener('keydown', this.handleItemKeyDown);
		});
		if (this.isSingleExpandMode()) {
			const expandedItem: AccordionItem | null =
				this.findExpandedItem() ?? (this.accordionItems[0] as AccordionItem);
			expandedItem.setAttribute('aria-disabled', 'true');
		}
	};

	private resetItems(): void {
		this.accordionItems.forEach((item: any) => {
			item.expanded = false;
		});
	}

	private removeItemListeners = (oldValue: any): void => {
		oldValue.forEach((item: HTMLElement) => {
			item.removeEventListener('change', this.activeItemChange);
			item.removeEventListener('keydown', this.handleItemKeyDown);
		});
	};

	private activeItemChange = (event: Event): void => {
		if (event.defaultPrevented || event.target !== event.currentTarget) {
			return;
		}

		event.preventDefault();
		const selectedItem = event.target as AccordionItem;

		this.activeid = selectedItem.getAttribute('id');
		if (this.isSingleExpandMode()) {
			this.resetItems();
			selectedItem.expanded = true;
			selectedItem.setAttribute('aria-disabled', 'true');
			this.accordionItems.forEach((item: HTMLElement) => {
				if (!item.hasAttribute('disabled') && item.id !== this.activeid) {
					item.removeAttribute('aria-disabled');
				}
			});
		}
		this.activeItemIndex = Array.from(this.accordionItems).indexOf(
			selectedItem
		);
		this.change();
	};

	private getItemIds(): Array<string | null> {
		return this.accordionItems.map((accordionItem: HTMLElement) => {
			return accordionItem.getAttribute('id');
		});
	}

	private isSingleExpandMode(): boolean {
		return this.expandmode !== AccordionExpandMode.multi;
	}

	private handleItemKeyDown = (event: KeyboardEvent): void => {
		// only handle the keydown if the event target is the accordion item
		// prevents arrow keys from moving focus to accordion headers when focus is on accordion item panel content
		if (event.target !== event.currentTarget) {
			return;
		}
		this.accordionIds = this.getItemIds();
		switch (event.key) {
			case keyArrowUp:
				event.preventDefault();
				this.adjust(event.target as AccordionItem, -1);
				break;
			case keyArrowDown:
				event.preventDefault();
				this.adjust(event.target as AccordionItem, 1);
				break;
			case keyHome:
				this.focusItem(0);
				break;
			case keyEnd:
				this.focusItem(this.accordionItems.length - 1);
				break;
		}
	};

	private adjust(item: AccordionItem, adjustment: number): void {
		this.focusItem(
			wrapInBounds(
				0,
				this.accordionItems.length - 1,
				this.accordionItems.indexOf(item) + adjustment
			)
		);
	}

	private focusItem(index: number): void {
		const element: HTMLElement = this.accordionItems[index];
		if (element instanceof AccordionItem) {
			element.expandbutton.focus();
		}
	}

	closeAll(): void {
		if (this.expandmode === AccordionExpandMode.multi) {
			(this.accordionItems as AccordionItem[]).forEach((item) => {
				item.expanded = false;
			});
		}
	}
}
