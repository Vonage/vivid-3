import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { SideDrawer } from './side-drawer';
import styles from './side-drawer.scss?inline';
import { sideDrawerTemplate as template } from './side-drawer.template';

/**
 * Represents a side-drawer custom element.
 */
export const sideDrawerDefinition = SideDrawer.compose<FoundationElementDefinition>({
	baseName: 'side-drawer',
	template: template as any,
	styles,
});

/**
 * @internal
 */
export const sideDrawerRegistries = [sideDrawerDefinition()];

/**
 * Registers the side-drawer elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSideDrawer = registerFactory(sideDrawerRegistries);
