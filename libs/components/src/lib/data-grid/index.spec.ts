import { elementUpdated, fixture } from '@vivid-nx/shared';
import type { DataGrid } from './data-grid';
import {DataGridSelectionMode} from './data-grid';
import './index';

const COMPONENT_TAG = 'vwc-data-grid';

describe('data grid', () => {
	function getRowCell(row: number, cell: number) {
		return element.rowElements[row].children[cell] as HTMLElement;
	}

	let element: DataGrid;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DataGrid;
	});

	it('should register vwc-data-grid, vwc-data-grid-row and vwc-data-grid-cell', async () => {
		expect(customElements.get('vwc-data-grid')).toBeTruthy();
		expect(customElements.get('vwc-data-grid-row')).toBeTruthy();
		expect(customElements.get('vwc-data-grid-cell')).toBeTruthy();
	});

	it('should display grid with rows', async () => {
		element.rowsData = [
			{ id: 1, name: 'John', age: 20 },
			{ id: 2, name: 'Jane', age: 21 },
		];
		await elementUpdated(element);
		expect(element.querySelectorAll('vwc-data-grid-row').length).toBe(3);
	});

	it('should display grid with columns', async () => {
		element.rowsData = [
			{ id: 1, name: 'John', age: 20 },
			{ id: 2, name: 'Jane', age: 21 },
		];
		await elementUpdated(element);
		await elementUpdated(element);
		expect(element.querySelectorAll('vwc-data-grid-cell').length).toBe(9);
	});

	it('should fire cell-focused event', async function () {
		const spy = jest.fn();

		element.addEventListener('cell-focused', spy);
		element.rowsData = [
			{ id: 1, name: 'John', age: 20 },
			{ id: 2, name: 'Jane', age: 21 },
		];
		await elementUpdated(element);
		element.rowElements[0].children[0].dispatchEvent(new Event('focusin'));
		expect(spy).toHaveBeenCalled();
	});

	it('should fire row-focused event', async function () {
		const spy = jest.fn();

		element.addEventListener('row-focused', spy);
		element.rowsData = [
			{ id: 1, name: 'John', age: 20 },
			{ id: 2, name: 'Jane', age: 21 },
		];
		await elementUpdated(element);
		element.rowElements[0].children[0].dispatchEvent(new Event('focusin'));
		expect(spy).toHaveBeenCalled();
	});

	describe('selectionMode', function () {

		describe('cell-selection', function () {
			let cell: HTMLElement;

			beforeEach(async function () {
				element.rowsData = [
					{ id: 1, name: 'John', age: 20 },
					{ id: 2, name: 'Jane', age: 21 },
				];
				await elementUpdated(element);
				await elementUpdated(element);
				cell = getRowCell(1,0);
			});

			it.each([DataGridSelectionMode.singleCell, DataGridSelectionMode.multiCell])
			('should add selected attribute to clicked cell if selection mode is %s', async function (selectionMode) {
				element.selectionMode = selectionMode;
				cell.click();
				await elementUpdated(element);
				expect(cell.hasAttribute('selected')).toEqual(true);
			});

			it.each(['none', 'single-row', 'multi-row'])
			( 'should prevent selected attribute to cell if selectionMode is %s', async function (selectionMode) {
				(element.selectionMode as any)= selectionMode;
				cell.click();
				await elementUpdated(element);
				expect(cell.hasAttribute('selected')).toEqual(false);
			});

			it('should remove selected attribute from selected clicked cell in single mode', async function () {
				element.selectionMode = DataGridSelectionMode.singleCell;

				cell.click();
				await elementUpdated(element);
				cell.click();
				await elementUpdated(element);

				expect(cell.hasAttribute('selected')).toEqual(false);
			});

			it.each([DataGridSelectionMode.singleCell, DataGridSelectionMode.multiCell])
			('should remove selected attribute if clicked other cell and selectionMode is %s', async function (selectionMode: string) {
				element.selectionMode = selectionMode as DataGridSelectionMode;

				cell.click();
				await elementUpdated(element);

				const otherCell = element.rowElements[2].children[1] as HTMLElement;
				otherCell.click();
				await elementUpdated(element);

				expect(cell.hasAttribute('selected')).toEqual(false);
				expect(otherCell.hasAttribute('selected')).toEqual(true);
			});

			it.each(['ctrlKey', 'shiftKey', 'metaKey'])
			('should leave selected attribute if clicked other cell with %s and selectionMode is multiCell',
				async function (activeKey: string) {
					element.selectionMode = DataGridSelectionMode.multiCell;

					cell.click();
					await elementUpdated(element);

					const otherCell = getRowCell(2,1);
					otherCell.dispatchEvent(new MouseEvent('click', { [activeKey]: true, bubbles: true, composed: true }));
					await elementUpdated(element);

					expect(cell.hasAttribute('selected')).toEqual(true);
					expect(otherCell.hasAttribute('selected')).toEqual(true);
				});

			it('should reset selection when selectionMode changes', async function () {
				element.selectionMode = DataGridSelectionMode.multiCell;

				cell.click();
				await elementUpdated(element);

				const otherCell = getRowCell(2,1);
				otherCell.dispatchEvent(new MouseEvent('click', { ctrlKey: true, bubbles: true, composed: true }));
				await elementUpdated(element);

				element.selectionMode = DataGridSelectionMode.singleCell;
				await elementUpdated(element);

				expect(cell.hasAttribute('selected')).toEqual(false);
				expect(otherCell.hasAttribute('selected')).toEqual(false);
			});

			it('should reset selection clicking a cell in multi-cell', async function () {
				element.selectionMode = DataGridSelectionMode.multiCell;

				cell.click();
				await elementUpdated(element);

				const otherCell = getRowCell(2,1);

				otherCell.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
				await elementUpdated(element);

				expect(cell.hasAttribute('selected')).toEqual(false);
				expect(otherCell.hasAttribute('selected')).toEqual(true);
			});

			it('should select only non-header cells', async function () {
				element.selectionMode = DataGridSelectionMode.multiCell;
				const headerCell = getRowCell(0, 1);
				headerCell.click();
				await elementUpdated(element);
				expect(headerCell.hasAttribute('selected')).toEqual(false);
			});
		});
	});
});

// TODO:: underline state
// TODO:: header cells design
// TODO:: row selection
// TODO:: aria-selected to selected rows
// TODO:: header cell with filter
// TODO:: header cell with sort
// TODO:: add sorting and filtering examples
// TODO:: add "manual" example
// TODO:: test keyboard navigation
// TODO:: add aria-multiselectable to grid if multi selection is enabled
// TODO:: add aria-selected to grid cells/rows only if selection is enabled
