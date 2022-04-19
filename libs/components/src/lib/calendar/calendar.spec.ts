import { elementUpdated, fixture } from '@vivid-nx/shared';
import { axe, toHaveNoViolations } from 'jest-axe';
import { Calendar } from './calendar';
import '.';
import { getValidDateString } from './helpers/calendar.date-functions';
import type { CalendarEventContext } from './helpers/calendar.event-context';

expect.extend(toHaveNoViolations);


const COMPONENT_TAG = 'vwc-calendar';

describe('vwc-calendar', () => {
	let element: Calendar;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Calendar;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-calendar', async () => {
			expect(element).toBeInstanceOf(Calendar);
			expect(element.datetime).toBeUndefined();
			expect(element.startDay).toBeUndefined();
			expect(element.locales).toBeUndefined();
			expect(element.hour12).toBeFalsy();
		});
	});

	describe('datetime', () => {
		it('should show recent monday as first day of this week', async () => {
			const calendarFirstDate = getCalendarFirstDate(element);

			const today = getValidDateString(new Date());
			const monday = getMondayOfWeek(today);

			expect(calendarFirstDate).toEqual(monday);
		});

		it('should show recent monday as first day of \'2022-01-01\' week', async () => {
			const date = '2022-01-01';

			element.datetime = date;
			await elementUpdated(element);

			const calendarFirstDate = getCalendarFirstDate(element);
			const monday = getMondayOfWeek(date);

			expect(calendarFirstDate).toEqual(monday);
		});
	});

	describe('startDay', () => {
		it('should show recent sunday as first day of this week', async () => {
			element.startDay = 'sunday';
			await elementUpdated(element);

			const calendarFirstDate = getCalendarFirstDate(element);

			const today = getValidDateString(new Date());
			const sunday = getSundayOfWeek(today);

			expect(calendarFirstDate).toEqual(sunday);
		});

		it('should show recent sunday as first day of \'2022-01-01\' week', async () => {
			element.startDay = 'sunday';
			const date = '2022-01-01';

			element.datetime = date;
			await elementUpdated(element);

			const calendarFirstDate = getCalendarFirstDate(element);
			const sunday = getSundayOfWeek(date);

			expect(calendarFirstDate).toEqual(sunday);
		});
	});

	describe('locales', () => {
		it('should set hebrew locales', async () => {
			const date = '2022-01-01';
			element.datetime = date;
			element.locales = 'he-il';

			await elementUpdated(element);

			const calendarFirstDate = element.shadowRoot?.querySelector('.column-headers > :first-child small') as HTMLElement;

			expect(calendarFirstDate.textContent?.trim()).toEqual('יום ב׳');
		});
	});

	describe('hour12', () => {
		it('should set hebrew locales', async () => {
			element.hour12 = true;

			await elementUpdated(element);

			const hour13th = element.shadowRoot?.querySelector('.row-headers > :nth-child(13)') as HTMLSpanElement;

			expect(hour13th.textContent?.trim()).toEqual('1 PM');
		});
	});

	describe('Event Context', () => {
		let gridCell: HTMLElement;
		let context: CalendarEventContext | null;

		beforeEach(async () => {
			gridCell = element.shadowRoot?.querySelector('[role="gridcell"i]:nth-child(3)') as HTMLElement;
		});

		it('should return correct day and hour from mouse click event', async () => {
			const e = new MouseEvent('click', { composed: true, clientY: 54 });
			e.composedPath = jest.fn().mockReturnValue([gridCell]);
			gridCell.getBoundingClientRect = jest.fn().mockReturnValue({ height: 1175, y: 28 });

			context = element.getEventContext(e);

			expect(context?.day).toEqual(2);
			expect(context?.hour).toEqual(0.53);
		});

		it('should return hour from mouse click event', async () => {
			const rowHeader  = element.shadowRoot?.querySelector('[role="rowheader"]:nth-child(3)') as HTMLElement;
			rowHeader.getBoundingClientRect = jest.fn().mockReturnValue({ height: 49, y: 85 });

			const rowHeaderTimeElement = rowHeader.querySelector('time') as HTMLElement;

			const e = new MouseEvent('click', { composed: true, clientX: 25, clientY: 174 });
			e.composedPath = jest.fn().mockReturnValue([rowHeaderTimeElement]);

			context = element.getEventContext(e);

			expect(context?.day).toBeUndefined();
			expect(context?.hour).toEqual(43.59);
		});

		it('should return null from mouse click event', async () => {
			const grid  = element.shadowRoot?.querySelector('[role="grid"]') as HTMLElement;

			const e = new MouseEvent('click', { composed: true, clientX: 0, clientY: 0 });
			e.composedPath = jest.fn().mockReturnValue([grid]);

			context = element.getEventContext(e);

			expect(context).toBeNull();
		});

		it('should throw if unsupported event passed', async () => {
			const e = new FocusEvent('focus');
			e.composedPath = jest.fn().mockReturnValue([gridCell]);

			const getEventContext = () => element.getEventContext(e as MouseEvent);

			expect(getEventContext).toThrow('Invalid event. Event must be instance of KeyboardEvent or MouseEvent');
		});

		it('should throw if no target object', async () => {
			const e = new MouseEvent('click', { composed: true, clientY: 54 });
			gridCell.getBoundingClientRect = jest.fn().mockReturnValue({ height: 1175, y: 28 });

			const getEventContext = () => element.getEventContext(e);

			expect(getEventContext).toThrow('Invalid event. Event must contain a target object which is a direct descendant of calendar');
		});

		it('should return day and hour from keydown \'space\' event', async () => {
			element.addEventListener('keydown', e => context = element.getEventContext(e) as CalendarEventContext);

			gridCell.dispatchEvent(new KeyboardEvent('keydown', { composed: true, keyCode: 13 }));

			expect(context?.day).toEqual(2);
			expect(context?.hour).toEqual(undefined);
		});

		it('should return day and hour from keydown \'enter\' event', async () => {
			element.addEventListener('keydown', e => context = element.getEventContext(e) as CalendarEventContext);

			gridCell.dispatchEvent(new KeyboardEvent('keydown', { composed: true, keyCode: 32 }));

			expect(context?.day).toEqual(2);
			expect(context?.hour).toEqual(undefined);
		});

		it('should throw if `event` not instance of `Keyboard` / `Pointer`', async () => {
			element.addEventListener('keydown', e => context = element.getEventContext(e) as CalendarEventContext);

			gridCell.dispatchEvent(new KeyboardEvent('keydown', { composed: true, keyCode: 32 }));

			expect(context?.day).toEqual(2);
			expect(context?.hour).toEqual(undefined);
		});
	});

	describe('focus management', () => {
		let grid: HTMLElement;
		let shadowRoot: ShadowRoot;

		beforeEach(async () => {
			shadowRoot = element.shadowRoot as ShadowRoot;
			grid = element.shadowRoot?.querySelector('[role="grid"i]') as HTMLElement;
		});

		it('should focus to default on initial keyboard interaction', async () => {
			grid.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

			const defaultFocusElement = grid.querySelector('[role="columnheader"i]');

			expect(shadowRoot.activeElement).toEqual(defaultFocusElement);
		});

		it('should not change focus if not arrow key', async () => {

			const gridCell = shadowRoot?.querySelector('[role="columnheader"i]:nth-child(3)') as HTMLElement;

			gridCell.focus();

			const moveToElement = (key: string) => {
				grid.dispatchEvent(new KeyboardEvent('keydown', { key }));
				return shadowRoot?.activeElement;
			};

			expect(moveToElement('Home')).toEqual(gridCell);
		});

		it('should change focus on keyboard arrow interactions', async () => {

			const gridCell = shadowRoot?.querySelector('[role="columnheader"i]:nth-child(3)') as HTMLElement;

			gridCell.focus();

			const moveToElement = (key: string) => {
				grid.dispatchEvent(new KeyboardEvent('keydown', { key }));
				return shadowRoot?.activeElement;
			};

			expect(moveToElement('ArrowRight')).toEqual(
				grid.querySelector('[role="columnheader"i]:nth-child(4)')
			);
			expect(moveToElement('ArrowLeft')).toEqual(
				grid.querySelector('[role="columnheader"i]:nth-child(3)')
			);
			expect(moveToElement('ArrowUp')).toEqual(
				grid.querySelector('[role="gridcell"i]:nth-child(3)')
			);
			expect(moveToElement('ArrowDown')).toEqual(
				grid.querySelector('[role="columnheader"i]:nth-child(3)')
			);
		});

		it('should circle back focus on keyboard arrow interactions', async () => {

			const gridCell = shadowRoot?.querySelector('[role="columnheader"i]:nth-child(7)') as HTMLElement;

			gridCell.focus();

			const moveToElement = (key: string) => {
				grid.dispatchEvent(new KeyboardEvent('keydown', { key }));
				return shadowRoot?.activeElement;
			};

			expect(moveToElement('ArrowRight')).toEqual(
				grid.querySelector('[role="columnheader"i]:nth-child(1)')
			);
			expect(moveToElement('ArrowLeft')).toEqual(
				grid.querySelector('[role="columnheader"i]:nth-child(7)')
			);
		});

		it('should change from columnheader tabindex', async () => {

			const emEl = shadowRoot?.querySelector('[role="columnheader"i]:nth-child(4) em') as HTMLElement;

			emEl.focus();

			const moveToElement = (key: string) => {
				grid.dispatchEvent(new KeyboardEvent('keydown', { key }));
				return shadowRoot?.activeElement;
			};

			expect(moveToElement('ArrowDown')).toEqual(grid.querySelector('[role="gridcell"i]:nth-child(4)'));
		});

		it('should not change from columnheader tabindex', async () => {

			const emEl = shadowRoot?.querySelector('[role="columnheader"i]:nth-child(4) em') as HTMLElement;

			emEl.focus();

			const moveToElement = (key: string) => {
				grid.dispatchEvent(new KeyboardEvent('keydown', { key }));
				return shadowRoot?.activeElement;
			};

			expect(moveToElement('ArrowUp')).toEqual(emEl);
			expect(moveToElement('ArrowRight')).toEqual(emEl);
			expect(moveToElement('ArrowLeft')).toEqual(emEl);
		});

		// !TODO: this is a temporary fix until calendar event is included in this repo
		// it('should move focus from calendar event to containing gridcell on \'arrowUp\'', async () => {
		// 	const eventComponent = 'vwc-calendar-event';

		// 	const { actualElement, shadowRoot, grid } = extractCalendarElements(await addCalendarElement(
		// 		`<${eventComponent} slot="day-2" start="4" duration="5"></${eventComponent}>`
		// 	));

		// 	actualElement.querySelector(eventComponent)
		// 		.shadowRoot.querySelector('section')
		// 		.focus();

		// 	grid.dispatchEvent(createKEvent('ArrowUp'));

		// 	expect(shadowRoot.activeElement).to.equal(
		// 		grid.querySelector('[role="gridcell"i]:nth-child(3)')
		// 	);
		// });

		it('should move focus from column header button to gridcell of same block on \'arrowDown\'', async () => {
			const columnHeader = shadowRoot.querySelector('[role="columnheader"i]:nth-child(3)');
			const button = columnHeader?.querySelector('[role="button"i]') as HTMLButtonElement;
			button.focus();

			grid.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

			expect(shadowRoot.activeElement).toEqual(
				grid.querySelector('[role="gridcell"i]:nth-child(3)')
			);
		});
	});

	describe('a11y', () => {
		it('should pass accessibility test', async () => {
			const { shadowRoot } = element;
			if (!shadowRoot) { return; }

			const results = await axe(shadowRoot.innerHTML, {
				rules: {
					// components should not be tested as page content
					'region': { enabled: false }
				}
			});

			expect(results).toHaveNoViolations();
		});
	});
});

/**
 * @param element
 */
function getCalendarFirstDate(element: Calendar) {
	const firstColumnTimeEl = element.shadowRoot?.querySelector('.column-headers > :first-child time') as HTMLTimeElement;
	const firstDatetime = firstColumnTimeEl?.getAttribute('datetime') as string;
	return new Date(firstDatetime);
}

/**
 * @param d
 */
function getMondayOfWeek(d: Date | string) {
	d = new Date(d);
	const day = d.getDay(),
		diff = d.getDate() - day + (day == 0 ? -6:1); // adjust when day is sunday
	return new Date(d.setDate(diff));
}

/**
 * @param d
 */
function getSundayOfWeek(d: Date | string) {
	d = new Date(d);
	const day = d.getDay(),
		diff = d.getDate() - day;
	return new Date(d.setDate(diff));
}
