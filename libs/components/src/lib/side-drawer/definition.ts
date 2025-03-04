import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { SideDrawer } from './side-drawer';
import styles from './side-drawer.scss?inline';
import { sideDrawerTemplate as template } from './side-drawer.template';

/**
 * @internal
 */
export const sideDrawerDefinition = defineVividComponent(
	'side-drawer',
	SideDrawer,
	template,
	[],
	{
		styles,
	}
);

/**
 * Registers the side-drawer elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSideDrawer = createRegisterFunction(sideDrawerDefinition);

export { SideDrawer as VwcSideDrawerElement };
