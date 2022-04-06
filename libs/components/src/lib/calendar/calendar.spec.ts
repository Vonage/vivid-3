import { fixture } from '@vivid-nx/shared';
import { toHaveNoViolations } from 'jest-axe';
import { Calendar } from './calendar';
import '.';


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
			expect(element.locales).toBeUndefined();
			expect(element.hour12).toBeUndefined();
			// expect(element.stickyHeader).toBeUndefined();
		});
	});

	describe('API', () => {
		// it('should match snapshot set by property', async () => {
		// 	element.datetime = '2021-01-01';
		// 	await elementUpdated(element);

		// 	expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
		// });

		// it('should match snapshot set by attribute', async () => {
		// 	element.setAttribute('datetime', '2021-01-01');
		// 	await elementUpdated(element);

		// 	expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
		// });

		// it('should match snapshot of 24h timekeeping system', async () => {
		// 	element.datetime = '2021-01-01';
		// 	element.hour12 = false;
		// 	await elementUpdated(element);

		// 	expect(element.shadowRoot?.innerHTML).toMatchSnapshot();
		// });

		// it('should delegate attributes to custom properties', async () => {
		// 	const eventComponent = 'vwc-calendar-event';
		// 	const [actualElement] = addElement(
		// 		textToDomToParent(`<${eventComponent}
		// 			color="rgb(43, 158, 250)"
		// 			start="18.5"
		// 			duration="7.5"
		// 			overlap-count="1">
		// 		</${eventComponent}>`)
		// 	);

		// 	await actualElement.updateComplete;
		// 	const section = actualElement.shadowRoot.querySelector('section');

		// 	const getValue = prop => getComputedStyle(section).getPropertyValue(`--vvd-calendar-event--${prop}`);

		// 	expect(getValue('primary-color'), 'wrong color').to.equal('rgb(43, 158, 250)');
		// 	expect(getValue('start'), 'wrong start').to.equal('18.5');
		// 	expect(getValue('duration'), 'wrong duration').to.equal('7.5');
		// 	expect(getValue('overlap-count'), 'wrong indentation').to.equal('1');
		// });

		// it('should set correct styles of start & duration', async () => {
		// 	const eventComponent = 'vwc-calendar-event';
		// 	const start = 4;
		// 	const duration = 5;
		// 	const [actualElement] = addElement(
		// 		textToDomToParent(`<${COMPONENT_NAME}>
		// 			<${eventComponent} slot="day-3" start="${start}" duration="${duration}"></${eventComponent}>
		// 		</${COMPONENT_NAME}>`)
		// 	);
		// 	await actualElement.updateComplete;

		// 	const { shadowRoot } = actualElement;
		// 	const column = shadowRoot.querySelector('[role=gridcell]:nth-child(4)');
		// 	const event = actualElement.querySelector(eventComponent);
		// 	const section = event.shadowRoot.querySelector('section');

		// 	const getHoursCalculatedBlockSize = (hours) => {
		// 		const hourInPx = (column.offsetHeight - 23 /* 23 grid gaps */) / 24/* total hours in calendar */;
		// 		return hourInPx * hours + (hours - 1 /* duration less 1 grid gap */);
		// 	};

		// 	expect(getHoursCalculatedBlockSize(duration) - 4 /* block margins */, 'wrong duration').to.equal(section.offsetHeight);

		// 	const { y: columnY } = column.getBoundingClientRect();
		// 	const { y: sectionY } = section.getBoundingClientRect();

		// 	expect(Math.round(sectionY - columnY - 2) /* block-start margin */, 'wrong start position').to.equal(getHoursCalculatedBlockSize(start) + 1);
		// });

		// it('should not exceed column block size', async () => {
		// 	const eventComponent = 'vwc-calendar-event';
		// 	const [actualElement] = addElement(
		// 		textToDomToParent(`<${COMPONENT_NAME}>
		// 			<${eventComponent} slot="day-3" start="6" duration="25"></${eventComponent}>
		// 		</${COMPONENT_NAME}>`)
		// 	);
		// 	await actualElement.updateComplete;

		// 	const { shadowRoot } = actualElement;
		// 	const column = shadowRoot.querySelector('[role=gridcell]:nth-child(4)');
		// 	const event = actualElement.querySelector(eventComponent);
		// 	const section = event.shadowRoot.querySelector('section');

		// 	const hour = (column.offsetHeight - 23 /* 23 grid gaps */) / 24;
		// 	const maxDuration = 18;
		// 	expect(hour * maxDuration + (maxDuration - 1) /* hours less 1 grid gap */ - 4 /* block margins */).to.equal(section.offsetHeight);
		// });

		// it('should set event in correct column slot', async () => {
		// 	const eventComponent = 'vwc-calendar-event';
		// 	const [actualElement] = addElement(
		// 		textToDomToParent(`<${COMPONENT_NAME}>
		// 			<${eventComponent} slot="day-3"></${eventComponent}>
		// 		</${COMPONENT_NAME}>`)
		// 	);
		// 	await actualElement.updateComplete;

		// 	const { shadowRoot } = actualElement;
		// 	const slot = shadowRoot.querySelector('[role=gridcell]:nth-child(4) > slot');
		// 	const [assignedNode] = Array.from(slot.assignedNodes());

		// 	expect(assignedNode).to.equal(actualElement.querySelector(eventComponent));
		// });

		// describe('Event Context', () => {
		// 	it('should return correct day and hour from click mouse event', async () => {
		// 		element.style.top = '0px';
		// 		element.style.height = '1200px';
		// 		element.style.position = 'fixed';

		// 		let context: CalendarEventContext;

		// 		element.addEventListener('click', e => context = element.getEventContext(e) as CalendarEventContext);
		// 		const gridCell = element.shadowRoot?.querySelector('[role="gridcell"i]:nth-child(3)');
		// 		if (!gridCell) throw new Error('gridCell not found');

		// 		gridCell.dispatchEvent(new MouseEvent('click', { composed: true, clientX: 20, clientY: 54 }));

		// 		// if (!context) throw new Error('context not found');

		// 		expect(context!.day).toEqual(2);
		// 		expect(context!.hour).toEqual(0.2);
		// 	});

		// it('should return day and hour from keyboard \'space\'', async () => {
		// 	const { el, gridCell } = await addStyledCalendar();

		// 	await el.updateComplete;

		// 	let context;

		// 	el.addEventListener('keydown', e => context = el.getEventContext(e));

		// 	gridCell.dispatchEvent(new KeyboardEvent('keydown', { composed: true, keyCode: 13 }));

		// 	expect(context.day).to.equal(2);
		// 	expect(context.hour).to.equal(undefined);
		// });

		// it('should return day and hour from keyboard \'enter\'', async () => {
		// 	const { el, gridCell } = await addStyledCalendar();

		// 	await el.updateComplete;

		// 	let context;

		// 	el.addEventListener('keydown', e => context = el.getEventContext(e));

		// 	gridCell.dispatchEvent(new KeyboardEvent('keydown', { composed: true, keyCode: 32 }));

		// 	expect(context.day).to.equal(2);
		// 	expect(context.hour).to.equal(undefined);
		// });

		// it('should set Sunday as \'startDay\'', async () => {

		// });

		// it('should - programmatically - default to Monday if \'startDay\' not specified', async () => {

		// });
	// });
	});

	describe('a11y', () => {
		// const addElement = isolatedElementsCreation();

		// const addCalendarElement = async (content) => {
		// 	const [actualElement] = addElement(
		// 		textToDomToParent(`<${COMPONENT_NAME}>${content || ''}</${COMPONENT_NAME}>`)
		// 	);
		// 	await actualElement.updateComplete;

		// 	return actualElement;
		// };

		// const extractCalendarElements = (actualElement) => {
		// 	const { shadowRoot } = actualElement;
		// 	return {
		// 		actualElement,
		// 		shadowRoot,
		// 		grid: shadowRoot.querySelector('[role="grid"i]')
		// 	};
		// };

		// const createKEvent = key => new KeyboardEvent('keydown', { key });

		// it('should pass accessibility test', async () => {
		// 	const { shadowRoot } = element;
		// 	if (!shadowRoot) { return; }

		// 	const results = await axe(shadowRoot.innerHTML);
		// 	expect(results).toHaveNoViolations();
		// });

		// describe('keyboard events', () => {
		// 	it('should focus to default on initial keyboard interaction', async () => {
		// 		const { shadowRoot, grid } = extractCalendarElements(await addCalendarElement());

		// 		grid.dispatchEvent(createKEvent('ArrowDown'));

		// 		const defaultFocusElement = grid.querySelector('[role="columnheader"i]');

		// 		expect(shadowRoot.activeElement).to.equal(defaultFocusElement);
		// 	});

		// 	it('should change focus on keyboard arrow interactions', async () => {
		// 		const { shadowRoot, grid } = extractCalendarElements(await addCalendarElement());

		// 		grid.querySelector('[role="columnheader"i]:nth-child(3)').focus();

		// 		const getRole = (role, i) => grid.querySelector(`[role="${role}"i]:nth-child(${i})`);
		// 		const moveToElement = (key) => {
		// 			grid.dispatchEvent(createKEvent(key));
		// 			return shadowRoot.activeElement;
		// 		};

		// 		const focusedElementAfterMovingRight = moveToElement('ArrowRight');
		// 		const focusedElementAfterMovingLeft = moveToElement('ArrowLeft');
		// 		const focusedElementAfterMovingUp = moveToElement('ArrowUp');
		// 		const focusedElementAfterMovingDown = moveToElement('ArrowDown');

		// 		expect(focusedElementAfterMovingRight).to.equal(getRole('columnheader', 4));
		// 		expect(focusedElementAfterMovingLeft).to.equal(getRole('columnheader', 3));
		// 		expect(focusedElementAfterMovingUp).to.equal(getRole('gridcell', 3));
		// 		expect(focusedElementAfterMovingDown).to.equal(getRole('columnheader', 3));
		// 	});

		// 	it('should move focus from calendar event to containing gridcell on \'arrowUp\'', async () => {
		// 		const eventComponent = 'vwc-calendar-event';

		// 		const { actualElement, shadowRoot, grid } = extractCalendarElements(await addCalendarElement(
		// 			`<${eventComponent} slot="day-2" start="4" duration="5"></${eventComponent}>`
		// 		));

		// 		actualElement.querySelector(eventComponent)
		// 			.shadowRoot.querySelector('section')
		// 			.focus();

		// 		grid.dispatchEvent(createKEvent('ArrowUp'));

		// 		expect(shadowRoot.activeElement).to.equal(
		// 			grid.querySelector('[role="gridcell"i]:nth-child(3)')
		// 		);
		// 	});

		// 	it('should move focus from column header button to gridcell of same block on \'arrowDown\'', async () => {
		// 		const { actualElement, shadowRoot, grid } = extractCalendarElements(await addCalendarElement());

		// 		const columnHeader = actualElement.shadowRoot.querySelector('[role="columnheader"i]:nth-child(3)');
		// 		columnHeader.querySelector('[role="button"i]').focus();

		// 		grid.dispatchEvent(createKEvent('ArrowDown'));

		// 		expect(shadowRoot.activeElement).to.equal(
		// 			grid.querySelector('[role="gridcell"i]:nth-child(3)')
		// 		);
		// 	});
		// });
	});
});
