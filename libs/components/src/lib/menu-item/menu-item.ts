import { attr, observable } from '@microsoft/fast-element';
import {
	applyMixins,
	MenuItem as FastMenuItem,
	MenuItemRole as FastMenuItemRole,
} from '@microsoft/fast-foundation';
import { keyArrowLeft, keyArrowRight, keyEnter, keyEscape, keySpace } from '@microsoft/fast-web-utilities/dist/key-codes';
import { AffixIcon } from '../../shared/patterns/affix';
import { Menu } from '../menu/menu';

export const MenuItemRole = {
	...FastMenuItemRole,
	presentation: 'presentation',
} as const;

/**
 * Base class for menu-item
 *
 * @public
 * @slot meta - Assign nodes to the `meta` slot to set a badge or an additional icon.
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
	 * Indicates if the menu item has submenu.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: hasSubmenu
	 */
	@attr({ mode: 'boolean' }) hasSubMenu?: boolean;

	/**	
	 * @internal
	 * @remarks
	 */
	#submenu?: Menu;

	/**
	 * @internal
	 */
	show = () => {
		if (this.disabled || !this.hasSubMenu || this.expanded) {
			return;
		}
		this.expanded = true;
		if (this.#submenu) {
			this.#submenu.open = true;
		}
	};

	/**
	 * @internal
	 */
	hide = () => {
		if (!this.hasSubMenu || !this.expanded) {
			return;
		}
		this.expanded = false;
		if (this.#submenu) {
			this.#submenu.open = false;
		}
	};

	/**
	 * @internal
	 */
	override handleMenuItemKeyDown = (e: KeyboardEvent): boolean => {
		switch (e.key) {
			case keyEnter:
			case keySpace:
				this.show();
				this.#submenu?.focus();
				return false;

			case keyArrowRight:
				//open/focus on submenu
				this.show();
				this.#submenu?.focus();
				return false;

			case keyEscape:
				// close submenu
				if (this.expanded) {
					this.hide();
					this.focus();
					return false;
				}
				break;

			case keyArrowLeft:
				//close submenu
				if (this.expanded) {
					this.hide();
					this.focus();
					return false;
				}
				break;
		}
		return true;
	};


	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */
	@observable metaSlottedContent?: HTMLElement[];
	@observable slottedSubmenu?: Menu[];

	slottedSubmenuChanged(_oldValue: Menu[], newValue: Menu[]) {
		this.hasSubMenu = newValue.length > 0;
		if (!this.hasSubMenu) {
			return;
		}

		for (const submenu of newValue) {
			this.#submenu = submenu as Menu;
			this.#submenu.anchor = this as MenuItem;
			this.#submenu.placement = 'right-start';
		}
	}
}

export interface MenuItem extends AffixIcon { }

applyMixins(MenuItem, AffixIcon);
