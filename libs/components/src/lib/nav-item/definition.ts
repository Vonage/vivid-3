import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { iconElements } from '../icon/definition';
import { focusElements } from '../focus/definition';
import styles from './nav-item.scss';

import { NavItem } from './nav-item';
import { NavItemTemplate as template } from './nav-item.template';


/**
 * The nav-item element is a custom element that is used to display a single item in a nav.
 *
 * @internal
 */
export const navItem =
	NavItem.compose<FoundationElementDefinition>({
		baseName: 'nav-item',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	})();

export const navItemElements = [navItem, ...iconElements, ...focusElements];

/**
 * Registers the nav-item elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerNavItem = registerFactorial(navItemElements);
