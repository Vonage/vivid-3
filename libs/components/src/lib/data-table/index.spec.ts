import { elementUpdated, fixture } from '@repo/shared';
import type { Table } from './table';
import type { TableBody } from './table-body';
import type { TableCell } from './table-cell';
import type { TableHead } from './table-head';
import type { TableHeaderCell } from './table-header-cell';
import type { TableRow } from './table-row';
import './index';

const COMPONENT_TAG = 'vwc-table';

describe('data table integration tests', () => {
	let element: Table;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Table;
	});

	describe('basic', () => {
		it('should register vwc-table, vwc-table-head, vwc-table-body, vwc-table-row, vwc-table-header-cell and vwc-table-cell', async () => {
			expect(customElements.get('vwc-table')).toBeTruthy();
			expect(customElements.get('vwc-table-head')).toBeTruthy();
			expect(customElements.get('vwc-table-body')).toBeTruthy();
			expect(customElements.get('vwc-table-row')).toBeTruthy();
			expect(customElements.get('vwc-table-header-cell')).toBeTruthy();
			expect(customElements.get('vwc-table-cell')).toBeTruthy();
		});
	});

	describe('structure', () => {
		it('should render complete table structure', async () => {
			element.innerHTML = `
				<vwc-table-head>
					<vwc-table-row>
						<vwc-table-header-cell>Column 1</vwc-table-header-cell>
						<vwc-table-header-cell>Column 2</vwc-table-header-cell>
					</vwc-table-row>
				</vwc-table-head>
				<vwc-table-body>
					<vwc-table-row>
						<vwc-table-cell>Data 11</vwc-table-cell>
						<vwc-table-cell>Data 12</vwc-table-cell>
					</vwc-table-row>
					<vwc-table-row>
						<vwc-table-cell>Data 21</vwc-table-cell>
						<vwc-table-cell>Data 22</vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
			`;
			await elementUpdated(element);

			const tableHead = element.querySelector('vwc-table-head') as TableHead;
			const tableBody = element.querySelector('vwc-table-body') as TableBody;
			const rows = element.querySelectorAll('vwc-table-row') as NodeListOf<TableRow>;
			const headerCells = element.querySelectorAll('vwc-table-header-cell') as NodeListOf<TableHeaderCell>;
			const cells = element.querySelectorAll('vwc-table-cell') as NodeListOf<TableCell>;

			expect(tableHead).toBeTruthy();
			expect(tableBody).toBeTruthy();
			expect(rows.length).toBe(3); // 1 header row + 2 data rows
			expect(headerCells.length).toBe(2);
			expect(cells.length).toBe(4); // 2 rows × 2 cells
		});

		it('should maintain proper component hierarchy', async () => {
			element.innerHTML = `
				<vwc-table-head>
					<vwc-table-row>
						<vwc-table-header-cell>Header</vwc-table-header-cell>
					</vwc-table-row>
				</vwc-table-head>
				<vwc-table-body>
					<vwc-table-row>
						<vwc-table-cell>Data</vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
			`;
			await elementUpdated(element);

			const tableHead = element.querySelector('vwc-table-head');
			const headerRow = tableHead?.querySelector('vwc-table-row');
			const headerCell = headerRow?.querySelector('vwc-table-header-cell');
			const tableBody = element.querySelector('vwc-table-body');
			const dataRow = tableBody?.querySelector('vwc-table-row');
			const dataCell = dataRow?.querySelector('vwc-table-cell');

			expect(headerCell).toBeTruthy();
			expect(dataCell).toBeTruthy();
			expect(headerCell?.textContent).toContain('Header');
			expect(dataCell?.textContent).toContain('Data');
		});

		it('should render multiple rows and cells correctly', async () => {
			element.innerHTML = `
				<vwc-table-head>
					<vwc-table-row>
						<vwc-table-header-cell>Col 1</vwc-table-header-cell>
						<vwc-table-header-cell>Col 2</vwc-table-header-cell>
						<vwc-table-header-cell>Col 3</vwc-table-header-cell>
					</vwc-table-row>
				</vwc-table-head>
				<vwc-table-body>
					<vwc-table-row>
						<vwc-table-cell>R1C1</vwc-table-cell>
						<vwc-table-cell>R1C2</vwc-table-cell>
						<vwc-table-cell>R1C3</vwc-table-cell>
					</vwc-table-row>
					<vwc-table-row>
						<vwc-table-cell>R2C1</vwc-table-cell>
						<vwc-table-cell>R2C2</vwc-table-cell>
						<vwc-table-cell>R2C3</vwc-table-cell>
					</vwc-table-row>
					<vwc-table-row>
						<vwc-table-cell>R3C1</vwc-table-cell>
						<vwc-table-cell>R3C2</vwc-table-cell>
						<vwc-table-cell>R3C3</vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
			`;
			await elementUpdated(element);

			const rows = element.querySelectorAll('vwc-table-row');
			const cells = element.querySelectorAll('vwc-table-cell');
			const headerCells = element.querySelectorAll('vwc-table-header-cell');

			expect(rows.length).toBe(4); // 1 header + 3 data rows
			expect(headerCells.length).toBe(3);
			expect(cells.length).toBe(9); // 3 rows × 3 cells
		});
	});
});

