import { html, ViewTemplate } from '@microsoft/fast-element';
import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { DataGrid, DataGridSelectionMode } from './data-grid';
import '.';
import { DataGridRow } from './data-grid-row.ts';

const COMPONENT_TAG = 'vwc-data-grid';

function setMockRows(element: DataGrid) {
	element.rowElementTag = 'div';
	element.rowItemTemplate = html`
			<${element.rowElementTag} role="row">
				<button class="first" role="cell"/><button class="second" role="cell"/>
			</${element.rowElementTag}>`;
}

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
			expect(element.rowElementTag).toBe('vwc-data-grid-row');
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
				{ columnDataKey: 'id', gridColumn: '0' },
				{ columnDataKey: 'name', gridColumn: '1' },
			];
			element.rowsData = [{ id: '1', name: 'Person 1' }];
			expect(element.columnDefinitions).toEqual(expectedColumnDef);
		});
	});

	describe('generateColumns', () => {
		it('should generate column definitions according to rowData', async () => {
			const rowData = {
				id: '1',
				name: 'Person 1',
				age: 20,
				'address.city': 'City 1',
			};

			const expectedColumnDef = [
				{ columnDataKey: 'id', gridColumn: '0' },
				{ columnDataKey: 'name', gridColumn: '1' },
				{ columnDataKey: 'age', gridColumn: '2' },
				{ columnDataKey: 'address.city', gridColumn: '3' },
			];

			expect(DataGrid.generateColumns(rowData)).toEqual(expectedColumnDef);
		});

		it('should omit non-enumerable properties from columnDefs', function () {
			const rowData = {
				id: '1',
				name: 'Person 1',
				age: 20,
				'address.city': 'City 1',
			};
			Object.defineProperty(rowData, 'nonEnumerable', {
				value: '80,000$',
				enumerable: false,
			});
			const expectedColumnDef = [
				{ columnDataKey: 'id', gridColumn: '0' },
				{ columnDataKey: 'name', gridColumn: '1' },
				{ columnDataKey: 'age', gridColumn: '2' },
				{ columnDataKey: 'address.city', gridColumn: '3' },
			];

			expect(DataGrid.generateColumns(rowData)).toEqual(expectedColumnDef);
		});
	});
	describe('generateHeader', () => {
		const getGeneratedHeader = () =>
			element.querySelector('[row-type$="header"]') as DataGridRow | null;

		beforeEach(async () => {
			element.gridTemplateColumns = '1fr 25px';
			element.rowsData = [
				{ id: '1', name: 'Person 1' },
				{ id: '2', name: 'Person 2' },
			];
			await elementUpdated(element);
		});
		it('should generate the header row with columnDefinition', async () => {
			expect(getGeneratedHeader()!.columnDefinitions).toEqual(
				element.columnDefinitions
			);
		});

		it('should generate the header row with gridTemplateColumns', async () => {
			expect(getGeneratedHeader()!.gridTemplateColumns).toBe(
				element.gridTemplateColumns
			);
		});

		it('should generate the header row with sticky', async () => {
			const generatedHeaderRowTypeBeforeSticky = getGeneratedHeader()!.rowType;
			element.generateHeader = 'sticky';
			await elementUpdated(element);
			expect(generatedHeaderRowTypeBeforeSticky).toEqual('header');
			expect(getGeneratedHeader()!.rowType).toEqual('sticky-header');
		});

		it('should replace existing header if already rendered', async () => {
			const generatedHeader = getGeneratedHeader();
			element.generateHeader = 'sticky';
			await elementUpdated(element);
			expect(document.body.contains(generatedHeader)).toBeFalsy();
			expect(getGeneratedHeader()).toBeTruthy();
		});

		it('should remove the header row completely if generateHeader is none', async () => {
			element.generateHeader = 'none';
			expect(getGeneratedHeader()).toBeNull();
		});
	});

	describe('gridTemplateColumns', () => {
		it('should set gridTemplateColumns on all rows', async function () {
			const rowElementTag = 'vwc-data-grid-row';

			element.rowElementTag = rowElementTag;
			element.rowItemTemplate = html`
			<${rowElementTag} role="row"></${rowElementTag}>`;
			element.rowsData = [
				{ id: '1', name: 'Person 1' },
				{ id: '2', name: 'Person 2' },
			];
			element.gridTemplateColumns = '1fr 25px';

			await elementUpdated(element);
			await elementUpdated(element);

			const rows = Array.from(element.querySelectorAll('[role="row"]') as any);
			const allRowsHaveSameGridColumnTemplate = rows.reduce((acc, row: any) => {
				return acc && row.gridTemplateColumns === '1fr 25px';
			});
			expect(allRowsHaveSameGridColumnTemplate).toEqual(true);
		});
	});

	describe('columnDefinitions', () => {
		it('should toggle generated header', async () => {
			const rowElementTag = 'vwc-data-grid-row';

			element.rowElementTag = rowElementTag;
			element.columnDefinitions = [
				{ columnDataKey: 'id', title: 'Column 1' },
				{ columnDataKey: 'name', title: 'Column 2' },
			];

			const generatedHeader = element.querySelector(rowElementTag) as any;
			expect(generatedHeader.rowType).toBe('header');
		});

		it('should set index, gridTemplateColumns and column definition on the row elements', async () => {
			const rowElementTag = 'vwc-data-grid-row';

			element.rowElementTag = rowElementTag;
			element.rowItemTemplate = html`<${rowElementTag} role="row"></${rowElementTag}>`;
			const columnDefinitions = [
				{ columnDataKey: 'id', gridColumn: '3' },
				{ columnDataKey: 'name', gridColumn: '5' },
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
				expect(row.gridTemplateColumns).toEqual(
					element.rowsData.reduce(
						(acc: string, _, index) => acc + (index > 0 ? ' 1fr' : '1fr'),
						''
					)
				);
			});
		});
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
			expect(element.querySelectorAll(rowTag).length).toEqual(
				element.rowsData.length
			);
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
			const expectedFocsedCell = Array.from(
				element.querySelectorAll(element.rowElementTag)
			)
				.at(-1)
				?.querySelector('button');
			element.focusRowIndex = 2;
			await elementUpdated(element);
			expect(expectedFocsedCell).toEqual(document.activeElement);
		});
	});

	describe('focusColumnIndex', () => {
		it('should change the focused cell in selected row', async () => {
			setMockRows(element);
			element.generateHeader = 'none';
			element.rowsData = [
				{ id: '1', name: 'Person 1' },
				{ id: '2', name: 'Person 2' },
			];
			await elementUpdated(element);
			const expectedFocsedCell = Array.from(
				element.querySelectorAll(element.rowElementTag)
			)
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
			expect(element.getAttribute('selection-mode')).toEqual(
				DataGridSelectionMode.singleRow
			);
		});

		it('should init without aria-multiselectable', async function () {
			expect(element.hasAttribute('aria-multiselectable')).toEqual(false);
		});

		it.each([DataGridSelectionMode.multiCell, DataGridSelectionMode.multiRow])(
			'should set aria-multiselectable="true" when multiple mode is selected',
			async (selectionMode) => {
				element.selectionMode = selectionMode;
				await elementUpdated(element);
				expect(element.getAttribute('aria-multiselectable')).toEqual('true');
			}
		);

		it.each([
			DataGridSelectionMode.singleCell,
			DataGridSelectionMode.singleRow,
		])(
			'should set aria-multiselectable="false" when single mode is selected',
			async (selectionMode) => {
				element.selectionMode = selectionMode;
				await elementUpdated(element);
				expect(element.getAttribute('aria-multiselectable')).toEqual('false');
			}
		);

		it('should remove aria-multiselectable when selectionMode is "none"', async function () {
			element.setAttribute('aria-multiselectable', 'true');
			element.selectionMode = DataGridSelectionMode.none;
			await elementUpdated(element);
			expect(element.hasAttribute('aria-multiselectable')).toEqual(false);
		});
	});

	describe('rowElements', () => {
		it('should return all row elements', async () => {
			setMockRows(element);
			element.rowsData = [
				{ id: '1', name: 'Person 1' },
				{ id: '2', name: 'Person 2' },
			];
			await elementUpdated(element);
			const expected = Array.from(
				element.querySelectorAll(element.rowElementTag)
			);
			expected.splice(0, 1);
			expect(element.rowElements).toEqual(expected);
		});
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			element.rowsData = [
				{ id: '1', name: 'Person 1' },
				{ id: '2', name: 'Person 2' },
			];
			await elementUpdated(element);
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
