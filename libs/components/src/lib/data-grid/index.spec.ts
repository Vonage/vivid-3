import { elementUpdated, fixture } from '@vivid-nx/shared';
import type { DataGrid } from './data-grid';
import './index';

const COMPONENT_TAG = 'vwc-data-grid';
//TODO::tagfor is hard coded and does not allow extension of the template!!!

describe('data grid', () => {

	async function clearRowsData() {
		element.rowsData = [];
		await elementUpdated(element);
		await elementUpdated(element);
	}
	async function setRowsData() {
		element.rowsData = [
			{id: '1', name: 'Person 1'},
			{id: '2', name: 'Person 2'},
		];
		await elementUpdated(element);
		await elementUpdated(element);
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
		await setRowsData();
		element.rowElements[0].children[0].dispatchEvent(new Event('focusin'));
		expect(spy).toHaveBeenCalled();
	});

	it('should fire row-focused event', async function () {
		const spy = jest.fn();

		element.addEventListener('row-focused', spy);
		await setRowsData();
		element.rowElements[0].children[0].dispatchEvent(new Event('focusin'));
		expect(spy).toHaveBeenCalled();
	});

	describe('focus', function () {

		function getExpectedFocusedCell() {
			const expectedFocusedCell = Array.from(element.querySelectorAll(`${COMPONENT_TAG}-row`))
				.at(1)
				?.querySelector(`${COMPONENT_TAG}-cell`);
			return expectedFocusedCell;
		}

		it('should focus on first row after resetting the data', async function () {
			await setRowsData();
			element.focusRowIndex = 2;
			element.dispatchEvent(new FocusEvent('focus'));
			await clearRowsData();
			element.dispatchEvent(new FocusEvent('focus'));
			await setRowsData();
			element.dispatchEvent(new FocusEvent('focus'));
			const expectedFocusedCell = getExpectedFocusedCell();
			expect(expectedFocusedCell?.innerHTML).toEqual(document.activeElement?.innerHTML);
		});

		it('should focus on first row after header', async function () {
			element.generateHeader = 'default';
			await setRowsData();
			const expectedFocusedCell = getExpectedFocusedCell();

			element.dispatchEvent(new FocusEvent('focus'));

			expect(expectedFocusedCell?.innerHTML).toEqual(document.activeElement?.innerHTML);
		});
	});

});
