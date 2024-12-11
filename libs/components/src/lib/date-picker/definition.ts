import { popupDefinition } from '../popup/definition';
import { buttonDefinition } from '../button/definition';
import { textFieldDefinition } from '../text-field/definition';
import { dividerDefinition } from '../divider/definition';
import styles from '../../shared/date-picker/date-picker-base.scss?inline';
import { DatePickerBaseTemplate as template } from '../../shared/date-picker/date-picker-base.template';
import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import { DatePicker } from './date-picker';

/**
 * @internal
 */
export const datePickerDefinition = defineVividComponent(
	'date-picker',
	DatePicker,
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
 * Registers the date-picker element with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerDatePicker = createRegisterFunction(datePickerDefinition);
