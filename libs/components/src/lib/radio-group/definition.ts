import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { radioDefinition } from '../radio/definition';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './radio-group.scss?inline';
import { RadioGroup } from './radio-group';
import { RadioGroupTemplate as template } from './radio-group.template';

/**
 * @internal
 */
export const radioGroupDefinition = defineVividComponent(
	'radio-group',
	RadioGroup,
	template,
	[radioDefinition],
	{
		styles,
	}
);

/**
 * Registers the radio-group elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerRadioGroup = createRegisterFunction(radioGroupDefinition);
