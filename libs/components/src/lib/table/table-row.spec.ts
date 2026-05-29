import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import { TableRow } from './table-row';
import '.';

const COMPONENT_TAG = 'vwc-table-row';

describe('Table row', () => {
	let element: TableRow;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TableRow;
	});

	describe('when the component is set up', () => {
		it('is a table row component', async () => {
			expect(element).toBeInstanceOf(TableRow);
		});

		it('can be created in the DOM', () => {
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('when rendering', () => {
		it('shows the content you put inside its cells', async () => {
			element.innerHTML = '<vwc-table-cell>Cell 1</vwc-table-cell>';
			await elementUpdated(element);
			const cell = element.querySelector('vwc-table-cell');
			expect(cell).toBeTruthy();
			expect(cell?.textContent).toContain('Cell 1');
		});

		it('has role="row" so screen readers know it is a row', async () => {
			await elementUpdated(element);
			expect(element.getAttribute('role')).toBe('row');
		});

		it('can display multiple cells in one row', async () => {
			element.innerHTML = `
				<vwc-table-cell>Cell 1</vwc-table-cell>
				<vwc-table-cell>Cell 2</vwc-table-cell>
				<vwc-table-cell>Cell 3</vwc-table-cell>
			`;
			await elementUpdated(element);
			const cells = element.querySelectorAll('vwc-table-cell');
			expect(cells.length).toBe(3);
		});
	});
});
