import { buttonDefinition } from '../button/definition';
import { dividerDefinition } from '../divider/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { iconDefinition } from '../icon/definition';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './number-field.scss?inline';
import { NumberField } from './number-field';
import { NumberFieldTemplate as template } from './number-field.template';

export type { NumberFieldAppearance, NumberFieldShape } from './number-field';

/**
 * @internal
 */
export const numberFieldDefinition = defineVividComponent(
	'number-field',
	NumberField,
	template,
	[buttonDefinition, dividerDefinition, iconDefinition],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the number-field elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerNumberField = createRegisterFunction(
	numberFieldDefinition
);

export { NumberField as VwcNumberFieldElement };
