import { html } from '@microsoft/fast-element';
import { elementUpdated, fixture, getBaseElement } from '@repo/shared';
import { DataGridRow } from './data-grid-row';
import '.';
import { DataGridCell } from './data-grid-cell';

const COMPONENT_TAG = 'vwc-data-grid-row';

describe('vwc-data-grid-row', () => {
	let element: DataGridRow;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DataGridRow;
	});

	// TODO::adds grid column style
	describe('basic', () => {
		it('should be initialized as a vwc-data-grid', async () => {
			expect(element).toBeInstanceOf(DataGridRow);
			expect(element.gridTemplateColumns).toBeUndefined();
			expect(element.rowType).toEqual('default');
			expect(element.getAttribute('row-type')).toBeNull();
			expect(element.rowData).toBeNull();
			expect(element.columnDefinitions).toBeNull();
			expect(element.cellItemTemplate).toBeUndefined();
			expect(element.headerCellItemTemplate).toBeUndefined();
			expect(element.rowIndex).toBeUndefined();
			expect(element.getAttribute('row-index')).toBeNull();
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('rowType', () => {
		it('should reflect header row-type', async () => {
			element.rowType = 'header';
			await elementUpdated(element);
			expect(element.getAttribute('row-type')).toEqual('header');
			expect(element.classList.length).toBe(1);
			expect(element.classList.contains('header'));
		});

		it('should reflect sticky-header row-type', async () => {
			element.rowType = 'sticky-header';
			await elementUpdated(element);
			expect(element.getAttribute('row-type')).toEqual('sticky-header');
			expect(element.classList.length).toBe(1);
			expect(element.classList.contains('sticky-header'));
		});

		it('shuold remove class when row-type is default', async () => {
			element.rowType = 'default';
			await elementUpdated(element);
			expect(element.getAttribute('row-type')).toEqual('default');
			expect(element.classList.length).toBe(0);
		});
	});

	describe('gridTemplateColumns', () => {
		it('should reflect grid-template-columns', async () => {
			element.gridTemplateColumns = '1fr 1fr 1fr';
			await elementUpdated(element);
			expect(element.getAttribute('grid-template-columns')).toEqual(
				'1fr 1fr 1fr'
			);
		});
	});

	describe('style', () => {
		it('should set grid-column on cells', async () => {
			element.columnDefinitions = [
				{ columnDataKey: 'name' },
				{ columnDataKey: 'age' },
			];
			await elementUpdated(element);
			const allHaveExpectedGridColumn = Array.from(
				element.querySelectorAll('undefined')
			).reduce((acc, child, index) => {
				return acc && child.getAttribute('grid-column') === `${index + 1}`;
			}, true);
			expect(allHaveExpectedGridColumn).toBeTruthy();
		});
	});

	describe('columnDefinitions', () => {
		it('should render a cell for each column', async () => {
			element.columnDefinitions = [
				{ columnDataKey: 'name' },
				{ columnDataKey: 'age' },
			];
			await elementUpdated(element);
			expect(element.querySelectorAll('vwc-data-grid-cell').length).toEqual(2);
		});
	});

	describe('gridTemplateColumns', () => {
		it('should set "grid-template-columns" on base element according to gridTemplateColumns', async function () {
			element.gridTemplateColumns = '1fr 1fr 1fr';
			await elementUpdated(element);

			expect(getBaseElement(element).style['gridTemplateColumns']).toEqual(
				'1fr 1fr 1fr'
			);
		});
	});

	describe('cellItemTemplate and headerCellItemTemplate', () => {
		it('should render cells according to number of columns', async () => {
			const dataGridCellTagName = 'something-custom';
			const dataGridCellTag = html.partial('something-custom');

			element.columnDefinitions = [
				{ columnDataKey: 'name' },
				{ columnDataKey: 'age' },
			];
			element.cellItemTemplate = html`<${dataGridCellTag}></${dataGridCellTag}>`;
			await elementUpdated(element);

			expect(element.querySelectorAll(dataGridCellTagName).length).toEqual(2);
		});

		it('should render header cells according to number of columns', async () => {
			const dataGridCellTagName = 'something-custom';
			const dataGridCellTag = html.partial('something-custom');

			element.columnDefinitions = [
				{ columnDataKey: 'name', isRowHeader: true },
				{ columnDataKey: 'age' },
			];
			element.rowType = 'header';
			element.headerCellItemTemplate = html`<${dataGridCellTag}></${dataGridCellTag}>`;
			await elementUpdated(element);

			expect(element.querySelectorAll(dataGridCellTagName).length).toEqual(2);
		});
	});

	describe('row-focused event', () => {
		it('should fire the focused event when one of the cells is focused', async () => {
			const spy = vi.fn();
			element.addEventListener('row-focused', spy);
			element.dispatchEvent(new FocusEvent('cell-focused'));
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('keyboard events', () => {
		it('should move focus on arrow keys', async () => {
			const dataGridCellTagName = 'button';
			const dataGridCellTag = html.partial(dataGridCellTagName);

			element.columnDefinitions = [
				{ columnDataKey: 'name' },
				{ columnDataKey: 'age' },
			];
			element.cellItemTemplate = html`<${dataGridCellTag} role="cell"></${dataGridCellTag}>`;
			await elementUpdated(element);
			const cells = Array.from(element.querySelectorAll(dataGridCellTagName));
			const focusedElementBeforeArrowKey = document.activeElement;
			const rowCellFocused = cells.includes(
				focusedElementBeforeArrowKey as any
			);

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
			const firstCellFocused = cells[0] === document.activeElement;

			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight' })
			);
			const secondCellFocused = cells[1] === document.activeElement;

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
			const firstCellFocusedAfterArrowLeft =
				cells[0] === document.activeElement;

			expect(rowCellFocused).toBeFalsy();
			expect(firstCellFocused).toBeTruthy();
			expect(secondCellFocused).toBeTruthy();
			expect(firstCellFocusedAfterArrowLeft).toBeTruthy();
		});

		it('should reset focus index when the row loses focus', async () => {
			element.columnDefinitions = [
				{ columnDataKey: 'name' },
				{ columnDataKey: 'age' },
				{ columnDataKey: 'set' },
			];
			element.rowData = { name: 'John', age: 30, set: 'set' };
			await elementUpdated(element);
			const cells = Array.from(
				element.querySelectorAll('vwc-data-grid-cell')
			) as DataGridCell[];

			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight' })
			);
			expect(document.activeElement).toBe(cells[1]);

			cells[1].blur();

			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowRight' })
			);
			expect(document.activeElement).toBe(cells[1]);
		});

		it('should ignore key press event when their default is prevented', async () => {
			const dataGridCellTagName = 'button';
			element.columnDefinitions = [
				{ columnDataKey: 'name' },
				{ columnDataKey: 'age' },
			];
			element.cellItemTemplate = html`<${dataGridCellTagName} role="cell"></${dataGridCellTagName}>`;
			await elementUpdated(element);
			element.addEventListener('keydown', (e) => e.preventDefault(), true);

			element.dispatchEvent(
				new KeyboardEvent('keydown', { key: 'ArrowLeft', cancelable: true })
			);
			expect(document.activeElement).toBe(document.body);
		});

		it('should move focus edges on home or end keys press', async () => {
			const dataGridCellTagName = 'button';
			const dataGridCellTag = html.partial('button');

			element.columnDefinitions = [
				{ columnDataKey: 'name' },
				{ columnDataKey: 'age' },
				{ columnDataKey: 'set' },
				{ columnDataKey: 'get' },
			];
			element.cellItemTemplate = html`<${dataGridCellTag} role="cell"></${dataGridCellTag}>`;
			await elementUpdated(element);
			const cells = Array.from(element.querySelectorAll(dataGridCellTagName));

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'End' }));
			expect(cells[3] === document.activeElement).toBeTruthy();

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'Home' }));
			expect(cells[0] === document.activeElement).toBeTruthy();
		});
	});

	describe('aria-selected', () => {
		it('should reflect on host', async function () {
			element.ariaSelected = 'true';
			await elementUpdated(element);
			expect(element.getAttribute('aria-selected')).toEqual('true');
		});

		it('should set selected class on base element', async function () {
			element.ariaSelected = 'true';
			await elementUpdated(element);
			expect(
				getBaseElement(element).classList.contains('selected')
			).toBeTruthy();
		});

		it('should remove selected class on base element when false', async function () {
			element.ariaSelected = 'true';
			await elementUpdated(element);
			element.ariaSelected = 'false';
			await elementUpdated(element);
			expect(
				getBaseElement(element).classList.contains('selected')
			).toBeFalsy();
		});
	});
});
