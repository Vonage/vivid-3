import { buttonDefinition } from '../button/definition';
import { popupDefinition } from '../popup/definition';
import { textFieldDefinition } from '../text-field/definition';
import { dividerDefinition } from '../divider/definition';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import pickerFieldStyles from '../../shared/picker-field/picker-field.scss?inline';
import calendarStyles from '../../shared/picker-field/mixins/calendar-picker.scss?inline';
import { visuallyHiddenDefinition } from '../visually-hidden/definition';
import { DateRangePicker } from './date-range-picker';
import { DateRangePickerTemplate as template } from './date-range-picker.template';

/**
 * @internal
 */
export const dateRangePickerDefinition = defineVividComponent(
	'date-range-picker',
	DateRangePicker,
	template,
	[
		buttonDefinition,
		popupDefinition,
		textFieldDefinition,
		dividerDefinition,
		visuallyHiddenDefinition,
	],
	{
		styles: [pickerFieldStyles, calendarStyles],
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the date-range-picker element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDateRangePicker = createRegisterFunction(
	dateRangePickerDefinition
);

export { DateRangePicker as VwcDateRangePickerElement };
