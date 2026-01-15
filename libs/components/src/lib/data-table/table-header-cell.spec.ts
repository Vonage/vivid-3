import { elementUpdated, fixture } from '@repo/shared';
import { TableHeaderCell } from './table-header-cell';
import '.';

const COMPONENT_TAG = 'vwc-table-header-cell';

describe('vwc-table-header-cell', () => {
	let element: TableHeaderCell;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TableHeaderCell;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-table-header-cell', async () => {
			expect(element).toBeInstanceOf(TableHeaderCell);
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
			element.textContent = 'Test header content';
			await elementUpdated(element);
			expect(element.textContent).toContain('Test header content');
		});

		it('should have display: table-cell', async () => {
			await elementUpdated(element);
			const computedStyle = window.getComputedStyle(element);
			expect(computedStyle.display).toBe('table-cell');
		});

		it('should have role="columnheader"', async () => {
			await elementUpdated(element);
			expect(element.getAttribute('role')).toBe('columnheader');
		});
	});
});

