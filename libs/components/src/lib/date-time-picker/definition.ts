import { popupDefinition } from '../popup/definition';
import { buttonDefinition } from '../button/definition';
import { textFieldDefinition } from '../text-field/definition';
import { dividerDefinition } from '../divider/definition';
import pickerFieldStyles from '../../shared/picker-field/picker-field.scss?inline';
import calendarStyles from '../../shared/picker-field/mixins/calendar-picker.scss?inline';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { inlineTimePickerDefinition } from '../../shared/picker-field/mixins/inline-time-picker/definition';
import styles from './date-time-picker.scss?inline';
import { DateTimePicker } from './date-time-picker';
import { DateTimePickerTemplate as template } from './date-time-picker.template';

/**
 * @internal
 */
export const dateTimePickerDefinition = defineVividComponent(
	'date-time-picker',
	DateTimePicker,
	template,
	[
		buttonDefinition,
		popupDefinition,
		textFieldDefinition,
		dividerDefinition,
		inlineTimePickerDefinition,
	],
	{
		styles: [pickerFieldStyles, calendarStyles, styles],
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the date-time-picker element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDateTimePicker = createRegisterFunction(
	dateTimePickerDefinition
);
