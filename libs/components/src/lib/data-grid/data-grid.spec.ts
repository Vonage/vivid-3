import type { FoundationElementDefinition } from '@microsoft/fast-foundation';
import { html, ViewTemplate } from '@microsoft/fast-element';
import { elementUpdated, fixture } from '@vivid-nx/shared';
import { designSystem } from '../../shared/design-system';
import {DataGrid, DataGridSelectionMode} from './data-grid';
import { DataGridTemplate } from './data-grid.template';


const dataGrid = DataGrid.compose<FoundationElementDefinition>({
	baseName: 'data-grid',
	template: DataGridTemplate as any
});

designSystem.withPrefix('vwc').register(dataGrid());

const COMPONENT_TAG = 'vwc-data-grid';

describe('vwc-data-grid', () => {
	let element: DataGrid;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as DataGrid;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-data-grid', async () => {
			expect(element).toBeInstanceOf(DataGrid);
			expect(element.noTabbing).toEqual(false);
			expect(element.generateHeader).toEqual('default');
			expect(element.gridTemplateColumns).toBeUndefined();
			expect(element.rowsData).toEqual([]);
			expect(element.columnDefinitions).toEqual(null);
			expect(element.rowItemTemplate instanceof ViewTemplate).toBeTruthy();
			expect(element.cellItemTemplate).toBeUndefined();
			expect(element.headerCellItemTemplate).toBeUndefined();
			expect(element.focusRowIndex).toEqual(0);
			expect(element.focusColumnIndex).toEqual(0);
			expect(element.rowElementTag).toBeUndefined();
			expect(element.selectionMode).toBeUndefined();
		});
	});

	describe('noTabbing', () => {
		it('should have a tabIndex of -1 when no-tabbing is true', async () => {
			element.noTabbing = true;

			expect(element.getAttribute('tabindex')).toEqual('-1');
		});

		it('should have a tabIndex of -1 when noTabbing is true', async () => {
			element.toggleAttribute('no-tabbing', true);

			expect(element.getAttribute('tabindex')).toEqual('-1');
		});
	});

	describe('rowsData', () => {
		it('should generate column definitions when set', async () => {
			const expectedColumnDef = [
				{'columnDataKey': 'id', 'gridColumn': '0'}, {'columnDataKey': 'name', 'gridColumn': '1'}
			];
			element.rowsData = [{ id: '1', name: 'Person 1' }];
			expect(element.columnDefinitions).toEqual(expectedColumnDef);
		});

		it('should toggle generated header', async () => {
			const rowElementTag = 'vwc-data-grid-row';

			element.rowElementTag = rowElementTag;
			element.rowsData = [{ id: '1', name: 'Person 1' }];
			const generatedHeader = element.querySelector(rowElementTag) as any;

			element.rowsData = [{ id: '2', name: 'Person 2' }];
			expect(generatedHeader !== element.querySelector(rowElementTag)).toBeTruthy();
		});
	});

	describe('generateHeader', () => {
		const rowElementTag = 'vwc-data-grid-row';
		let generatedHeader: any;

		beforeEach(async () => {
			element.rowElementTag = rowElementTag;
			element.rowsData = [
				{ id: '1', name: 'Person 1' },
				{ id: '2', name: 'Person 2' },
			];
			await elementUpdated(element);
			generatedHeader = element.querySelector(rowElementTag) as any;
		});
		it('should generate the header row with columnDefinition', async () => {
			expect(generatedHeader.columnDefinitions).toEqual(element.columnDefinitions);
		});

		it('should generate the header row with gridTemplateColumns', async () => {
			expect(generatedHeader.gridTemplateColumns).toEqual(element.gridTemplateColumns);
		});

		it('should generate the header row with sticky', async () => {
			const generatedHeaderRowTypeBeforeSticky = generatedHeader.rowType;
			element.generateHeader = 'sticky';
			generatedHeader = element.querySelector(rowElementTag) as any;
			expect(generatedHeaderRowTypeBeforeSticky).toEqual('header');
			expect(generatedHeader.rowType).toEqual('sticky-header');
		});

		it('should replace existing header if already rendered', async () => {
			element.generateHeader = 'sticky';
			expect(document.body.contains(generatedHeader)).toBeFalsy();
			expect(element.querySelector(rowElementTag)).toBeTruthy();
		});

		it('should remove the header row completely if generateHeader is none', async () => {
			element.generateHeader = 'none';
			expect(element.querySelector(rowElementTag)).toBeNull();
		});
	});

	describe('columnDefinitions', () => {
		it('should set index, gridTemplateColumns and column definition on the row elements', async () => {
			const rowElementTag = 'vwc-data-grid-row';

			element.rowElementTag = rowElementTag;
			element.rowItemTemplate = html`<${rowElementTag} role="row"></${rowElementTag}>`;
			const columnDefinitions = [
				{'columnDataKey': 'id', 'gridColumn': '3'}, {'columnDataKey': 'name', 'gridColumn': '5'}
			];
			element.columnDefinitions = columnDefinitions;
			element.rowsData = [
				{ id: '1', name: 'Person 1' },
				{ id: '2', name: 'Person 2' },
			];

			await elementUpdated(element);
			await elementUpdated(element);

			const rows = element.querySelectorAll('[role="row"]') as any;

			rows.forEach((row: any, index: number) => {
				expect(row.columnDefinitions).toEqual(columnDefinitions);
				expect(row.rowIndex).toEqual(index);
				expect(row.gridTemplateColumns)
					.toEqual(element.rowsData.reduce((acc: string, _, index) => acc + (index > 0 ? ' 1fr' : '1fr'), ''));
			});

		});

		// TODO::similar test should pass when the DOM elements mutate
	});

	describe('rowItemTemplate', () => {
		it('should use the given row template', async () => {
			const rowTag = 'just-for-test';
			element.rowItemTemplate = html`<${rowTag} role="row"></${rowTag}>`;
			element.rowsData = [
				{ id: '1', name: 'Person 1' },
				{ id: '2', name: 'Person 2' },
				{ id: '2', name: 'Person 2' },
				{ id: '2', name: 'Person 2' },
			];
			await elementUpdated(element);
			expect(element.querySelectorAll(rowTag).length).toEqual(element.rowsData.length);
		});
	});

	describe('focusRowIndex', () => {
		it('should set the focused cell', async () => {
			element.rowElementTag = 'div';
			element.rowItemTemplate = html`
			<${element.rowElementTag} role="row">
				<button class="first" role="cell"/><button class="second" role="cell"/>
			</${element.rowElementTag}>`;
			element.generateHeader = 'none';
			element.rowsData = [
				{ id: '1', name: 'Person 1' },
				{ id: '2', name: 'Person 2' },
			];
			await elementUpdated(element);
			const expectedFocsedCell = Array.from(element.querySelectorAll(element.rowElementTag))
				.at(-1)
				?.querySelector('button');
			element.focusRowIndex = 2;
			await elementUpdated(element);
			expect(expectedFocsedCell).toEqual(document.activeElement);
		});
	});

	describe('focusColumnIndex', () => {
		it('should change the focused cell in selected row', async () => {
			element.rowElementTag = 'div';
			element.rowItemTemplate = html`
			<${element.rowElementTag} role="row">
				<button class="first" role="cell"/><button class="second" role="cell"/>
			</${element.rowElementTag}>`;
			element.generateHeader = 'none';
			element.rowsData = [
				{ id: '1', name: 'Person 1' },
				{ id: '2', name: 'Person 2' },
			];
			await elementUpdated(element);
			const expectedFocsedCell = Array.from(element.querySelectorAll(element.rowElementTag))
				.at(-1)
				?.querySelector('.second');
			element.focusRowIndex = 2;
			element.focusColumnIndex = 2;
			await elementUpdated(element);
			expect(expectedFocsedCell).toEqual(document.activeElement);
		});
	});

	describe('rowElementTag', () => {

		it('should use rowElementTag for the header row element', async () => {
			const rowElementTag = 'just-for-test';
			element.rowElementTag = rowElementTag;
			element.rowsData = [
				{ id: '1', name: 'Person 1' },
				{ id: '2', name: 'Person 2' },
			];
			await elementUpdated(element);
			expect(element.querySelectorAll(rowElementTag).length).toEqual(1);
		});
	});

	describe('selectionMode', () => {
		it('should reflect selectionMode', async () => {
			element.selectionMode = DataGridSelectionMode.singleRow;
			await elementUpdated(element);
			expect(element.getAttribute('selection-mode')).toEqual(DataGridSelectionMode.singleRow);
		});
	});

	describe('rowElements', () => {
		// TODO::test rowElements
	});
});
