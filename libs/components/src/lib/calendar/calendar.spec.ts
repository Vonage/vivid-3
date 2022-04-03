import { fixture } from '@vivid-nx/shared';
import { Calendar } from './calendar';
import '.';

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
			expect(element.stickyHeader).toBeUndefined();
		});
	});

  	it('should set cells in correct day column', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const { shadowRoot } = actualElement;
		const cells = shadowRoot.querySelectorAll('.calendar > [role="listitem"i]');

		const isCorrectColumns = Array.from(cells).every((cell, i) => getComputedStyle(cell)
			.getPropertyValue('--column') == ~~(i / 24) + 1);

		expect(isCorrectColumns).to.equal(true);
	});

	it('should set correct size proportions', async () => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		);
		await waitNextTask();

		const { shadowRoot } = actualElement;

		const grid = shadowRoot.querySelector('.calendar-grid-presentation');
		const cells = shadowRoot.querySelectorAll('[role="gridcell"i]');
		const rowHeaders = shadowRoot.querySelector('.row-headers');
		const columnHeaders = shadowRoot.querySelector('.column-headers');

		const cellsStylesMatch = Array.from(cells).every(cell => getComputedStyle(cell).blockSize == getComputedStyle(grid).blockSize);
		const rowHeadersStylesMatch = getComputedStyle(rowHeaders).blockSize == getComputedStyle(grid).blockSize;
		const columnHeadersStylesMatch = getComputedStyle(columnHeaders).inlineSize == getComputedStyle(grid).inlineSize;

		expect(cellsStylesMatch).to.equal(true);
		expect(rowHeadersStylesMatch).to.equal(true);
		expect(columnHeadersStylesMatch).to.equal(true);
	});

	describe('API', () => {
		it('should match snapshot set by property', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);

			actualElement.datetime = '2021-01-01';
			await actualElement.updateComplete;

			expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it('should match snapshot set by attribute', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);

			actualElement.setAttribute('datetime', '2021-01-01');
			await actualElement.updateComplete;

			expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
		});

		// TODO: find solution for cross browser testing of
		// locales as i18n strings vary across browsers
		// it('should match snapshot of locales', async () => {
		// 	const [actualElement] = addElement(
		// 		textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
		// 	);

		// 	actualElement.datetime = '2021-01-01';
		// 	actualElement.locales = 'pt-BR';
		// 	await actualElement.updateComplete;

		// 	expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
		// });

		it('should match snapshot of 24h timekeeping system', async () => {
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
			);

			actualElement.datetime = '2021-01-01';
			actualElement.hour12 = false;
			await actualElement.updateComplete;

			expect(actualElement.shadowRoot.innerHTML).to.equalSnapshot();
		});

		it('should delegate attributes to custom properties', async () => {
			const eventComponent = 'vwc-calendar-event';
			const [actualElement] = addElement(
				textToDomToParent(`<${eventComponent}
					color="rgb(43, 158, 250)"
					start="18.5"
					duration="7.5"
					overlap-count="1">
				</${eventComponent}>`)
			);

			await actualElement.updateComplete;
			const section = actualElement.shadowRoot.querySelector('section');

			const getValue = prop => getComputedStyle(section).getPropertyValue(`--vvd-calendar-event--${prop}`);

			expect(getValue('primary-color'), 'wrong color').to.equal('rgb(43, 158, 250)');
			expect(getValue('start'), 'wrong start').to.equal('18.5');
			expect(getValue('duration'), 'wrong duration').to.equal('7.5');
			expect(getValue('overlap-count'), 'wrong indentation').to.equal('1');
		});

		it('should set correct styles of start & duration', async () => {
			const eventComponent = 'vwc-calendar-event';
			const start = 4;
			const duration = 5;
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>
					<${eventComponent} slot="day-3" start="${start}" duration="${duration}"></${eventComponent}>
				</${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;

			const { shadowRoot } = actualElement;
			const column = shadowRoot.querySelector('[role=gridcell]:nth-child(4)');
			const event = actualElement.querySelector(eventComponent);
			const section = event.shadowRoot.querySelector('section');

			const getHoursCalculatedBlockSize = (hours) => {
				const hourInPx = (column.offsetHeight - 23 /* 23 grid gaps */) / 24/* total hours in calendar */;
				return hourInPx * hours + (hours - 1 /* duration less 1 grid gap */);
			};

			expect(getHoursCalculatedBlockSize(duration) - 4 /* block margins */, 'wrong duration').to.equal(section.offsetHeight);

			const { y: columnY } = column.getBoundingClientRect();
			const { y: sectionY } = section.getBoundingClientRect();

			expect(Math.round(sectionY - columnY - 2) /* block-start margin */, 'wrong start position').to.equal(getHoursCalculatedBlockSize(start) + 1);
		});

		it('should not exceed column block size', async () => {
			const eventComponent = 'vwc-calendar-event';
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>
					<${eventComponent} slot="day-3" start="6" duration="25"></${eventComponent}>
				</${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;

			const { shadowRoot } = actualElement;
			const column = shadowRoot.querySelector('[role=gridcell]:nth-child(4)');
			const event = actualElement.querySelector(eventComponent);
			const section = event.shadowRoot.querySelector('section');

			const hour = (column.offsetHeight - 23 /* 23 grid gaps */) / 24;
			const maxDuration = 18;
			expect(hour * maxDuration + (maxDuration - 1) /* hours less 1 grid gap */ - 4 /* block margins */).to.equal(section.offsetHeight);
		});

		it('should set event in correct column slot', async () => {
			const eventComponent = 'vwc-calendar-event';
			const [actualElement] = addElement(
				textToDomToParent(`<${COMPONENT_NAME}>
					<${eventComponent} slot="day-3"></${eventComponent}>
				</${COMPONENT_NAME}>`)
			);
			await actualElement.updateComplete;

			const { shadowRoot } = actualElement;
			const slot = shadowRoot.querySelector('[role=gridcell]:nth-child(4) > slot');
			const [assignedNode] = Array.from(slot.assignedNodes());

			expect(assignedNode).to.equal(actualElement.querySelector(eventComponent));
		});

		describe('Event Context', () => {
			const addStyledCalendar = async () => {
				const [el] = addElement(
					textToDomToParent(`<${COMPONENT_NAME}></${COMPONENT_NAME}>`)
				);
				await el.updateComplete;

				el.style.top = 0;
				el.style.height = '1200px';
				el.style.position = 'fixed';

				const { shadowRoot } = el;
				const gridCell = shadowRoot.querySelector('[role="gridcell"i]:nth-child(3)');

				return {
					el,
					gridCell
				};
			};

			it('should return correct day and hour from click mouse event', async () => {
				const { el, gridCell } = await addStyledCalendar();

				let context;

				el.addEventListener('click', e => context = el.getEventContext(e));
				gridCell.dispatchEvent(new MouseEvent('click', { composed: true, clientX: 20, clientY: 54 }));

				expect(context.day).to.equal(2);
				expect(context.hour).to.equal(0.2);
			});

			it('should return day and hour from keyboard \'space\'', async () => {
				const { el, gridCell } = await addStyledCalendar();

				await el.updateComplete;

				let context;

				el.addEventListener('keydown', e => context = el.getEventContext(e));

				gridCell.dispatchEvent(new KeyboardEvent('keydown', { composed: true, keyCode: 13 }));

				expect(context.day).to.equal(2);
				expect(context.hour).to.equal(undefined);
			});

			it('should return day and hour from keyboard \'enter\'', async () => {
				const { el, gridCell } = await addStyledCalendar();

				await el.updateComplete;

				let context;

				el.addEventListener('keydown', e => context = el.getEventContext(e));

				gridCell.dispatchEvent(new KeyboardEvent('keydown', { composed: true, keyCode: 32 }));

				expect(context.day).to.equal(2);
				expect(context.hour).to.equal(undefined);
			});

			it('should set Sunday as \'startDay\'', async () => {

			});

			it('should - programmatically - default to Monday if \'startDay\' not specified', async () => {

			});
		});
	});
});
