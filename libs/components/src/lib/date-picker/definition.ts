import { popupDefinition } from '../popup/definition';
import { buttonDefinition } from '../button/definition';
import { textFieldDefinition } from '../text-field/definition';
import { dividerDefinition } from '../divider/definition';
import pickerFieldStyles from '../../shared/picker-field/picker-field.scss?inline';
import calendarStyles from '../../shared/picker-field/mixins/calendar-picker.scss?inline';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { DatePicker } from './date-picker';
import { DatePickerTemplate as template } from './date-picker.template';

/**
 * @internal
 */
export const datePickerDefinition = defineVividComponent(
	'date-picker',
	DatePicker,
	template,
	[buttonDefinition, popupDefinition, textFieldDefinition, dividerDefinition],
	{
		styles: [pickerFieldStyles, calendarStyles],
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the date-picker element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDatePicker = createRegisterFunction(datePickerDefinition);

export { DatePicker as VwcDatePickerElement };
