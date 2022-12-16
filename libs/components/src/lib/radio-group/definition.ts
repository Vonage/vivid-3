import { registerFactorial } from '../../shared/design-system';
import styles from './radio-group.scss';

import { RadioGroup } from './radio-group';
import { RadioGroupTemplate as template } from './radio-group.template';

/**
 * The radio-group element is a custom element that is used to display a group of radio buttons.
 *
 * @internal
 */
export const radioGroup = RadioGroup.compose({
	baseName: 'radio-group',
	template: template as any,
	styles,
})();

export const radioGroupElements = [radioGroup];

/**
 * Registers the radio-group elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerRadioGroup = registerFactorial(radioGroupElements);
