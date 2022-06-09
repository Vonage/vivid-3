import { elementUpdated, fixture } from '@vivid-nx/shared';
// import { axe, toHaveNoViolations } from 'jest-axe';
import { CalendarEvent } from './calendar-event';
import '.';

// expect.extend(toHaveNoViolations);


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
			expect(element.connotation).toBeUndefined();
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

		it('should set correct internal connotation style', async () => {
			const connotation = 'info';
			(element as any).connotation = connotation;
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector(`.base.connotation-${connotation}`);
			expect(base).toBeInstanceOf(Element);
		});
	});

	// describe('a11y', () => {
	// 	it('should pass accessibility test', async () => {
	// 		element.heading = 'heading';
	// 		const { shadowRoot } = element;
	// 		if (!shadowRoot) { return; }

	// 		const results = await axe(shadowRoot.innerHTML, {
	// 			rules: {
	// 				// components should not be tested as page content
	// 				'region': { enabled: false }
	// 			}
	// 		});

	// 		expect(results).toHaveNoViolations();
	// 	});
	// });
});
