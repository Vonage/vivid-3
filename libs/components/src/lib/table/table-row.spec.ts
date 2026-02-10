import { elementUpdated, fixture } from '@repo/shared';
import { TableRow } from './table-row';
import '.';

const COMPONENT_TAG = 'vwc-table-row';

describe('vwc-table-row', () => {
	let element: TableRow;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TableRow;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-table-row', async () => {
			expect(element).toBeInstanceOf(TableRow);
		});

		it('should allow being created via createElement', () => {
			// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
			// This is because only createElement performs checks for custom element constructor requirements
			// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('rendering', () => {
		it('should render slot content', async () => {
			element.innerHTML = '<vwc-table-cell>Cell 1</vwc-table-cell>';
			await elementUpdated(element);
			const cell = element.querySelector('vwc-table-cell');
			expect(cell).toBeTruthy();
			expect(cell?.textContent).toContain('Cell 1');
		});

		it('should have role="row"', async () => {
			await elementUpdated(element);
			expect(element.getAttribute('role')).toBe('row');
		});

		it('should render multiple cells', async () => {
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
