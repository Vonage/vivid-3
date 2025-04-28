import { html, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { CalendarEvent } from './calendar-event';

const getClasses = ({ connotation, appearance }: CalendarEvent) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		[`appearance-${appearance}`, Boolean(appearance)]
	);

const getStyles = ({ start, duration, overlapCount }: CalendarEvent) => {
	const stylesObj = {
		...(overlapCount && {
			'--vvd-calendar-event--overlap-count': overlapCount,
		}),
		...(start && { '--vvd-calendar-event--start': start }),
		...(duration && { '--vvd-calendar-event--duration': duration }),
	};

	return Object.entries(stylesObj)
		.map((entry) => entry.join(':'))
		.join(';');
};

export const CalendarEventTemplate = html<CalendarEvent>` <div
	style="${getStyles}"
	class="${getClasses}"
	tabindex="0"
	${delegateAria({
		role: 'button',
	})}
>
	${when((x) => x.heading, html`<h2><strong>${(x) => x.heading}</strong></h2>`)}
	${when((x) => x.description, html`<p>${(x) => x.description}</p>`)}
</div>`;
