import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import styles from './calendar-event.scss';

import { CalendarEvent } from './calendar-event';
import { CalendarEventTemplate as template } from './calendar-event.template';

export const vividCalendarEvent =
	CalendarEvent.compose<FoundationElementDefinition>({
		baseName: 'calendar-event',
		template: template as any,
		styles,
		shadowOptions: {
			delegatesFocus: true
		}
	});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividCalendarEvent());
