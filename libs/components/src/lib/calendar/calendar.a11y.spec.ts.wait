import '../vwc-calendar.js';
import {
	isolatedElementsCreation,
	textToDomToParent
} from '../../../test/test-helpers.js';
import { chaiA11yAxe } from 'chai-a11y-axe';

chai.use(chaiA11yAxe);

const COMPONENT_NAME = 'vwc-calendar';

describe('calendar a11y', () => {
	const addElement = isolatedElementsCreation();

	const addCalendarElement = async (content) => {
		const [actualElement] = addElement(
			textToDomToParent(`<${COMPONENT_NAME}>${content || ''}</${COMPONENT_NAME}>`)
		);
		await actualElement.updateComplete;

		return actualElement;
	};

	const extractCalendarElements = (actualElement) => {
		const { shadowRoot } = actualElement;
		return {
			actualElement,
			shadowRoot,
			grid: shadowRoot.querySelector('[role="grid"i]')
		};
	};

	const createKEvent = key => new KeyboardEvent('keydown', { key });

	it('should pass accessibility test', async () => {
		const { actualElement } = extractCalendarElements(await addCalendarElement());
		await expect(actualElement).shadowDom.to.be.accessible();
	});

	describe('keyboard events', () => {
		it('should focus to default on initial keyboard interaction', async () => {
			const { shadowRoot, grid } = extractCalendarElements(await addCalendarElement());

			grid.dispatchEvent(createKEvent('ArrowDown'));

			const defaultFocusElement = grid.querySelector('[role="columnheader"i]');

			expect(shadowRoot.activeElement).to.equal(defaultFocusElement);
		});

		it('should change focus on keyboard arrow interactions', async () => {
			const { shadowRoot, grid } = extractCalendarElements(await addCalendarElement());

			grid.querySelector('[role="columnheader"i]:nth-child(3)').focus();

			const getRole = (role, i) => grid.querySelector(`[role="${role}"i]:nth-child(${i})`);
			const moveToElement = (key) => {
				grid.dispatchEvent(createKEvent(key));
				return shadowRoot.activeElement;
			};

			const focusedElementAfterMovingRight = moveToElement('ArrowRight');
			const focusedElementAfterMovingLeft = moveToElement('ArrowLeft');
			const focusedElementAfterMovingUp = moveToElement('ArrowUp');
			const focusedElementAfterMovingDown = moveToElement('ArrowDown');

			expect(focusedElementAfterMovingRight).to.equal(getRole('columnheader', 4));
			expect(focusedElementAfterMovingLeft).to.equal(getRole('columnheader', 3));
			expect(focusedElementAfterMovingUp).to.equal(getRole('gridcell', 3));
			expect(focusedElementAfterMovingDown).to.equal(getRole('columnheader', 3));
		});

		it('should move focus from calendar event to containing gridcell on \'arrowUp\'', async () => {
			const eventComponent = 'vwc-calendar-event';

			const { actualElement, shadowRoot, grid } = extractCalendarElements(await addCalendarElement(
				`<${eventComponent} slot="day-2" start="4" duration="5"></${eventComponent}>`
			));

			actualElement.querySelector(eventComponent)
				.shadowRoot.querySelector('section')
				.focus();

			grid.dispatchEvent(createKEvent('ArrowUp'));

			expect(shadowRoot.activeElement).to.equal(
				grid.querySelector('[role="gridcell"i]:nth-child(3)')
			);
		});

		it('should move focus from column header button to gridcell of same block on \'arrowDown\'', async () => {
			const { actualElement, shadowRoot, grid } = extractCalendarElements(await addCalendarElement());

			const columnHeader = actualElement.shadowRoot.querySelector('[role="columnheader"i]:nth-child(3)');
			columnHeader.querySelector('[role="button"i]').focus();

			grid.dispatchEvent(createKEvent('ArrowDown'));

			expect(shadowRoot.activeElement).to.equal(
				grid.querySelector('[role="gridcell"i]:nth-child(3)')
			);
		});
	});
});
