import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './menu-item.scss?inline';
import { MenuItem } from './menu-item';
import { MenuItemTemplate as template } from './menu-item.template';

/**
 * @internal
 */
export const menuItemDefinition = defineVividComponent(
	'menu-item',
	MenuItem,
	template,
	[iconDefinition],
	{
		styles,
	}
);

/**
 * Registers the menu-item elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerMenuItem = createRegisterFunction(menuItemDefinition);
export { MenuItemRole } from './menu-item-role';
