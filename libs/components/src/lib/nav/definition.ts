import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';

import { Nav } from './nav';
import { NavTemplate as template } from './nav.template';

/**
 * The nav element.
 *
 * @internal
 */
export const nav =
	Nav.compose<FoundationElementDefinition>({
		baseName: 'nav',
		template: template as any,
	});


export const navRegistries = [navDefinition()];

/**
 * Registers the nav elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerNav = registerFactory(navRegistries);
