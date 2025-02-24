import { CalendarPickerTemplate } from '../../shared/picker-field/mixins/calendar-picker.template';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { PickerFieldTemplate } from '../../shared/picker-field/picker-field.template';

export const DatePickerTemplate = (context: VividElementDefinitionContext) => {
	return PickerFieldTemplate(context, CalendarPickerTemplate(context));
};
