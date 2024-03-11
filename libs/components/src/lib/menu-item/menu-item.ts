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

export enum CheckAppearance {
	Normal = 'normal',
	TickOnly =  'tick-only',
}

/**
 * @public
 * @component menu-item
 * @slot meta - Assign nodes to the `meta` slot to set a badge or an additional icon.
 * @slot trailing-meta - Assign nodes to the `meta` slot to set a badge or an additional icon.
 * @slot submenu - Assign a Menu to the `submenu` slot to add a submenu.
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
	}

	#updateSubmenu() {
		for (const submenu of this.#submenuArray) {
			this.submenu = submenu as Menu;
			(this.submenu as Menu).anchor = this as MenuItem;
			(this.submenu as Menu).placement = 'right-start';
			(this.submenu as Menu).collapseExpandedItem = () => this.#collapseExpandedItem();
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
}

export interface MenuItem extends AffixIcon { }

applyMixins(MenuItem, AffixIcon);
