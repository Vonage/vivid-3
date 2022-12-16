import type { MenuItemOptions } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { focusRegistries } from '../focus/definition';
import styles from './menu-item.scss';

import { MenuItem } from './menu-item';
import { MenuItemTemplate as template } from './menu-item.template';


/**
 * The menu-item element.
 */
export const menuItemDefinition = MenuItem.compose<MenuItemOptions>({
	baseName: 'menu-item',
	template: template as any,
	styles
});

/**
 * @internal
 */
export const menuItemRegistries = [menuItemDefinition(), ...iconRegistries, ...focusRegistries];

/**
 * Registers the menu-item elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerMenuItem = registerFactory(menuItemRegistries);
