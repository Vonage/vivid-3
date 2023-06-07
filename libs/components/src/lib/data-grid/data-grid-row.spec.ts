import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { html } from '@microsoft/fast-element';
import {elementUpdated, fixture, getBaseElement} from '@vivid-nx/shared';
import { designSystem } from '../../shared/design-system';
import { DataGridRow } from './data-grid-row';
import { DataGridRowTemplate } from './data-grid-row.template';

const dataGridRow = DataGridRow.compose<FoundationElementDefinition>({
	baseName: 'data-grid-row',
	template: DataGridRowTemplate as any
});

designSystem.withPrefix('vwc').register(dataGridRow());

const COMPONENT_TAG = 'vwc-data-grid-row';

describe('vwc-data-grid-row', () => {
	let element: DataGridRow;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as DataGridRow;
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
	});

	describe('rowType', () => {
		it('should reflect row-type', async () => {
			element.rowType = 'header';
			await elementUpdated(element);
			expect(element.getAttribute('row-type')).toEqual('header');
		});
	});

	describe('gridTemplateColumns', () => {
		it('should reflect grid-template-columns', async () => {
			element.gridTemplateColumns = '1fr 1fr 1fr';
			await elementUpdated(element);
			expect(element.getAttribute('grid-template-columns')).toEqual('1fr 1fr 1fr');
		});
	});

	describe('style', () => {
		it('should set grid-column on cells', async () => {
			element.columnDefinitions = [
				{ columnDataKey: 'name' },
				{ columnDataKey: 'age' }
			];
			await elementUpdated(element);
			const allHaveExpectedGridColumn = Array.from(element.querySelectorAll('undefined'))
				.reduce((acc, child, index) => {
					return acc && child.getAttribute('grid-column') === `${index + 1}`;
				}, true);
			expect(allHaveExpectedGridColumn).toBeTruthy();
		});
	});

	describe('columnDefinitions', () => {

		it('should render undefined cells if cells template undefined', async () => {
			element.columnDefinitions = [
				{ columnDataKey: 'name' },
				{ columnDataKey: 'age' }
			];
			await elementUpdated(element);
			expect(element.querySelectorAll('undefined').length).toEqual(2);
		});

	});

	describe('gridTemplateColumns', () => {
		it('should set "grid-template-columns" on base element according to gridTemplateColumns', async function () {

			element.gridTemplateColumns = '1fr 1fr 1fr';
			await elementUpdated(element);

			expect(getBaseElement(element).style['gridTemplateColumns']).toEqual('1fr 1fr 1fr');
		});
	});

	describe('cellItemTemplate and headerCellItemTemplate', () => {
		it('should render cells according to number of columns', async () => {
			const dataGridCellTagName = 'something-custom';
			element.columnDefinitions = [
				{ columnDataKey: 'name' },
				{ columnDataKey: 'age' }
			];
			element.cellItemTemplate = html`<${dataGridCellTagName}></${dataGridCellTagName}>`;
			await elementUpdated(element);
			expect(element.querySelectorAll(dataGridCellTagName).length).toEqual(2);
		});

		it('should render header cells according to number of columns', async () => {
			const dataGridCellTagName = 'something-custom';
			element.columnDefinitions = [
				{ columnDataKey: 'name', isRowHeader: true },
				{ columnDataKey: 'age' }
			];
			element.rowType = 'header';
			element.headerCellItemTemplate = html`<${dataGridCellTagName}></${dataGridCellTagName}>`;
			await elementUpdated(element);
			expect(element.querySelectorAll(dataGridCellTagName).length).toEqual(2);
		});
	});

	describe('row-focused event', () => {
		it('should fire the focused event when one of the cells is focused', async () => {
			const spy  = jest.fn();
			element.addEventListener('row-focused', spy);
			element.dispatchEvent(new FocusEvent('cell-focused'));
			expect(spy).toHaveBeenCalled();
		});
	});

	describe('keyboard events', () => {
		it('should move focus on arrow keys', async () => {
			const dataGridCellTagName = 'button';
			element.columnDefinitions = [
				{ columnDataKey: 'name' },
				{ columnDataKey: 'age' }
			];
			element.cellItemTemplate = html`<${dataGridCellTagName} role="cell"></${dataGridCellTagName}>`;
			await elementUpdated(element);
			const cells = Array.from(element.querySelectorAll(dataGridCellTagName));
			const focusedElementBeforeArrowKey = document.activeElement;
			const rowCellFocused = cells.includes(focusedElementBeforeArrowKey as any);

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
			const firstCellFocused = cells[0] === document.activeElement;

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
			const secondCellFocused = cells[1] === document.activeElement;

			element.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
			const firstCellFocusedAfterArrowLeft = cells[0] === document.activeElement;

			expect(rowCellFocused).toBeFalsy();
			expect(firstCellFocused).toBeTruthy();
			expect(secondCellFocused).toBeTruthy();
			expect(firstCellFocusedAfterArrowLeft).toBeTruthy();
		});

		it('should move focus edges on home or end keys press', async () => {
			const dataGridCellTagName = 'button';
			element.columnDefinitions = [
				{ columnDataKey: 'name' },
				{ columnDataKey: 'age' },
				{ columnDataKey: 'set' },
				{ columnDataKey: 'get' },
			];
			element.cellItemTemplate = html`<${dataGridCellTagName} role="cell"></${dataGridCellTagName}>`;
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
			expect(getBaseElement(element).classList.contains('selected')).toBeTruthy();
		});

		it('should remove selected class on base element when false', async function () {
			element.ariaSelected = 'true';
			await elementUpdated(element);
			element.ariaSelected = 'false';
			await elementUpdated(element);
			expect(getBaseElement(element).classList.contains('selected')).toBeFalsy();
		});
	});
});
