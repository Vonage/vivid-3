import type { MenuItemOptions } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { iconElements } from '../icon/definition';
import { focusElements } from '../focus/definition';
import styles from './menu-item.scss';

import { MenuItem } from './menu-item';
import { MenuItemTemplate as template } from './menu-item.template';


/**
 * The menu-item element.
 *
 * @internal
 */
export const menuItem = MenuItem.compose<MenuItemOptions>({
	baseName: 'menu-item',
	template: template as any,
	styles
})();

export const menuItemElements = [menuItem, ...iconElements, ...focusElements];

/**
 * Registers the menu-item elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerMenuItem = registerFactorial(menuItemElements);
