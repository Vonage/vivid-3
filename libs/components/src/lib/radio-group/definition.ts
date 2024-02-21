import { registerFactory } from '../../shared/design-system';
import styles from './radio-group.scss?inline';

import { RadioGroup } from './radio-group';
import { RadioGroupTemplate as template } from './radio-group.template';

/**
 * The radio-group element is a custom element that is used to display a group of radio buttons.
 */
export const radioGroupDefinition = RadioGroup.compose({
	baseName: 'radio-group',
	template: template as any,
	styles,
});

/**
 * @internal
 */
export const radioGroupRegistries = [radioGroupDefinition()];

/**
 * Registers the radio-group elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerRadioGroup = registerFactory(radioGroupRegistries);
