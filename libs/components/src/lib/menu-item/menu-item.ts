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
	 *
	 * Slot observer:
	 *
	 * @internal
	 */
	@observable metaSlottedContent?: HTMLElement[];
	@observable slottedSubmenu?: Menu[];
	#submenuArray: Menu[] = [];

	slottedSubmenuChanged(_oldValue: Menu[], newValue: Menu[]) {
		this.#submenuArray = newValue;
	}

	constructor() {
		super();
		(this as any).updateSubmenu = () => this.#updateSubmenu();
		this.addEventListener('expanded-change', this.#expandedChange);
	}

	#updateSubmenu() {
		for (const submenu of this.#submenuArray) {
			this.submenu = submenu as Menu;
			(this.submenu as Menu).anchor = this as MenuItem;
			(this.submenu as Menu).placement = 'right-start';
		}

		this.hasSubmenu = this.submenu === undefined ? false : true;
	}

	#expandedChange() {
		if (this.hasSubmenu) {
			(this.submenu as Menu).open = this.expanded;
		}
	}
}

export interface MenuItem extends AffixIcon { }

applyMixins(MenuItem, AffixIcon);
