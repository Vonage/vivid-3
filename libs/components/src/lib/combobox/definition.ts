import type { ComboboxOptions } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { iconElements } from '../icon/definition';
import { popupElements } from '../popup/definition';
import { focusElements } from '../focus/definition';
import textFieldStyles from '../text-field/text-field.scss';
import styles from './combobox.scss';

import { Combobox } from './combobox';
import { comboboxTemplate as template } from './combobox.template';


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

export const comboboxElements = [combobox, ...iconElements, ...popupElements, ...focusElements];

/**
 * Registers the combobox elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCombobox = registerFactorial(comboboxElements);
