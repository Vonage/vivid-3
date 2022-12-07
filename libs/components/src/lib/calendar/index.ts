import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { designSystem, getPrefix } from '../../shared/design-system';
import styles from './calendar.scss';

import { Calendar } from './calendar';
import { CalendarTemplate as template } from './calendar.template';

export const vividCalendar = Calendar.compose<FoundationElementDefinition>({
	baseName: 'calendar',
	template: template as any,
	styles,
	shadowOptions: {
		delegatesFocus: true
	}
});

designSystem.withPrefix(getPrefix(import.meta.url)).register(vividCalendar());
