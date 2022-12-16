import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { SideDrawer } from './side-drawer';
import styles from './side-drawer.scss';
import { sideDrawerTemplate as template } from './side-drawer.template';

/**
 * Represents a side-drawer custom element.
 *
 * @internal
 */
export const sideDrawer = SideDrawer.compose<FoundationElementDefinition>({
	baseName: 'side-drawer',
	template: template as any,
	styles,
})();

export const sideDrawerElements = [sideDrawer];

/**
 * Registers the side-drawer elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSideDrawer = registerFactorial(sideDrawerElements);
