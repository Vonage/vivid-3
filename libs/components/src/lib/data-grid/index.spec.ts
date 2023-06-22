import { elementUpdated, fixture } from '@vivid-nx/shared';
import type { DataGrid } from './data-grid';
import {DataGridSelectionMode} from './data-grid';
import './index';

const COMPONENT_TAG = 'vwc-data-grid';

describe('data grid integration tests', () => {
	function getRowCell(row: number, cell: number) {
		return element.rowElements[row].children[cell] as HTMLElement;
	}

	function getRow(row: number) {
		return element.rowElements[row] as HTMLElement;
	}
	let element: DataGrid;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DataGrid;
	});

	describe('basic', function () {
		it('should register vwc-data-grid, vwc-data-grid-row and vwc-data-grid-cell', async () => {
			expect(customElements.get('vwc-data-grid')).toBeTruthy();
			expect(customElements.get('vwc-data-grid-row')).toBeTruthy();
			expect(customElements.get('vwc-data-grid-cell')).toBeTruthy();
		});
	});

	describe('rows and columns rendering', function () {
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
	});

	describe('events', function () {
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
	});

	describe('selectionMode', function () {

		it('should remove aria-selected when "none" is set initially', async function () {
			element = (await fixture(
				`<${COMPONENT_TAG} selection-mode="none">
											<vwc-data-grid-row aria-selected="true">
												<vwc-data-grid-cell aria-selected="true">Cell 1</vwc-data-grid-cell>
												<vwc-data-grid-cell aria-selected="false">Cell 2</vwc-data-grid-cell>
											</vwc-data-grid-row>
											<vwc-data-grid-row aria-selected="false">
												<vwc-data-grid-cell aria-selected="true">Cell 1</vwc-data-grid-cell>
												<vwc-data-grid-cell aria-selected="false">Cell 2</vwc-data-grid-cell>
											</vwc-data-grid-row>
										</${COMPONENT_TAG}>`
			)) as DataGrid;
			await elementUpdated(element);
			const ariaSelectedExists = element.querySelectorAll('[aria-selected]').length > 0;
			expect(ariaSelectedExists).toEqual(false);
		});

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
			('should add aria-selected="false" to all cells if selectionMode is %s', async function (selectionMode: DataGridSelectionMode) {
				element.selectionMode = selectionMode;
				await elementUpdated(element);
				const allNoneHeaderCells = Array.from(element.querySelectorAll('[role="gridcell"]'));
				const allNoneHeaderCellsSelectable = allNoneHeaderCells.every(cell => cell.getAttribute('aria-selected') === 'false');
				expect(allNoneHeaderCellsSelectable).toEqual(true);
			});

			it('should remove aria-selected from all cells if set to "none"', async function () {
				element.selectionMode = DataGridSelectionMode.singleCell;
				await elementUpdated(element);

				element.selectionMode = DataGridSelectionMode.none;
				await elementUpdated(element);

				const allNonHeaderCells = Array.from(element.querySelectorAll('[role="gridcell"]'));
				const allNonHeaderCellsNotSelectable = allNonHeaderCells.every(cell => !cell.hasAttribute('aria-selected'));
				expect(allNonHeaderCellsNotSelectable).toEqual(true);
			});

			it('should remove aria-selected from all rows if set to "*-cell"', async function () {
				element.selectionMode = DataGridSelectionMode.singleRow;
				await elementUpdated(element);

				element.selectionMode = DataGridSelectionMode.singleCell;
				await elementUpdated(element);

				const allNonHeaderRows = Array.from(element.querySelectorAll('[role="row"]'));
				const allNonHeaderRowsNotSelectable = allNonHeaderRows.every(row => !row.hasAttribute('aria-selected'));
				expect(allNonHeaderRowsNotSelectable).toEqual(true);
			});

			it.each([DataGridSelectionMode.singleCell, DataGridSelectionMode.multiCell])
			('should add selected attribute to clicked cell if selection mode is %s', async function (selectionMode) {
				element.selectionMode = selectionMode;
				cell.click();
				await elementUpdated(element);
				expect(isElementSelected(cell)).toEqual(true);
			});

			it.each(['none', 'single-row', 'multi-row'])
			( 'should prevent selected attribute to cell if selectionMode is %s', async function (selectionMode) {
				(element.selectionMode as any)= selectionMode;
				cell.click();
				await elementUpdated(element);
				expect(isElementSelected(cell)).toEqual(false);
			});

			it('should remove selected attribute from selected clicked cell in single mode', async function () {
				element.selectionMode = DataGridSelectionMode.singleCell;

				cell.click();
				await elementUpdated(element);
				cell.click();
				await elementUpdated(element);

				expect(isElementSelected(cell)).toEqual(false);
			});

			it.each([DataGridSelectionMode.singleCell, DataGridSelectionMode.multiCell])
			('should remove selected attribute if clicked other cell and selectionMode is %s', async function (selectionMode: string) {
				element.selectionMode = selectionMode as DataGridSelectionMode;

				cell.click();
				await elementUpdated(element);

				const otherCell = element.rowElements[2].children[1] as HTMLElement;
				otherCell.click();
				await elementUpdated(element);

				expect(isElementSelected(cell)).toEqual(false);
				expect(isElementSelected(otherCell)).toEqual(true);
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

					expect(isElementSelected(cell)).toEqual(true);
					expect(isElementSelected(otherCell)).toEqual(true);
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

				expect(isElementSelected(cell)).toEqual(false);
				expect(isElementSelected(otherCell)).toEqual(false);
			});

			it('should reset selection clicking a cell in multi-cell', async function () {
				element.selectionMode = DataGridSelectionMode.multiCell;

				cell.click();
				await elementUpdated(element);

				const otherCell = getRowCell(2,1);

				otherCell.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true }));
				await elementUpdated(element);

				expect(isElementSelected(cell)).toEqual(false);
				expect(isElementSelected(otherCell)).toEqual(true);
			});

			it('should select only non-header cells', async function () {
				element.selectionMode = DataGridSelectionMode.multiCell;
				const headerCell = getRowCell(0, 1);
				headerCell.click();
				await elementUpdated(element);
				expect(isElementSelected(headerCell)).toEqual(false);
			});

			it('should select a cell on enter and space press', async function () {
				element.selectionMode = DataGridSelectionMode.multiCell;
				const cell1 = getRowCell(1, 1);
				const cell2 = getRowCell(2, 1);

				cell1.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: 'Enter', bubbles: true, composed: true }));
				cell2.dispatchEvent(new KeyboardEvent('keydown', { ctrlKey: true, key: ' ', bubbles: true, composed: true }));
				await elementUpdated(element);

				expect(isElementSelected(cell1)).toEqual(true);
				expect(isElementSelected(cell2)).toEqual(true);
			});

			it('should leave aria-selected value to cells with aria-selected on init', async function () {
				element = (await fixture(
					`<${COMPONENT_TAG} selection-mode="single-cell">
											<vwc-data-grid-row>
												<vwc-data-grid-cell aria-selected="true">Cell 1</vwc-data-grid-cell>
												<vwc-data-grid-cell>Cell 2</vwc-data-grid-cell>
											</vwc-data-grid-row>
										</${COMPONENT_TAG}>`
				)) as DataGrid;
				await elementUpdated(element);
				const cell = element.querySelector('vwc-data-grid-cell') as HTMLElement;
				expect(cell.getAttribute('aria-selected')).toEqual('true');
			});
		});

		describe('row selection', () => {
			beforeEach(async function () {
				element.rowsData = [
					{ id: 1, name: 'John', age: 20 },
					{ id: 2, name: 'Jane', age: 21 },
				];
				await elementUpdated(element);
				await elementUpdated(element);
			});

			it('should remove aria-selected from all rows if set to "none"', async function () {
				element.selectionMode = DataGridSelectionMode.multiRow;
				await elementUpdated(element);

				element.selectionMode = DataGridSelectionMode.none;
				await elementUpdated(element);

				const allNoneHeaderRows = Array.from(element.querySelectorAll('[role="row"]'));
				const allNonHeaderRowsNotSelectable = allNoneHeaderRows.every(row => !row.hasAttribute('aria-selected'));
				expect(allNonHeaderRowsNotSelectable).toEqual(true);
			});

			it('should remove aria-selected from all cells if set to "*-row"', async function () {
				element.selectionMode = DataGridSelectionMode.singleCell;
				await elementUpdated(element);

				element.selectionMode = DataGridSelectionMode.multiRow;
				await elementUpdated(element);

				const allNonHeaderCells = Array.from(element.querySelectorAll('[role="gridcell"]'));
				const allNonHeaderCellsNotSelectable = allNonHeaderCells.every(cell => !cell.hasAttribute('aria-selected'));
				expect(allNonHeaderCellsNotSelectable).toEqual(true);
			});

			it.each([DataGridSelectionMode.singleRow, DataGridSelectionMode.multiRow])
			('should set aria-selected="false" on all non header rows if selectionMode is %s',
				async function (selectionMode: DataGridSelectionMode) {
					element.selectionMode = selectionMode;
					await elementUpdated(element);
					const allNonHeaderRows = element.querySelectorAll('[role="row"]');
					const allNonHeaderRowsHaveSelectedFalse = Array.from(allNonHeaderRows).every((row) => {
						return row.getAttribute('aria-selected') === 'false';
					});
					expect(allNonHeaderRowsHaveSelectedFalse).toEqual(true);
				});

			it('should set aria-selected="true" on clicked row', async function () {
				element.selectionMode = DataGridSelectionMode.singleRow;
				const cell = getRowCell(1, 0);
				const row = getRow(1);
				cell.click();
				await elementUpdated(element);
				expect(row.getAttribute('aria-selected')).toEqual('true');
			});

			it('should set aria-selected="true" on clicked row and remove from other rows', async function () {
				element.selectionMode = DataGridSelectionMode.singleRow;
				const row1 = getRow(1);
				const cellInRow1 = getRowCell(1, 0);
				const row2 = getRow(2);
				const cellInRow2 = getRowCell(2, 0);

				cellInRow1.click();
				await elementUpdated(element);
				cellInRow2.click();
				await elementUpdated(element);

				expect(row1.getAttribute('aria-selected')).toEqual('false');
				expect(row2.getAttribute('aria-selected')).toEqual('true');
			});

			it.each(['ctrlKey', 'shiftKey', 'metaKey'])
			('should set aria-selected="true" to all clicked rows in "multi-row" state and %s key pressed',
				function (activeKey) {
					element.selectionMode = DataGridSelectionMode.multiRow;
					const row1 = getRow(1);
					const cellInRow1 = getRowCell(1, 0);
					const row2 = getRow(2);
					const cellInRow2 = getRowCell(2, 0);

					cellInRow1.click();
					cellInRow2.dispatchEvent(new MouseEvent('click', { [activeKey]: true, bubbles: true, composed: true }));

					expect(row1.getAttribute('aria-selected')).toEqual('true');
					expect(row2.getAttribute('aria-selected')).toEqual('true');
				});

			it('should leave aria-selected value to rows on init', async function () {
				element = (await fixture(
					`<${COMPONENT_TAG} selection-mode="single-row">
											<vwc-data-grid-row aria-selected="true">
												<vwc-data-grid-cell>Cell 1</vwc-data-grid-cell>
												<vwc-data-grid-cell>Cell 2</vwc-data-grid-cell>
											</vwc-data-grid-row>
										</${COMPONENT_TAG}>`
				)) as DataGrid;
				await elementUpdated(element);
				const row = element.querySelector('vwc-data-grid-row') as HTMLElement;
				expect(row.getAttribute('aria-selected')).toEqual('true');
			});
		});
	});

});

function isElementSelected(element: HTMLElement): boolean {
	return element.getAttribute('aria-selected') === 'true';
}

// TODO:: add "manual" example + remove "grid-column" if `undefined`
// TODO:: header cells design - sort and filter variants
// TODO:: header cell with filter
// TODO:: header cell with sort
// TODO:: add sorting and filtering examples
// TODO:: test keyboard navigation
