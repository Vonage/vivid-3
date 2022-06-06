import { elementUpdated, fixture } from '@vivid-nx/shared';
import { CalendarEvent } from './calendar-event';
import '.';

const COMPONENT_TAG = 'vwc-calendar-event';


describe('vwc-calendar-event', () => {
	let element: CalendarEvent;

	const getCssPropertyValue = (prop: string) => {
		const el = element.shadowRoot?.querySelector('.base') as HTMLElement;
		return getComputedStyle(el)
			.getPropertyValue(`--vvd-calendar-event--${prop}`);
	};

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

	describe('API members', () => {

		it('should set heading to node', async () => {
			const heading = 'heading';
			element.heading = heading;
			await elementUpdated(element);

			const el = element.shadowRoot?.querySelector('h2');
			expect(el?.textContent?.trim()).toEqual(heading);
		});

		it('should set description to node', async () => {
			const description = 'description';
			element.description = description;
			await elementUpdated(element);

			const el = element.shadowRoot?.querySelector('p');
			expect(el?.textContent?.trim()).toEqual(description);
		});

		it('should delegate "color" to custom property', async () => {
			const color = 'rgb(43, 158, 250)';
			element.color = color;
			await elementUpdated(element);

			expect(getCssPropertyValue('primary-color')).toEqual(color);
		});

		it('should delegate "start" to custom property', async () => {
			const start = 18.5;
			element.start = start;
			await elementUpdated(element);

			expect(getCssPropertyValue('start')).toEqual(String(start));
		});

		it('should delegate "duration" to custom property', async () => {
			const duration = 7.5;
			element.duration = duration;
			await elementUpdated(element);

			expect(getCssPropertyValue('duration')).toEqual(String(duration));
		});

		it('should delegate "overlapCount" to custom property', async () => {
			const overlapCount = 1;
			element.overlapCount = overlapCount;
			await elementUpdated(element);

			expect(getCssPropertyValue('overlap-count')).toEqual(String(overlapCount));
		});
	});
});
