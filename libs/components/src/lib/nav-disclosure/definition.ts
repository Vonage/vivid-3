import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { iconElements } from '../icon/definition';
import { focusElements } from '../focus/definition';
import styles from './nav-disclosure.scss';

import { NavDisclosure } from './nav-disclosure';
import { NavDisclosureTemplate as template } from './nav-disclosure.template';


/**
 * The nav-disclosure element.
 *
 * @internal
 */
export const navDisclosure =
	NavDisclosure.compose<FoundationElementDefinition>({
		baseName: 'nav-disclosure',
		template: template as any,
		styles,
	})();

export const navDisclosureElements = [navDisclosure, ...iconElements, ...focusElements];

/**
 * Registers the nav-disclosure elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerNavDisclosure = registerFactorial(navDisclosureElements);
