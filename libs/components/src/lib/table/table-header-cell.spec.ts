import { elementUpdated, fixture } from '@repo/shared';
import { TableHeaderCell } from './table-header-cell';
import '.';

const COMPONENT_TAG = 'vwc-table-header-cell';

describe('Table header cell', () => {
	let element: TableHeaderCell;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TableHeaderCell;
	});

	describe('when the component is set up', () => {
		it('is a table header cell component', async () => {
			expect(element).toBeInstanceOf(TableHeaderCell);
		});

		it('can be created in the DOM', () => {
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('when rendering', () => {
		it('shows the content you put inside it', async () => {
			element.textContent = 'Test header content';
			await elementUpdated(element);
			expect(element.textContent).toContain('Test header content');
		});

		it('has role="rowheader" by default so screen readers know it is a row header', async () => {
			await elementUpdated(element);
			expect(element.getAttribute('role')).toBe('rowheader');
		});

		describe('when used as a column header inside a table head', () => {
			beforeEach(async () => {
				const div = (await fixture(`
					<vwc-table>
						<vwc-table-head>
							<vwc-table-row>
								<${COMPONENT_TAG}>Header content</${COMPONENT_TAG}>
							</vwc-table-row>
						</vwc-table-head>
					</vwc-table>
				`)) as any;
				element = div.querySelector(COMPONENT_TAG) as TableHeaderCell;
			});

			it('has role="columnheader" so screen readers know it is a column header', async () => {
				await elementUpdated(element);
				expect(element.getAttribute('role')).toBe('columnheader');
			});
		});
	});
});
