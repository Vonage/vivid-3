import type { ComboboxOptions } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import { iconRegistries } from '../icon/definition';
import { popupRegistries } from '../popup/definition';
import { listboxOptionRegistries } from '../option/definition';
import textFieldStyles from '../text-field/text-field.scss?inline';
import styles from './combobox.scss?inline';

import { Combobox } from './combobox';
import { comboboxTemplate as template } from './combobox.template';

export type { PopupPlacement } from './combobox';

/**
 * The combobox element.
 *
 * @internal
 */
export const combobox = Combobox.compose<ComboboxOptions>({
	baseName: 'combobox',
	template: template as any,
	styles: [textFieldStyles, styles],
	shadowOptions: {
		delegatesFocus: true,
	},
})();

export const comboboxRegistries = [
	combobox,
	...iconRegistries,
	...popupRegistries,
	...listboxOptionRegistries,
];

/**
 * Registers the combobox elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCombobox = registerFactory(comboboxRegistries);
