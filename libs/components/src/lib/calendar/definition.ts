import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './calendar.scss?inline';
import { Calendar } from './calendar';
import { CalendarTemplate as template } from './calendar.template';

/**
 * @internal
 */
export const calendarDefinition = defineVividComponent(
	'calendar',
	Calendar,
	template,
	[],
	{
		styles,
		shadowOptions: {
			delegatesFocus: true,
		},
	}
);

/**
 * Registers the calendar elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCalendar = createRegisterFunction(calendarDefinition);
