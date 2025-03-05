import { iconDefinition } from '../icon/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { TextField } from './text-field';
import styles from './text-field.scss?inline';
import { TextfieldTemplate as template } from './text-field.template';

export type { TextFieldAppearance, TextFieldShape } from './text-field';

/**
 * @internal
 */
export const textFieldDefinition = defineVividComponent(
	'text-field',
	TextField,
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
 * Registers the text-field elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTextField = createRegisterFunction(textFieldDefinition);

export { TextField as VwcTextFieldElement };
