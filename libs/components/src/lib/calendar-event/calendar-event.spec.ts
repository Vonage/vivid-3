import { elementUpdated, fixture } from '@vivid-nx/shared';
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
			expect(element.heading).toBeUndefined();
			expect(element.description).toBeUndefined();
			expect(element.color).toBeUndefined();
			expect(element.overlapCount).toBeUndefined();
			expect(element.start).toBeUndefined();
			expect(element.duration).toBeUndefined();
		});
	});

	describe('heading', () => {
		it('set heading property to node', async () => {
			const heading = 'heading';
			element.heading = heading;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector('h2');
			expect(control?.textContent?.trim()).toEqual(heading);
		});
	});
});
