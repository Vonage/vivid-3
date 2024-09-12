import { attr, observable } from '@microsoft/fast-element';
import {
	applyMixins,
	MenuItem as FastMenuItem,
	MenuItemRole as FastMenuItemRole,
} from '@microsoft/fast-foundation';
import { keyEnter, keySpace } from '@microsoft/fast-web-utilities';
import {
	keyArrowLeft,
	keyArrowRight,
} from '@microsoft/fast-web-utilities/dist/key-codes';
import { AffixIcon } from '../../shared/patterns/affix';
import { Menu } from '../menu/menu';
import { Connotation } from '../enums';

export const MenuItemRole = {
	...FastMenuItemRole,
	presentation: 'presentation',
} as const;

export enum CheckAppearance {
	Normal = 'normal',
	TickOnly = 'tick-only',
}
/**
 * Types of fab connotation.
 *
 * @public
 */
export type MenuItemConnotation = Extract<
	Connotation,
	Connotation.CTA | Connotation.Accent
>;

/**
 * @public
 * @component menu-item
 * @slot meta - Assign nodes to the `meta` slot to set a badge or an additional icon.
 * @slot trailing-meta - Assign nodes to the `meta` slot to set a badge or an additional icon.
 * @slot submenu - Assign a Menu to the `submenu` slot to add a submenu.
 * @event {CustomEvent<HTMLElement>} expanded-change - Fires a custom 'expanded-change' event when the expanded state changes
 * @event {CustomEvent<undefined>} change - Fires a custom 'change' event when a non-submenu item with a role of `menuitemcheckbox`, `menuitemradio`, or `menuitem` is invoked
 * @vueModel modelValue checked change `(event.target as HTMLInputElement).checked`
 */
export class MenuItem extends FastMenuItem {
	/**
	 * Indicates the menu item's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;
	/**
	 * Indicates the menu item's secondary text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr({ attribute: 'text-secondary' }) textSecondary?: string;
	/**
	 * The connotation the fab should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: MenuItemConnotation;
	/**
	 * Controls the placement of the menu item's checkmark or radio icon.
	 * @public
	 * @remarks
	 * HTML Attribute: check-trailing
	 */
	@attr({ mode: 'boolean', attribute: 'check-trailing' }) checkTrailing = false;
	/**
	 * Controls the appearance of the check indicator.
	 * @public
	 * @remarks
	 * HTML Attribute: check-appearance
	 */
	@attr({ attribute: 'check-appearance' }) checkedAppearance?: CheckAppearance;

	/**
	 *
	 * Meta & Trailing-meta slot observer:
	 *
	 * @internal
	 */
	@observable metaSlottedContent?: HTMLElement[];
	@observable trailingMetaSlottedContent?: HTMLElement[];
	/**
	 *
	 * Submenu slot observer:
	 *
	 * @internal
	 */
	@observable slottedSubmenu?: Menu[];
	#submenuArray: Menu[] = [];

	/**
	 *
	 *
	 * @internal
	 */
	slottedSubmenuChanged(_oldValue: Menu[], newValue: Menu[]) {
		this.#submenuArray = newValue;
	}

	constructor() {
		super();
		(this as any).updateSubmenu = () => this.#updateSubmenu();
		this.addEventListener('expanded-change', this.#expandedChange);
		(this as any).handleMenuItemKeyDown = this.#handleMenuItemKeyDown;
	}

	#updateSubmenu() {
		for (const submenu of this.#submenuArray) {
			this.submenu = submenu as Menu;
			(this.submenu as Menu).anchor = this as MenuItem;
			(this.submenu as Menu).placement = 'right-start';
			(this.submenu as Menu).collapseExpandedItem = () =>
				this.#collapseExpandedItem();
		}

		this.hasSubmenu = this.submenu === undefined ? false : true;
	}

	#collapseExpandedItem() {
		this.expanded = false;
	}

	#expandedChange() {
		if (this.hasSubmenu) {
			(this.submenu as Menu).open = this.expanded;
		}
	}

	#handleMenuItemKeyDown = (e: KeyboardEvent): boolean => {
		if (e.defaultPrevented) {
			return false;
		}

		switch (e.key) {
			case keyEnter:
			case keySpace:
				(this as any).invoke();
				if (!this.disabled) {
					this.#emitSyntheticClick();
				}
				return false;

			case keyArrowRight:
				//open/focus on submenu
				(this as any).expandAndFocus();
				if (this.hasSubmenu) {
					this.#emitSyntheticClick();
				}
				return false;

			case keyArrowLeft:
				//close submenu
				if (this.expanded) {
					this.expanded = false;
					this.focus();
					this.#emitSyntheticClick();
					return false;
				}
		}

		return true;
	};

	#syntheticClickEvents = new WeakSet<Event>();
	/**
	 * @internal
	 */
	_isSyntheticClickEvent(event: Event) {
		return this.#syntheticClickEvents.has(event);
	}

	#emitSyntheticClick() {
		const mouseEvent = new MouseEvent('click', {
			bubbles: true,
			composed: true,
		});
		this.#syntheticClickEvents.add(mouseEvent);
		this.dispatchEvent(mouseEvent);
	}
}

export interface MenuItem extends AffixIcon {}

applyMixins(MenuItem, AffixIcon);
