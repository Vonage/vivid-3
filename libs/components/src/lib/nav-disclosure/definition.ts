import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { focusRegistries } from '../focus/definition';
import styles from './nav-disclosure.scss';

import { NavDisclosure } from './nav-disclosure';
import { NavDisclosureTemplate as template } from './nav-disclosure.template';


/**
 * The nav-disclosure element.
 */
export const navDisclosureDefinition =
	NavDisclosure.compose<FoundationElementDefinition>({
		baseName: 'nav-disclosure',
		template: template as any,
		styles,
	});

/**
 * @internal
 */
export const navDisclosureRegistries = [navDisclosureDefinition(), ...iconRegistries, ...focusRegistries];

/**
 * Registers the nav-disclosure elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerNavDisclosure = registerFactory(navDisclosureRegistries);
