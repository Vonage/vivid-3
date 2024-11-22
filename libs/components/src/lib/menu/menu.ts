import { attr, DOM, observable } from '@microsoft/fast-element';
import { FoundationElement, roleForMenuItem } from '@microsoft/fast-foundation';
import type { Placement, Strategy } from '@floating-ui/dom';
import {
	isHTMLElement,
	keyArrowDown,
	keyArrowUp,
	keyEnd,
	keyHome,
} from '@microsoft/fast-web-utilities';
import { type Anchored, anchored } from '../../shared/patterns/anchored';
import { MenuItem, MenuItemRole } from '../menu-item/menu-item';

/**
 * @public
 * @component menu
 * @slot - Default slot.
 * @slot anchor - Used to set the anchor element for the menu.
 * @slot header - Used to add additional content to the top of the menu.
 * @slot action-items - Used to add action items to the bottom of the menu.
 * @event {CustomEvent<undefined>} open - Fired when the menu is opened
 * @event {CustomEvent<undefined>} close - Fired when the menu is closed
 */
@anchored
export class Menu extends FoundationElement {
	/**
	 * @internal
	 */
	@observable
	items!: HTMLSlotElement;

	/**
	 * @internal
	 */
	itemsChanged() {
		// only update children after the component is connected and
		// the setItems has run on connectedCallback
		// (menuItems is undefined until then)
		if (this.$fastController.isConnected && this.menuItems !== undefined) {
			this.setItems();
		}
	}

	private menuItems: Element[] | undefined;

	private expandedItem: MenuItem | null = null;

	/**
	 * The index of the focusable element in the items array
	 * defaults to -1
	 */
	private focusIndex = -1;

	private static focusableElementRoles: { [key: string]: string } =
		roleForMenuItem;

	/**
	 * @internal
	 */
	override connectedCallback() {
		super.connectedCallback();
		DOM.queueUpdate(() => {
			// wait until children have had a chance to
			// connect before setting/checking their props/attributes
			this.setItems();
		});
	}

