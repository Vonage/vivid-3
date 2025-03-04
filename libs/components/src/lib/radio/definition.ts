import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './radio.scss?inline';
import { Radio } from './radio';
import { RadioTemplate as template } from './radio.template';

/**
 * @internal
 */
export const radioDefinition = defineVividComponent(
	'radio',
	Radio,
	template,
	[],
	{
		styles,
	}
);

/**
 * Registers the radio elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerRadio = createRegisterFunction(radioDefinition);
