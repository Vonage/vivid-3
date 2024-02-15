import type { SelectOptions } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { popupRegistries } from '../popup/definition';
import { iconRegistries } from '../icon/definition';
import { listboxOptionRegistries } from '../option/definition';
import styles from './select.scss?inline';

import { Select } from './select';
import { SelectTemplate as template } from './select.template';

export type { SelectAppearance, SelectShape } from './select';

/**
 * The select element.
 */
export const selectDefinition = Select.compose<SelectOptions>({
	baseName: 'select',
	template: template as any,
	styles
});

/**
 * @internal
 */
export const selectRegistries = [selectDefinition(), ...popupRegistries, ...iconRegistries, ...listboxOptionRegistries];

/**
 * Registers the select elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerSelect = registerFactory(selectRegistries);
