import { buttonDefinition } from '../button/definition';
import { popupDefinition } from '../popup/definition';
import { textFieldDefinition } from '../text-field/definition';
import { dividerDefinition } from '../divider/definition';
import styles from '../../shared/date-picker/date-picker-base.scss?inline';
import { CalendarPickerTemplate as template } from '../../shared/picker-field/mixins/calendar-picker.template';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { DateRangePicker } from './date-range-picker';

/**
 * @internal
 */
export const dateRangePickerDefinition = defineVividComponent(
	'date-range-picker',
	DateRangePicker,
	template,
	[buttonDefinition, popupDefinition, textFieldDefinition, dividerDefinition],
	{
		styles,
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
