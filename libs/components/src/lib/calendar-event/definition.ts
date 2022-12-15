import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './calendar-event.scss';

import { CalendarEvent } from './calendar-event';
import { CalendarEventTemplate as template } from './calendar-event.template';


/**
 * The calendar-event element is a custom element that is used to display a single event in a calendar.
 *
 * @internal
 */
export const calendarEvent =
	CalendarEvent.compose<FoundationElementDefinition>({
		baseName: 'calendar-event',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true
		}
	});

export const calendarEventRegistries = [calendarEventDefinition()];

/**
 * Registers the calendar-event elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCalendarEvent = registerFactory(calendarEventRegistries);
