import { table, variationTest } from '@repo/browser-tests/variation-test';
import { component } from '../../visual-tests/jsx';
import { calendarDefinition } from '../calendar/definition';
import { calendarEventDefinition } from './definition';

const Calendar = component(calendarDefinition);
const CalendarEvent = component(calendarEventDefinition);

variationTest(
	'calendar-event',
	// Since the calendar is so large, show them all in one calendar instead of regular table based tests
	table({
		caption: 'Calendar Events',
		xAxis: { _: [null] },
		yAxis: { _: [null] },
		render: () => (
			<Calendar datetime="2024-01-15" sticky-mode="none">
				{/* Day 0: accent filled (short), cta filled (medium) */}
				<CalendarEvent
					slot="day-0"
					heading="Pool party"
					description="9am"
					start="8"
					duration="1"
				/>
				<CalendarEvent
					slot="day-0"
					heading="Summer time"
					description="2pm"
					start="14"
					duration="2.25"
					connotation="cta"
				/>

				{/* Day 1: information duotone, announcement filled */}
				<CalendarEvent
					slot="day-1"
					heading="Team call"
					description="10am"
					start="10"
					duration="1.5"
					connotation="information"
					appearance="duotone"
				/>
				<CalendarEvent
					slot="day-1"
					heading="All hands"
					description="4pm"
					start="16"
					duration="2"
					connotation="announcement"
				/>

				{/* Day 2: alert subtle (long duration) */}
				<CalendarEvent
					slot="day-2"
					heading="Team meeting"
					description="11am - 1pm"
					start="4"
					duration="4"
					connotation="alert"
					appearance="subtle"
				/>

				{/* Day 3: three overlapping events */}
				<CalendarEvent
					slot="day-3"
					heading="Main event"
					description="12:30pm"
					start="16"
					duration="8"
					overlap-count="2"
					connotation="success"
				/>
				<CalendarEvent
					slot="day-3"
					heading="Roadmap"
					description="All day"
					start="17"
					duration="7"
					connotation="announcement"
					appearance="subtle"
				/>
				<CalendarEvent
					slot="day-3"
					heading="Summer time"
					description="3:30pm"
					start="18.5"
					duration="7.5"
					overlap-count="1"
				/>

				{/* Day 5: warning filled, success subtle */}
				<CalendarEvent
					slot="day-5"
					heading="Team social"
					description="2pm"
					start="12"
					duration="4"
					connotation="warning"
				/>
				<CalendarEvent
					slot="day-5"
					heading="Check-in"
					description="6pm"
					start="20"
					duration="5"
					connotation="success"
					appearance="subtle"
				/>

				{/* Day 6: accent subtle, cta duotone */}
				<CalendarEvent
					slot="day-6"
					heading="Workshop"
					description="9am"
					start="9"
					duration="3"
					connotation="accent"
					appearance="subtle"
				/>
				<CalendarEvent
					slot="day-6"
					heading="Retro"
					description="1pm"
					start="13"
					duration="2"
					connotation="cta"
					appearance="duotone"
				/>
			</Calendar>
		),
	})
);
