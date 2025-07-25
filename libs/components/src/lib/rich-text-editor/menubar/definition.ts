import { createRegisterFunction } from '../../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../../shared/design-system/defineVividComponent';
import { buttonDefinition } from '../../../lib/button/definition';
import { dividerDefinition } from '../../divider/definition';
import { listboxOptionDefinition } from '../../option/definition';
import { tooltipDefinition } from '../../tooltip/definition';
import { menuDefinition } from '../../menu/definition';
import { menuItemDefinition } from '../../menu-item/definition';
import { selectDefinition } from '../../select/definition';
import { MenubarTemplate as template } from './menubar.template';
import { Menubar } from './menubar';
import styles from './menubar.scss?inline';

export const menubarDefinition = defineVividComponent(
	'menubar',
	Menubar,
	template,
	[
		buttonDefinition,
		selectDefinition,
		listboxOptionDefinition,
		dividerDefinition,
		tooltipDefinition,
		menuDefinition,
		menuItemDefinition,
	],
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
export const registerMenubar = createRegisterFunction(menubarDefinition);
