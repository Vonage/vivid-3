import { type ViewTemplate } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { PickerFieldTemplate } from '../../shared/picker-field/picker-field.template';
import { TimeSelectionPickerTemplate } from '../../shared/picker-field/mixins/time-selection-picker.template';
import type { TimePicker } from './time-picker';

export const TimePickerTemplate = (
	context: VividElementDefinitionContext
): ViewTemplate<TimePicker> => {
	return PickerFieldTemplate(context, TimeSelectionPickerTemplate(context, 6), {
		withSeparator: true,
		padded: false,
	}) as ViewTemplate<TimePicker>;
};
