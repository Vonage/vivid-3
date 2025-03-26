import { createRegisterFunction } from '../../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../../shared/design-system/defineVividComponent';
import { buttonDefinition, menuDefinition, menuItemDefinition } from '../../components';
import styles from './menubar.scss?inline';

import { MenuBar } from './menubar.js';
import { MenuBarTemplate as template } from './menubar.template.js';

export const menuBarDefinition = defineVividComponent(
	'menubar',
	MenuBar,
	template,
	[buttonDefinition, menuDefinition, menuItemDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the menubar element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerMenuBar = createRegisterFunction(menuBarDefinition);
