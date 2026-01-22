import { elementUpdated, fixture } from '@repo/shared';
import { Table } from './table';
import '.';

const COMPONENT_TAG = 'vwc-table';

describe('vwc-table', () => {
	let element: Table;

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

		it('should have role="grid"', async () => {
			await elementUpdated(element);
			// The role="grid" is applied to the template element which becomes the host
			expect(element.getAttribute('role')).toBe('grid');
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
});
