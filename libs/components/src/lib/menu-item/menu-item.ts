import { attr } from '@microsoft/fast-element';
import { MenuItem as FastMenuItem, MenuItemRole } from '@microsoft/fast-foundation';

/**
 * Base class for menu-item
 *
 * @public
 */
export class MenuItem extends FastMenuItem {
	/**
	 * The role of the element.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: role
	 */
	@attr({ mode: 'fromView' })
	override role: MenuItemRole = MenuItemRole.menuitem;
}
