import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactory } from '../../shared/design-system';
import styles from './calendar.scss';

import { Calendar } from './calendar';
import { CalendarTemplate as template } from './calendar.template';


/**
 *
 * @internal
 */
export const calendarDefinition = Calendar.compose<FoundationElementDefinition>({
	baseName: 'calendar',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true
	}
});

/**
 * @internal
 */
export const calendarRegistries = [calendarDefinition()];

/**
 * Registers the calendar elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCalendar = registerFactory(calendarRegistries);

