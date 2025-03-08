import { html } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { CalendarPickerTemplate } from '../../shared/picker-field/mixins/calendar-picker.template';
import { TimeSelectionPickerTemplate } from '../../shared/picker-field/mixins/time-selection-picker.template';
import { PickerFieldTemplate } from '../../shared/picker-field/picker-field.template';
import { DateTimePicker } from './date-time-picker';

export const DateTimePickerTemplate = (
	context: VividElementDefinitionContext
) => {
	return PickerFieldTemplate(
		context,
		html<DateTimePicker>`
			<div class="date-time-picker">
				${() => CalendarPickerTemplate(context)}
				<div class="time-picker">
					${() => TimeSelectionPickerTemplate(context, 9)}
				</div>
			</div>
		`,
		{
			withSeparator: false,
			padded: false,
		}
	);
};
