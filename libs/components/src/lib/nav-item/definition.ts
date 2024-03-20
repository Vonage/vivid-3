import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import styles from './nav-item.scss?inline';

import { NavItem } from './nav-item';
import { NavItemTemplate as template } from './nav-item.template';

/**
 * The nav-item element is a custom element that is used to display a single item in a nav.
 */
export const navItemDefinition = NavItem.compose<FoundationElementDefinition>({
	baseName: 'nav-item',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

/**
 * @internal
 */
export const navItemRegistries = [navItemDefinition(), ...iconRegistries];

/**
 * Registers the nav-item elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerNavItem = registerFactory(navItemRegistries);
