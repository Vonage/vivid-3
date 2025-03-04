import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './nav-item.scss?inline';
import { NavItem } from './nav-item';
import { NavItemTemplate as template } from './nav-item.template';

/**
 * @internal
 */
export const navItemDefinition = defineVividComponent(
	'nav-item',
	NavItem,
	template,
	[iconDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the nav-item elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerNavItem = createRegisterFunction(navItemDefinition);

export { NavItem as VwcNavItemElement };
