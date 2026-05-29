import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { visuallyHiddenDefinition } from '../visually-hidden/definition';
import styles from './flag.scss?inline';
import { Flag } from './flag';
import { flagTemplate as template } from './flag.template';

/**
 * @internal
 */
export const flagDefinition = defineVividComponent(
	'flag',
	Flag,
	template,
	[visuallyHiddenDefinition],
	{
		styles,
	}
);

/**
 * Registers the flag component & its prerequisite components with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerFlag = createRegisterFunction(flagDefinition);

export { Flag as VwcFlagElement };
