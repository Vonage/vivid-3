import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { registerFactorial } from '../../shared/design-system';
import styles from './calendar.scss';

import { Calendar } from './calendar';
import { CalendarTemplate as template } from './calendar.template';


/**
 *
 * @internal
 */
export const calendar = Calendar.compose<FoundationElementDefinition>({
	baseName: 'calendar',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true
	}
})();

export const calendarElements = [calendar];

/**
 * Registers the calendar elements with the design system.
 *
 * @param prefix - the prefix to use for the component name
 */
export const registerCalendar = registerFactorial(calendarElements);

