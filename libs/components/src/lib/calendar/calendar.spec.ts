import { elementUpdated, fixture } from '@repo/shared';
import { DOM } from '@microsoft/fast-element';

import { Calendar } from './calendar';
import '.';
import '../calendar-event';
import { getValidDateString } from './helpers/calendar.date-functions';
import type { CalendarEventContext } from './helpers/calendar.event-context';

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
			expect(element.stickyMode).toEqual('all');
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('datetime', () => {
		it("should show recent monday as first day of '2022-01-01' week", async () => {
			const date = '2022-01-01';

			element.datetime = date;
			await elementUpdated(element);

			const firstColumnDate = getFirstColumnDate(element);
			const monday = getMondayOfWeek(date);

			expect(firstColumnDate).toEqual(monday);
		});
	});

	describe('startDay', () => {
		it('should show recent sunday as first day of this week', async () => {
			element.startDay = 'sunday';
			await elementUpdated(element);

			const firstColumnDate = getFirstColumnDate(element);

			const today = getValidDateString(new Date());
			const sunday = getSundayOfWeek(today);

			expect(firstColumnDate).toEqual(sunday);
		});

		it("should show recent sunday as first day of '2022-01-01' week", async () => {
			element.startDay = 'sunday';
			const date = '2022-01-01';

			element.datetime = date;
			await elementUpdated(element);

			const firstColumnDate = getFirstColumnDate(element);
			const sunday = getSundayOfWeek(date);

			expect(firstColumnDate).toEqual(sunday);
		});
	});

	describe('locales', () => {
		it('should set hebrew locales', async () => {
			const date = '2022-01-01';
			element.datetime = date;
			element.locales = 'he-il';

			await elementUpdated(element);

			const firstColumnDate = element.shadowRoot?.querySelector(
				'.column-headers > :first-child small'
			) as HTMLElement;

			expect(firstColumnDate.textContent?.trim()).toEqual('יום ב׳');
		});
	});

	describe('hour12', () => {
		it('should display time in 12h format', async () => {
			element.hour12 = true;

			await elementUpdated(element);

			const hour13th = element.shadowRoot?.querySelector(
				'.row-headers > :nth-child(13)'
			) as HTMLSpanElement;

			const expectedTimeString = new Intl.DateTimeFormat(element.locales, {
				hour: 'numeric',
				hour12: true,
			}).format(new Date('2022-12-16T13:00:00.000'));

			expect(hour13th.textContent?.trim()).toEqual(expectedTimeString);
		});
	});

	describe('Event Context', () => {
		let gridCell: HTMLElement;
		let context: CalendarEventContext | null;

		beforeEach(async () => {
			gridCell = element.shadowRoot?.querySelector(
				'[role="gridcell"i]:nth-child(3)'
			) as HTMLElement;
		});

		it('should return correct day and hour from mouse clicking inside one of the columns cells', async () => {
			const e = new MouseEvent('click', { composed: true, clientY: 54 });
			e.composedPath = vi.fn().mockReturnValue([gridCell]);
			gridCell.getBoundingClientRect = vi
				.fn()
				.mockReturnValue({ height: 1175, y: 28 });

			context = element.getEventContext(e);

			expect(context?.day).toEqual(2);
			expect(context?.hour).toEqual(0.53);
		});

		it('should return hour from mouse clicking on a row header', async () => {
			const rowHeader = element.shadowRoot?.querySelector(
				'[role="rowheader"]:nth-child(3)'
			) as HTMLElement;
			rowHeader.getBoundingClientRect = vi
				.fn()
				.mockReturnValue({ height: 49, y: 85 });

			const rowHeaderTimeElement = rowHeader.querySelector(
				'time'
			) as HTMLElement;

			const e = new MouseEvent('click', {
				composed: true,
				clientX: 25,
				clientY: 174,
			});
			e.composedPath = vi.fn().mockReturnValue([rowHeaderTimeElement]);

			context = element.getEventContext(e);

			expect(context?.day).toBeUndefined();
			expect(context?.hour).toEqual(43.59);
		});

		it('should return null if mouse click outside grid managed area', async () => {
			const grid = element.shadowRoot?.querySelector(
				'[role="grid"]'
			) as HTMLElement;

			const e = new MouseEvent('click', {
				composed: true,
				clientX: 0,
				clientY: 0,
			});
			e.composedPath = vi.fn().mockReturnValue([grid]);

			context = element.getEventContext(e);

			expect(context).toBeNull();
		});

		it('should throw if unsupported event passed', async () => {
			const e = new FocusEvent('focus');
			e.composedPath = vi.fn().mockReturnValue([gridCell]);

			const getEventContext = () => element.getEventContext(e as MouseEvent);

			expect(getEventContext).toThrow(
				'Invalid event. Event must be instance of KeyboardEvent or MouseEvent'
			);
		});

		it('should throw if event is missing a target', async () => {
			const e = new MouseEvent('click', { composed: true, clientY: 54 });
			gridCell.getBoundingClientRect = vi
				.fn()
				.mockReturnValue({ height: 1175, y: 28 });

			const getEventContext = () => element.getEventContext(e);

			expect(getEventContext).toThrow(
				'Invalid event. Event must contain a target object which is a direct descendant of calendar'
			);
		});

		it("should return day from keydown 'space' in grid cell", async () => {
			element.addEventListener(
				'keydown',
				(e) => (context = element.getEventContext(e) as CalendarEventContext)
			);

			gridCell.dispatchEvent(
				new KeyboardEvent('keydown', { composed: true, keyCode: 13 })
			);

			expect(context?.day).toEqual(2);
			expect(context?.hour).toBeUndefined();
		});

		it("should emit 'enter' keydown event with day and hour when focused on grid cell", async () => {
			element.addEventListener(
				'keydown',
				(e) => (context = element.getEventContext(e) as CalendarEventContext)
			);

			gridCell.dispatchEvent(
				new KeyboardEvent('keydown', { composed: true, keyCode: 32 })
			);

			expect(context?.day).toEqual(2);
			expect(context?.hour).toEqual(undefined);
		});
	});

	describe('Stick Mode', () => {
		it(`should add class "sticky-*stick-mode*" [role="grid"]]`, async () => {
			const stickyMode = 'all';
			element.stickyMode = stickyMode;
			await elementUpdated(element);

			const control = element.shadowRoot?.querySelector(
				`.sticky-${stickyMode}`
			);
			expect(control).toBeInstanceOf(Element);
		});

		it('should set the initial scroll position to 8:00 AM', async () => {
			vi.stubGlobal(
				'getComputedStyle',
				() =>
					({
						overflowY: 'auto',
						overflowX: 'scroll',
					} as CSSStyleDeclaration)
			);

			document.body.innerHTML;
			const fragment = document.createElement('div');
			document.body.appendChild(fragment);
			const calendarEl = document.createElement(COMPONENT_TAG);
			calendarEl.stickyMode = 'all';

			// Mocking layout properties
			vi.spyOn(calendarEl, 'scrollHeight', 'get').mockReturnValue(1206);
			vi.spyOn(calendarEl, 'clientHeight', 'get').mockReturnValue(550);
			const scrollToMock = vi.fn();
			Object.defineProperty(calendarEl, 'scrollTo', { value: scrollToMock });

			fragment.appendChild(calendarEl);

			await DOM.nextUpdate();

			// Calculate row height and scroll position
			const rowHeight = calendarEl.scrollHeight / calendarEl._hours;
			const scrollPosition = rowHeight * (8 - 1);

			vi.unstubAllGlobals();

			expect(scrollToMock).toHaveBeenCalledWith({
				top: scrollPosition,
			});
		});
	});

	describe('focus management', () => {
		let grid: HTMLElement;
		let shadowRoot: ShadowRoot;

		const hitKey = (key: string) => {
			grid.dispatchEvent(
				new KeyboardEvent('keydown', { key, bubbles: true, composed: true })
			);
		};

		beforeEach(async () => {
			shadowRoot = element.shadowRoot as ShadowRoot;
			grid = element.shadowRoot?.querySelector('[role="grid"i]') as HTMLElement;
		});

		it('should focus to default on initial keyboard interaction', async () => {
			grid.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

			const defaultFocusElement = grid.querySelector('[role="columnheader"i]');

			expect(shadowRoot.activeElement).toEqual(defaultFocusElement);
		});

		it('should keep focus if not arrow key event', async () => {
			const gridCell = shadowRoot?.querySelector(
				'[role="columnheader"i]:nth-child(3)'
			) as HTMLElement;

			gridCell.focus();

			hitKey('Home');
			expect(shadowRoot.activeElement).toEqual(gridCell);
		});

		it('should change focus on keyboard arrow interactions', async () => {
			const gridCell = shadowRoot?.querySelector(
				'[role="columnheader"i]:nth-child(3)'
			) as HTMLElement;

			gridCell.focus();

			hitKey('ArrowRight');
			expect(shadowRoot.activeElement).toEqual(
				grid.querySelector('[role="columnheader"i]:nth-child(4)')
			);

			hitKey('ArrowLeft');
			expect(shadowRoot.activeElement).toEqual(
				grid.querySelector('[role="columnheader"i]:nth-child(3)')
			);

			hitKey('ArrowUp');
			expect(shadowRoot.activeElement).toEqual(
				grid.querySelector('[role="gridcell"i]:nth-child(3)')
			);

			hitKey('ArrowDown');
			expect(shadowRoot.activeElement).toEqual(
				grid.querySelector('[role="columnheader"i]:nth-child(3)')
			);
		});

		it('should circle back focus from last column to first', async () => {
			const gridCell = shadowRoot?.querySelector(
				'[role="columnheader"i]:nth-child(7)'
			) as HTMLElement;

			gridCell.focus();

			hitKey('ArrowRight');
			expect(shadowRoot.activeElement).toEqual(
				grid.querySelector('[role="columnheader"i]:nth-child(1)')
			);

			hitKey('ArrowLeft');
			expect(shadowRoot.activeElement).toEqual(
				grid.querySelector('[role="columnheader"i]:nth-child(7)')
			);
		});

		it('should only apply arrow down on focused "em" (tabindexed) element', async () => {
			const em = shadowRoot?.querySelector(
				'[role="columnheader"i]:nth-child(4) em'
			) as HTMLElement;

			em.focus();

			hitKey('ArrowUp');
			expect(shadowRoot.activeElement).toEqual(em);

			hitKey('ArrowRight');
			expect(shadowRoot.activeElement).toEqual(em);

			hitKey('ArrowLeft');
			expect(shadowRoot.activeElement).toEqual(em);

			hitKey('ArrowDown');
			expect(shadowRoot.activeElement).toEqual(
				grid.querySelector('[role="gridcell"i]:nth-child(4)')
			);
		});

		it("should move focus from column header button to gridcell of same block on 'arrowDown'", async () => {
			const columnHeader = shadowRoot.querySelector(
				'[role="columnheader"i]:nth-child(3)'
			);
			const button = columnHeader?.querySelector(
				'[role="button"i]'
			) as HTMLButtonElement;
			button.focus();

			grid.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

			expect(shadowRoot.activeElement).toEqual(
				grid.querySelector('[role="gridcell"i]:nth-child(3)')
			);
		});

		it("should move focus from calendar event to its containing gridcell on 'ArrowDown'", async () => {
			const calendarEvent = document.createElement('vwc-calendar-event');
			calendarEvent.slot = 'day-5';
			element.appendChild(calendarEvent);
			const calendarEventBase = calendarEvent.shadowRoot?.querySelector(
				'.base'
			) as HTMLDivElement;
			calendarEventBase.focus();

			hitKey('ArrowDown');

			expect(shadowRoot.activeElement).toEqual(
				shadowRoot.querySelector('[role="gridcell"i]:nth-child(6)')
			);
		});
	});
});

function getFirstColumnDate(element: Calendar) {
	const firstColumnTimeEl = element.shadowRoot?.querySelector(
		'.column-headers > :first-child time'
	) as HTMLTimeElement;
	const firstDatetime = firstColumnTimeEl?.getAttribute('datetime') as string;
	return new Date(firstDatetime);
}

function getMondayOfWeek(d: Date | string) {
	d = new Date(d);
	const day = d.getDay(),
		diff = d.getDate() - day + (day == 0 ? -6 : 1); // adjust when day is sunday
	return new Date(d.setDate(diff));
}

function getSundayOfWeek(d: Date | string) {
	d = new Date(d);
	const day = d.getDay(),
		diff = d.getDate() - day;
	return new Date(d.setDate(diff));
}
