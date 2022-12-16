import type { CheckboxOptions } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import { iconElements } from '../icon/definition';
import { focusElements } from '../focus/definition';
import styles from './checkbox.scss';

import { Checkbox } from './checkbox';
import { CheckboxTemplate as template } from './checkbox.template';


/**
 * The checkbox element.
 *
 * @internal
 */
export const checkbox = Checkbox.compose<CheckboxOptions>({
	baseName: 'checkbox',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true,
	},
})();

export const checkboxElements = [checkbox, ...iconElements, ...focusElements];

/**
 * Registers the checkbox elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCheckbox = registerFactorial(checkboxElements);
