import { defineVividComponent } from '../../../design-system/defineVividComponent';
import { createRegisterFunction } from '../../../design-system/createRegisterFunction';
import { InlineTimePicker } from './inline-time-picker';
import { InlineTimePickerTemplate as template } from './inline-time-picker.template';
import styles from './inline-time-picker.scss?inline';

/**
 * @internal
 */
export const inlineTimePickerDefinition = defineVividComponent(
	'inline-time-picker',
	InlineTimePicker,
	template,
	[],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the inline-time-picker element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerInlineTimePicker = createRegisterFunction(
	inlineTimePickerDefinition
);
