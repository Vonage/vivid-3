import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './nav.scss?inline';
import { Nav } from './nav';
import { NavTemplate as template } from './nav.template';

/**
 * @internal
 */
export const navDefinition = defineVividComponent('nav', Nav, template, [], {
	styles,
});

/**
 * Registers the nav elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerNav = createRegisterFunction(navDefinition);
