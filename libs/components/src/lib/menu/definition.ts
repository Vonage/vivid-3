import { popupDefinition } from '../popup/definition';
import { menuItemDefinition } from '../menu-item/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './menu.scss?inline';
import { Menu } from './menu';
import { MenuTemplate as template } from './menu.template';

export type { Placement } from '@floating-ui/dom';

/**
 * @internal
 */
export const menuName = 'menu';

/**
 * @internal
 */
export const menuDefinition = defineVividComponent(
	menuName,
	Menu,
	template,
	[popupDefinition, menuItemDefinition],
	{
		styles,
	}
);

/**
 * Registers the calendar-event elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerMenu = createRegisterFunction(menuDefinition);

export { Menu as VwcMenuElement };
