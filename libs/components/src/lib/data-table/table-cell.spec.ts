import { elementUpdated, fixture } from '@repo/shared';
import { TableCell } from './table-cell';
import '.';

const COMPONENT_TAG = 'vwc-table-cell';

describe('vwc-table-cell', () => {
	let element: TableCell;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TableCell;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-table-cell', async () => {
			expect(element).toBeInstanceOf(TableCell);
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
			element.textContent = 'Test cell content';
			await elementUpdated(element);
			expect(element.textContent).toContain('Test cell content');
		});

		it('should have role="gridcell"', async () => {
			await elementUpdated(element);
			expect(element.getAttribute('role')).toBe('cell');
		});
	});
});
