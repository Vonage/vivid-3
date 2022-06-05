import { fixture } from '@vivid-nx/shared';
import { CalendarEvent } from './calendar-event';
import '.';

const COMPONENT_TAG = 'vwc-calendar-event';

describe('vwc-calendar-event', () => {
	let element: CalendarEvent;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as CalendarEvent;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-calendar-event', async () => {
			expect(element).toBeInstanceOf(CalendarEvent);
		});
	});
});
