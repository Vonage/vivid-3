import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { CalendarEvent } from './calendar-event';

const getClasses = (_: CalendarEvent) => classNames('base');

const getStyles = ({ color, start, duration, overlapCount }: CalendarEvent) => {
	const stylesObj = {
		...color && {'--vvd-calendar-event--primary-color': color},
		...overlapCount && {'--vvd-calendar-event--overlap-count': overlapCount},
		...start && {'--vvd-calendar-event--start': start},
		...duration && {'--vvd-calendar-event--duration': duration}
	};

	return Object.entries(stylesObj)
		.map(entry => entry.join(':'))
		.join(';');
};


/**
 * The template for the {@link @microsoft/fast-foundation#CalendarEvent} component.
 *
 * @param context
 * @public
 */
export const CalendarEventTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<CalendarEvent> = () => html`
<section
  style="${getStyles}"
  class="${getClasses}"
  role="button"
  tabindex="0"
>
  <h2><strong>${x => x.heading}</strong></h2>
  <p>${x => x.description}</p>
</section>`;
