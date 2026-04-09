import { table, variationTest } from '@repo/browser-tests/variation-test';
import { flattenAttrs } from '@repo/browser-tests/utils';
import { component } from '../../visual-tests/jsx';
import { calendarDefinition } from './definition';
import { calendarEventDefinition } from '../calendar-event/definition';

const Calendar = component(calendarDefinition);
const CalendarEvent = component(calendarEventDefinition);

variationTest(
	'calendar',
	table({
		caption: 'Layout',
		xAxis: {
			_: [null],
		},
		yAxis: {
			format: {
				default: {},
				'12h Hebrew (RTL)': {
					hour12: true,
					locales: 'he-IL',
					style: 'direction: rtl;',
					sunday: 'sunday',
				},
			},
		},
		render: (variant) => {
			return (
				<Calendar
					datetime="2024-01-15"
					sticky-mode="none"
					{...flattenAttrs(variant)}
				>
					<CalendarEvent
						slot="day-1"
						heading="Meeting"
						start="9"
						duration="2"
					/>
					<CalendarEvent
						slot="day-4"
						heading="Lunch"
						start="12"
						duration="1"
						connotation="success"
					/>
				</Calendar>
			);
		},
	}),
	table({
		caption: 'Visual',
		xAxis: {
			_: [null],
		},
		yAxis: {
			_: [null],
		},
		render: () => (
			<div style="max-inline-size: 550px; max-block-size: 550px; background-color: var(--vvd-color-neutral-100); padding: 32px; --calendar-header-background-color: var(--vvd-color-neutral-100); --calendar-column-background-color: var(--vvd-color-neutral-100);">
				<Calendar datetime="2024-01-15" sticky-mode="none">
					<CalendarEvent
						slot="day-1"
						heading="Meeting"
						start="9"
						duration="2"
					/>
					<CalendarEvent
						slot="day-4"
						heading="Lunch"
						start="12"
						duration="1"
						connotation="success"
					/>
				</Calendar>
			</div>
		),
	})
);
