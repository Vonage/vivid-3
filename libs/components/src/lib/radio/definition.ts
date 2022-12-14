import type { RadioOptions } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { focusElements } from '../focus/definition';
import styles from './radio.scss';

import { Radio } from './radio';
import { RadioTemplate as template } from './radio.template';

/**
 * The radio element.
 *
 * @internal
 */
export const radio = Radio.compose<RadioOptions>({
	baseName: 'radio',
	template: template as any,
	styles
})();

export const radioElements = [radio, ...focusElements];

/**
 * Registers the radio elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerRadio = registerFactorial(radioElements);
