import { axe, elementUpdated, fixture } from '@repo/shared';
import { CalendarEvent } from './calendar-event';
import '.';

const COMPONENT_TAG = 'vwc-calendar-event';

describe('a11y: vwc-calendar-event', () => {
	let element: CalendarEvent;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as CalendarEvent;
	});

	it('should pass html a11y test', async () => {
		element.heading = 'heading';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
