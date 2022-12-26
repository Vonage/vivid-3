import type { SelectOptions } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { focusRegistries } from '../focus/definition';
import { popupRegistries } from '../popup/definition';
import { iconRegistries } from '../icon/definition';
import { listboxOptionRegistries } from '../option/definition';
import styles from './select.scss';

import { Select } from './select';
import { SelectTemplate as template } from './select.template';

/**
 * The select element.
 */
export const selectDefinition = Select.compose<SelectOptions>({
	baseName: 'select',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
});

/**
 * @internal
 */
export const selectRegistries = [selectDefinition(), ...focusRegistries, ...popupRegistries, ...iconRegistries, ...listboxOptionRegistries];

/**
 * Registers the select elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSelect = registerFactory(selectRegistries);