	/**
	 * @internal
	 */
	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.removeItemListeners();
		this.menuItems = undefined;
	}

	/**
	 * Focuses the first item in the menu.
	 *
	 * @public
	 */
	override focus(): void {
		this.setFocus(0, 1);
	}

	/**
	 * Collapses any expanded menu items.
	 *
	 * @public
	 */
	collapseExpandedItem(): void {
		if (this.expandedItem !== null) {
			this.expandedItem.expanded = false;
			this.expandedItem = null;
		}
	}

	/**
	 * @internal
	 */
	handleMenuKeyDown(e: KeyboardEvent): void | boolean {
		if (e.defaultPrevented || this.menuItems === undefined) {
			return;
		}
		switch (e.key) {
			case keyArrowDown:
				// go forward one index
				this.setFocus(this.focusIndex + 1, 1);
				return;
			case keyArrowUp:
				// go back one index
				this.setFocus(this.focusIndex - 1, -1);
				return;
			case keyEnd:
				// set focus on last item
				this.setFocus(this.menuItems.length - 1, -1);
				return;
			case keyHome:
				// set focus on first item
				this.setFocus(0, 1);
				return;

			default:
				// if we are not handling the event, do not prevent default
				return true;
		}
	}

	/**
	 * if focus is moving out of the menu, reset to a stable initial state
	 * @internal
	 */
	handleFocusOut = (e: FocusEvent) => {
		if (
			!this.contains(e.relatedTarget as Element) &&
			this.menuItems !== undefined &&
			this.menuItems.length
		) {
			this.collapseExpandedItem();
			// find our first focusable element
			const focusIndex: number = this.menuItems.findIndex(
				this.isFocusableElement
			);
			// set the current focus index's tabindex to -1
			this.menuItems[this.focusIndex].setAttribute('tabindex', '-1');
			// set the first focusable element tabindex to 0
			this.menuItems[focusIndex].setAttribute('tabindex', '0');
			// set the focus index
			this.focusIndex = focusIndex;
		}
	};

	private handleItemFocus = (e: FocusEvent) => {
		const targetItem: HTMLElement = e.target as HTMLElement;

		if (
			this.menuItems !== undefined &&
			targetItem !== this.menuItems[this.focusIndex]
		) {
			this.menuItems[this.focusIndex].setAttribute('tabindex', '-1');
			this.focusIndex = this.menuItems.indexOf(targetItem);
			targetItem.setAttribute('tabindex', '0');
		}
	};

	private handleExpandedChanged = (e: Event): void => {
		if (
			e.defaultPrevented ||
			e.target === null ||
			this.menuItems === undefined ||
			this.menuItems.indexOf(e.target as Element) < 0
		) {
			return;
		}

		e.preventDefault();
		const changedItem = e.target as MenuItem;

		// closing an expanded item without opening another
		if (
			this.expandedItem !== null &&
			changedItem === this.expandedItem &&
			changedItem.expanded === false
		) {
			this.expandedItem = null;
			return;
		}

		if (changedItem.expanded) {
			if (this.expandedItem !== null && this.expandedItem !== changedItem) {
				this.expandedItem.expanded = false;
			}
			this.menuItems[this.focusIndex].setAttribute('tabindex', '-1');
			this.expandedItem = changedItem;
			this.focusIndex = this.menuItems.indexOf(changedItem);
			changedItem.setAttribute('tabindex', '0');
		}
	};

	private removeItemListeners = (): void => {
		if (this.menuItems !== undefined) {
			this.menuItems.forEach((item) => {
				item.removeEventListener('expanded-change', this.handleExpandedChanged);
				item.removeEventListener(
					'focus',
					this.handleItemFocus as EventListener
				);
			});
		}
	};

	private setItems = () => {
		const newItems = this.domChildren();

		this.removeItemListeners();
		this.menuItems = newItems;

		const menuItems = this.menuItems.filter(this.isMenuItemElement);

		// if our focus index is not -1 we have items
		if (menuItems.length) {
			this.focusIndex = 0;
		}

		menuItems.forEach((item: HTMLElement, index: number) => {
			item.setAttribute('tabindex', index === 0 ? '0' : '-1');
			item.addEventListener('expanded-change', this.handleExpandedChanged);
			item.addEventListener('focus', this.handleItemFocus);
		});
	};

	/**
	 * get an array of valid DOM children
	 */
	private domChildren(): Element[] {
		return Array.from(this.children)
			.filter((child) => !child.hasAttribute('hidden'))
			.filter((child) => !child.hasAttribute('slot'));
	}

	/**
	 * check if the item is a menu item
	 */
	private isMenuItemElement = (el: Element): el is HTMLElement => {
		return (
			isHTMLElement(el) &&
			Menu.focusableElementRoles.hasOwnProperty(
				el.getAttribute('role') as string
			)
		);
	};

	/**
	 * check if the item is focusable
	 */
	private isFocusableElement = (el: Element): el is HTMLElement => {
		return this.isMenuItemElement(el);
	};

	private setFocus(focusIndex: number, adjustment: number): void {
		if (this.menuItems === undefined) {
			return;
		}

		while (focusIndex >= 0 && focusIndex < this.menuItems.length) {
			const child: Element = this.menuItems[focusIndex];

			if (this.isFocusableElement(child)) {
				// change the previous index to -1
				if (
					this.focusIndex > -1 &&
					this.menuItems.length >= this.focusIndex - 1
				) {
					this.menuItems[this.focusIndex].setAttribute('tabindex', '-1');
				}

				// update the focus index
				this.focusIndex = focusIndex;

				// update the tabindex of next focusable element
				child.setAttribute('tabindex', '0');

				// focus the element
				child.focus();

				break;
			}

			focusIndex += adjustment;
		}
	}

	@attr({ attribute: 'aria-label' }) override ariaLabel: string | null = null;

	/**
	 * placement of the menu
	 *
	 * @public
	 * HTML Attribute: placement
	 */
	@attr({ mode: 'fromView' }) placement?: Placement = 'bottom';

	/**
	 * Controls how the menu opens and closes itself.
	 *
	 * @public
	 * HTML Attribute: trigger
	 */
	@attr trigger?: 'auto' | 'legacy' | 'off';
	get #triggerBehaviour(): 'auto' | 'legacy' | 'off' {
		return this.trigger ?? 'legacy';
	}

	/**
	 * indicates whether the menu will automatically close when focus moves away from it.
	 *
	 * @public
	 * HTML Attribute: auto-dismiss
	 */
	@attr({ mode: 'boolean', attribute: 'auto-dismiss' }) autoDismiss = false;

	/**
	 * The strategy-absolute attribute.
	 *
	 * @public
	 * HTML Attribute: strategy
	 */
	@attr({ mode: 'fromView', attribute: 'position-strategy' })
	positionStrategy?: Strategy = 'fixed';
	/**
	 * indicates whether the menu is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;
	openChanged(_: boolean, newValue: boolean): void {
		newValue
			? this.$emit('open', undefined, { bubbles: false })
			: this.$emit('close', undefined, { bubbles: false });

		if (this._anchorEl) {
			this.#updateAnchor(this._anchorEl);
		}
	}

	/**
	 * @internal
	 */
	_anchorElChanged(oldValue?: HTMLElement, newValue?: HTMLElement): void {
		if (oldValue) this.#cleanupAnchor(oldValue);
		if (newValue) this.#setupAnchor(newValue);
	}

	#setupAnchor(a: HTMLElement) {
		a.addEventListener('click', this.#onAnchorClick, true);
		a.addEventListener('focusout', this._onFocusout);
		a.setAttribute('aria-haspopup', 'menu');
		this.#updateAnchor(a);
	}

	#updateAnchor(a: HTMLElement) {
		a.setAttribute('aria-expanded', this.open.toString());
	}

	#cleanupAnchor(a: HTMLElement) {
		a.removeEventListener('click', this.#onAnchorClick, true);
		a.removeEventListener('focusout', this._onFocusout);
		a.removeAttribute('aria-hasPopup');
		a.removeAttribute('aria-expanded');
	}

	#onAnchorClick = () => {
		if (this.#triggerBehaviour === 'off') {
			return;
		}

		// Legacy behaviour: only open the menu but don't close it
		if (this.#triggerBehaviour === 'legacy' && this.open) {
			return;
		}

		const newValue = !this.open;
		DOM.queueUpdate(() => (this.open = newValue));
	};

	_onFocusout = (e: FocusEvent) => {
		const focusTarget = e.relatedTarget as Node;
		const focusMovedAway =
			!this.contains(focusTarget) && !this._anchorEl?.contains(focusTarget);
		if (this.autoDismiss && focusMovedAway) {
			this.open = false;
		}
	};

	/**
	 * @internal
	 */
	_onChange(e: Event) {
		const clickedOnNonCheckboxMenuItem =
			e.target instanceof HTMLElement &&
			(e.target.role === 'menuitem' || e.target.role === 'menuitemradio');

		if (this.#triggerBehaviour === 'auto' && clickedOnNonCheckboxMenuItem) {
			this.open = false;
		}

		const changedMenuItem = e.target as MenuItem;
		const changeItemIndex = this.menuItems!.indexOf(changedMenuItem);

		if (changeItemIndex === -1) {
			return;
		}

		if (changedMenuItem.role === 'menuitemradio' && changedMenuItem.checked) {
			// Uncheck all other radio boxes
			for (let i = changeItemIndex - 1; i >= 0; --i) {
				const item = this.menuItems![i];
				const role: string | null = item.getAttribute('role');
				if (role === MenuItemRole.menuitemradio) {
					(item as MenuItem).checked = false;
				}
				if (role === 'separator') {
					break;
				}
			}
			const maxIndex = this.menuItems!.length - 1;
			for (let i = changeItemIndex + 1; i <= maxIndex; ++i) {
				const item = this.menuItems![i];
				const role = item.getAttribute('role');
				if (role === MenuItemRole.menuitemradio) {
					(item as MenuItem).checked = false;
				}
				if (role === 'separator') {
					break;
				}
			}
		}

		return true;
	}

	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */
	@observable headerSlottedContent?: HTMLElement[];
	@observable actionItemsSlottedContent?: HTMLElement[];
}

export interface Menu extends Anchored {}
