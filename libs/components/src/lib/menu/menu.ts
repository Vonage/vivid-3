import { attr, DOM, observable } from '@microsoft/fast-element';
import type { Placement, Strategy } from '@floating-ui/dom';
import {
	keyArrowDown,
	keyArrowUp,
	keyEnd,
	keyHome,
} from '@microsoft/fast-web-utilities';
import { Anchored } from '../../shared/patterns/anchored';
import { MenuItem } from '../menu-item/menu-item';
import type { Popup } from '../popup/popup';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { MenuItemRole } from '../menu-item/menu-item-role';
import { DelegatesAria } from '../../shared/aria/delegates-aria';
import { Divider } from '../divider/divider';

/*
 * Supported menu item children:
 * All direct children of menu must have role menuitem, menuitemcheckbox, menuitemradio, or separator.
 * For menuitemcheckbox and menuitemradio, only MenuItem components are supported.
 * For menuitem or separator, any HTMLElement with the appropriate role is supported.
 */

const isCheckbox = (el: Element): el is MenuItem =>
	el instanceof MenuItem && el.controlType === 'checkbox';

const isRadio = (el: Element): el is MenuItem =>
	el instanceof MenuItem && el.controlType === 'radio';

const isSeparator = (el: Element) =>
	el instanceof Divider ? true : el.role === 'separator';

const isMenuItemElement = (el: Element): el is HTMLElement =>
	el instanceof MenuItem ? true : Boolean(el.role && el.role in MenuItemRole);

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
export class Menu extends Anchored(DelegatesAria(VividElement)) {
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

	private menuItems: HTMLElement[] | undefined;

	private expandedItem: MenuItem | null = null;

	/**
	 * The index of the focusable element in the items array
	 * defaults to -1
	 */
	private focusIndex = -1;

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
	 * Moves focus into the menu. If there is a child with the `autofocus` attribute, it will be focused.
	 * Otherwise, the first focusable child will be focused.
	 *
	 * @public
	 */
	override focus(): void {
		const autoFocusElement = this.querySelector(
			'[autofocus]:not([slot="anchor"])'
		);
		if (autoFocusElement instanceof HTMLElement) {
			autoFocusElement.focus();
		} else {
			this.setFocus(0);
		}
	}

	/**
	 * Collapses any expanded Menu Items.
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
				this.setFocus(this.focusIndex + 1);
				return;
			case keyArrowUp:
				// go back one index
				this.setFocus(this.focusIndex - 1);
				return;
			case keyEnd:
				// set focus on last item
				this.setFocus(this.menuItems.length - 1);
				return;
			case keyHome:
				// set focus on first item
				this.setFocus(0);
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
			this.menuItems[this.focusIndex].setAttribute('tabindex', '-1');
			this.menuItems[0].setAttribute('tabindex', '0');
			this.focusIndex = 0;
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
		const changedItem = e.target as MenuItem;

		// closing an expanded item without opening another
		if (
			this.expandedItem !== null &&
			changedItem === this.expandedItem &&
			changedItem.expanded === false
		) {
			this.expandedItem = null;
		}

		if (changedItem.expanded) {
			this.expandedItem = changedItem;
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
		this.menuItems = newItems.filter(isMenuItemElement);

		// if our focus index is not -1 we have items
		if (this.menuItems.length) {
			this.focusIndex = 0;
		}

		this.menuItems.forEach((item: HTMLElement, index: number) => {
			if (item instanceof MenuItem) {
				item._isPresentational = false;
			}
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

	private setFocus(focusIndex: number): void {
		if (this.menuItems === undefined) {
			return;
		}

		if (focusIndex >= 0 && focusIndex < this.menuItems.length) {
			const child: HTMLElement = this.menuItems[focusIndex];

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
		}
	}

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
		if (newValue) {
			// Ensure popup is shown and positioned so that focus can be set
			this._popupEl?.show().then(() => this.focus());
		} else {
			// TODO: Focus should be restored to the anchor element when the menu is closed
			// However, it cannot be implemented without triggering visible focus
		}

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
		a.setAttribute('data-expanded', this.open.toString());
	}

	#cleanupAnchor(a: HTMLElement) {
		a.removeEventListener('click', this.#onAnchorClick, true);
		a.removeEventListener('focusout', this._onFocusout);
		a.removeAttribute('aria-haspopup');
		a.removeAttribute('aria-expanded');
		a.removeAttribute('data-expanded');
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
		if (this.menuItems === undefined || !(e.target instanceof Element)) {
			return;
		}

		if (this.#triggerBehaviour === 'auto' && !isCheckbox(e.target)) {
			this.open = false;
		}

		const domChildren = this.domChildren();
		const targetItemIndex = domChildren.indexOf(e.target);

		if (targetItemIndex === -1) {
			return;
		}

		if (isRadio(e.target) && e.target.checked) {
			// Uncheck all other radio boxes
			for (let i = targetItemIndex - 1; i >= 0; --i) {
				const item = domChildren[i];
				if (isRadio(item)) {
					item.checked = false;
				}
				if (isSeparator(item)) {
					break;
				}
			}
			for (let i = targetItemIndex + 1; i <= domChildren.length - 1; ++i) {
				const item = domChildren[i];
				if (isRadio(item)) {
					item.checked = false;
				}
				if (isSeparator(item)) {
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

	/**
	 * @internal
	 */
	_popupEl?: Popup;

	/**
	 * @internal
	 */
	@observable _popupOffset?: number;
}
