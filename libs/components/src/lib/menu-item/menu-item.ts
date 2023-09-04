import { attr, observable } from '@microsoft/fast-element';
import {
	applyMixins,
	MenuItem as FastMenuItem,
	MenuItemRole as FastMenuItemRole,
} from '@microsoft/fast-foundation';
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
		if (this.#submenu) this.#submenu.open = true;
	};

	/**
	 * @internal
	 */
	hide = () => {
		if (!this.hasSubMenu || !this.expanded) {
			return;
		}
		this.expanded = false;
		if (this.#submenu) this.#submenu.open = false;
	};

	/**
	 * @internal
	 */
	override handleMenuItemKeyDown = (e: KeyboardEvent): boolean => {
		if (e.defaultPrevented) {
			return false;
		}

		switch (e.key) {
			case 'Enter':
			case 'Space':
				this.show();
				return false;

			case 'ArrowRight':
				//open/focus on submenu
				if(this.expanded && this.#submenu){
					this.#submenu.focus();
					this.show();
					return false;
				}
				break;

			case 'Escape':
				// close submenu
				if (this.expanded) {
					this.hide();
					this.focus();
					return false;
				}
				break;

			case 'ArrowLeft':
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
	@observable slottedSubmenu?: HTMLElement[];

	slottedSubmenuChanged(_oldValue: HTMLElement[], newValue: HTMLElement[]) {
		this.hasSubMenu = newValue.length > 0;
		if (!this.hasSubMenu) {
			return;
		}

		for (const submenu of newValue) {
			if (submenu instanceof Menu) {
				this.#submenu = submenu;
				this.#submenu.anchor = this as MenuItem;
				this.#submenu.placement = 'right-start';
			}
		}
	}
}

export interface MenuItem extends AffixIcon { }

applyMixins(MenuItem, AffixIcon);
