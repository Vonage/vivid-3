import { elementUpdated, fixture } from '@repo/shared';
import { Table } from './table';
import '.';

const COMPONENT_TAG = 'vwc-table';

describe('vwc-table', () => {
	let element: Table;

	const pressKey = (key: string, options?: KeyboardEventInit) => {
		document.activeElement?.dispatchEvent(
			new KeyboardEvent('keydown', {
				key,
				cancelable: true,
				bubbles: true,
				...options,
			})
		);
	};

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Table;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-table', async () => {
			expect(element).toBeInstanceOf(Table);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});

		it('should have role="table"', async () => {
			await elementUpdated(element);
			// The role="table" is applied to the template element which becomes the host
			expect(element.getAttribute('role')).toBe('table');
		});
	});

	describe('structure', () => {
		it('should render table-head and table-body in slots', async () => {
			element.innerHTML = `
				<vwc-table-head>
					<vwc-table-row>
						<vwc-table-header-cell>Header 1</vwc-table-header-cell>
					</vwc-table-row>
				</vwc-table-head>
				<vwc-table-body>
					<vwc-table-row>
						<vwc-table-cell>Data 1</vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
			`;
			await elementUpdated(element);

			const tableHead = element.querySelector('vwc-table-head');
			const tableBody = element.querySelector('vwc-table-body');
			expect(tableHead).toBeTruthy();
			expect(tableBody).toBeTruthy();
		});

		it('should render slot content', async () => {
			element.innerHTML = '<div>Test content</div>';
			await elementUpdated(element);
			expect(element.textContent).toContain('Test content');
		});
	});

	describe('keyboard navigation', () => {
		beforeEach(async () => {
			element.innerHTML = `
				<vwc-table-head>
					<vwc-table-row>
						<vwc-table-header-cell>Header 1</vwc-table-header-cell>
						<vwc-table-header-cell>Header 2</vwc-table-header-cell>
					</vwc-table-row>
				</vwc-table-head>
				<vwc-table-body>
					<vwc-table-row>
						<vwc-table-cell>Row 1 Cell 1</vwc-table-cell>
						<vwc-table-cell>Row 1 Cell 2</vwc-table-cell>
					</vwc-table-row>
					<vwc-table-row>
						<vwc-table-cell>Row 2 Cell 1</vwc-table-cell>
						<vwc-table-cell>Row 2 Cell 2</vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
			`;
			await elementUpdated(element);
		});

		it('should move focus between cells with arrow keys', () => {
			const rows = Array.from(element.querySelectorAll('vwc-table-row'));
			const row0Cells = Array.from(
				rows[0].querySelectorAll('vwc-table-header-cell, vwc-table-cell')
			) as HTMLElement[];
			const row1Cells = Array.from(
				rows[1].querySelectorAll('vwc-table-header-cell, vwc-table-cell')
			) as HTMLElement[];

			element.focus();
			expect(document.activeElement).toBe(row0Cells[0]);

			pressKey('ArrowRight');
			expect(document.activeElement).toBe(row0Cells[1]);

			pressKey('ArrowDown');
			expect(document.activeElement).toBe(row1Cells[1]);

			pressKey('ArrowLeft');
			expect(document.activeElement).toBe(row1Cells[0]);

			pressKey('ArrowUp');
			expect(document.activeElement).toBe(row0Cells[0]);
		});

		it('should support Home/End navigation', () => {
			const rows = Array.from(element.querySelectorAll('vwc-table-row'));
			const row0Cells = Array.from(
				rows[0].querySelectorAll('vwc-table-header-cell, vwc-table-cell')
			) as HTMLElement[];
			const row2Cells = Array.from(
				rows[2].querySelectorAll('vwc-table-header-cell, vwc-table-cell')
			) as HTMLElement[];

			element.focus();
			pressKey('End');
			expect(document.activeElement).toBe(row0Cells[1]);

			pressKey('End', { ctrlKey: true });
			expect(document.activeElement).toBe(row2Cells[1]);

			pressKey('Home');
			expect(document.activeElement).toBe(row2Cells[0]);

			pressKey('Home', { ctrlKey: true });
			expect(document.activeElement).toBe(row0Cells[0]);
		});

		it('should not override arrow keys for textbox-like controls inside a cell', () => {
			const inputTable = document.createElement('vwc-table') as Table;
			inputTable.innerHTML = `
				<vwc-table-body>
					<vwc-table-row>
						<vwc-table-cell><input id="cell-input" value="Action" /></vwc-table-cell>
						<vwc-table-cell>Second cell</vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
			`;
			document.body.append(inputTable);

			const input = inputTable.querySelector('#cell-input') as HTMLInputElement;
			input.focus();
			pressKey('ArrowRight');

			expect(document.activeElement).toBe(input);
			inputTable.remove();
		});

		it('should allow arrow navigation when focus is on links inside a cell', () => {
			const linkTable = document.createElement('vwc-table') as Table;
			linkTable.innerHTML = `
				<vwc-table-body>
					<vwc-table-row>
						<vwc-table-cell><a href="#first" id="cell-link">First</a></vwc-table-cell>
						<vwc-table-cell>Second cell</vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
			`;
			document.body.append(linkTable);

			const link = linkTable.querySelector('#cell-link') as HTMLAnchorElement;
			const cells = Array.from(linkTable.querySelectorAll('vwc-table-cell'));
			link.focus();
			pressKey('ArrowRight');

			expect(document.activeElement).toBe(cells[1]);
			linkTable.remove();
		});
	});
});
