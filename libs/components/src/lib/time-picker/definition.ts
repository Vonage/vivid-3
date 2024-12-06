import { textFieldDefinition } from '../text-field/definition';
import { popupDefinition } from '../popup/definition';
import { buttonDefinition } from '../button/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './time-picker.scss?inline';
import { TimePicker } from './time-picker';
import { TimePickerTemplate as template } from './time-picker.template';

/**
 * @internal
 */
export const timePickerDefinition = defineVividComponent(
	'time-picker',
	TimePicker,
	template,
	[textFieldDefinition, popupDefinition, buttonDefinition],
	{
		styles,
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
