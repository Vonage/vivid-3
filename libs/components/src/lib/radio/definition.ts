import type { RadioOptions } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './radio.scss?inline';

import { Radio } from './radio';
import { RadioTemplate as template } from './radio.template';

/**
 * The radio element.
 */
export const radioDefinition = Radio.compose<RadioOptions>({
	baseName: 'radio',
	template: template as any,
	styles
});

/**
 * @internal
 */
export const radioRegistries = [radioDefinition()];

/**
 * Registers the radio elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerRadio = registerFactory(radioRegistries);
