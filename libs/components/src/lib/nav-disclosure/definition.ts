import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './nav-disclosure.scss?inline';
import { NavDisclosure } from './nav-disclosure';
import { NavDisclosureTemplate as template } from './nav-disclosure.template';

/**
 * @internal
 */
export const navDisclosureDefinition = defineVividComponent(
	'nav-disclosure',
	NavDisclosure,
	template,
	[iconDefinition],
	{
		styles,
	}
);

/**
 * Registers the nav-disclosure elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerNavDisclosure = createRegisterFunction(
	navDisclosureDefinition
);
