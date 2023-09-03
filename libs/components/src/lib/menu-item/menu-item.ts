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

	subMenu?: Menu;

	override handleMouseOver: (e: MouseEvent) => boolean = () => {
		if (this.disabled || !this.subMenu || this.expanded) {
			return false;
		}

		this.subMenu.open = true;
		this.expanded = true;

		return false;
	};

	override handleMouseOut: (e: MouseEvent) => boolean = () => {
		if (!this.expanded || !this.subMenu || !this.subMenu.open) {
			return false;
		}

		this.subMenu.open = false;
		this.expanded = false;

		return false;
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
				this.subMenu = submenu;
				this.subMenu.anchor = this as MenuItem;
				this.subMenu.placement = 'right-start';
			}
		}
	}
}

export interface MenuItem extends AffixIcon {}

applyMixins(MenuItem, AffixIcon);
