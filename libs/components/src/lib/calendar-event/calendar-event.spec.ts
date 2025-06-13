import { elementUpdated, fixture, getBaseElement } from '@repo/shared';
import {
	allAriaPropertiesExcept,
	itShouldDelegateAriaAttributes,
} from '../../shared/aria/should-delegate-aria.spec';
import { CalendarEvent } from './calendar-event';
import '.';

const COMPONENT_TAG = 'vwc-calendar-event';

describe('vwc-calendar-event', () => {
	let element: CalendarEvent;

	const getCssPropertyValue = (prop: string) => {
		const el = element.shadowRoot?.querySelector('.base') as HTMLElement;
		return getComputedStyle(el).getPropertyValue(
			`--vvd-calendar-event--${prop}`
		);
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

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
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

			expect(getCssPropertyValue('overlap-count')).toEqual(
				String(overlapCount)
			);
		});

		it('should set correct internal connotation style', async () => {
			const connotation = 'information';
			element.connotation = connotation;
			await elementUpdated(element);

			const base = element.shadowRoot?.querySelector(
				`.base.connotation-${connotation}`
			);
			expect(base).toBeInstanceOf(Element);
		});
	});

	describe('ARIA delegation', () => {
		itShouldDelegateAriaAttributes(
			() => element,
			() => getBaseElement(element),
			allAriaPropertiesExcept([])
		);
	});
});
