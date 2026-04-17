import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import { Table } from './table';
import '.';

const COMPONENT_TAG = 'vwc-table';

describe('Table', () => {
	let element: Table;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Table;
	});

	describe('when the table is set up', () => {
		it('is a table component', async () => {
			expect(element).toBeInstanceOf(Table);
		});

		it('can be created in the DOM', () => {
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});

		it('has role="table" so screen readers recognize it as a table', async () => {
			await elementUpdated(element);
			expect(element.getAttribute('role')).toBe('table');
		});

		it('shows a head and body when you put them inside it', async () => {
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
			expect(element.querySelector('vwc-table-head')).toBeTruthy();
			expect(element.querySelector('vwc-table-body')).toBeTruthy();
		});

		it('shows whatever content you put inside it', async () => {
			element.innerHTML = '<div>Test content</div>';
			await elementUpdated(element);
			expect(element.textContent).toContain('Test content');
		});
	});
});
