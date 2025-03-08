import { textFieldDefinition } from '../text-field/definition';
import { popupDefinition } from '../popup/definition';
import { buttonDefinition } from '../button/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import pickerFieldStyles from '../../shared/picker-field/picker-field.scss?inline';
import { inlineTimePickerDefinition } from '../../shared/picker-field/mixins/inline-time-picker/definition';
import { TimePicker } from './time-picker';
import { TimePickerTemplate as template } from './time-picker.template';

/**
 * @internal
 */
export const timePickerDefinition = defineVividComponent(
	'time-picker',
	TimePicker,
	template,
	[
		textFieldDefinition,
		popupDefinition,
		buttonDefinition,
		inlineTimePickerDefinition,
	],
	{
		styles: pickerFieldStyles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the time-picker element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerTimePicker = createRegisterFunction(timePickerDefinition);

export { TimePicker as VwcTimePickerElement };
