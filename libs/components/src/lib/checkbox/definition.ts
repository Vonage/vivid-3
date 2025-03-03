import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './checkbox.scss?inline';
import { Checkbox } from './checkbox';
import { CheckboxTemplate as template } from './checkbox.template';

/**
 * @internal
 */
export const checkboxDefinition = defineVividComponent(
	'checkbox',
	Checkbox,
	template,
	[iconDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the checkbox elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCheckbox = createRegisterFunction(checkboxDefinition);

export { Checkbox as VwcCheckboxElement };
