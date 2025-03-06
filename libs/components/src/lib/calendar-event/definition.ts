import { createRegisterFunction } from '../../shared/design-system/createRegisterFunction';
import { defineVividComponent } from '../../shared/design-system/defineVividComponent';
import styles from './calendar-event.scss?inline';
import { CalendarEvent } from './calendar-event';
import { CalendarEventTemplate as template } from './calendar-event.template';

export type {
	CalendarEventAppearance,
	CalendarEventConnotation,
} from './calendar-event';

/**
 * @internal
 */
export const calendarEventDefinition = defineVividComponent(
	'calendar-event',
	CalendarEvent,
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
 * Registers the calendar-event elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCalendarEvent = createRegisterFunction(
	calendarEventDefinition
);

export { CalendarEvent as VwcCalendarEventElement };
