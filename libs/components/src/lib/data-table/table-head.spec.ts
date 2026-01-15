import { elementUpdated, fixture } from '@repo/shared';
import { TableHead } from './table-head';
import '.';

const COMPONENT_TAG = 'vwc-table-head';

describe('vwc-table-head', () => {
	let element: TableHead;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TableHead;
	});

	describe('basic', () => {
		it('should be initialized as a vwc-table-head', async () => {
			expect(element).toBeInstanceOf(TableHead);
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
			element.innerHTML = '<vwc-table-row><vwc-table-header-cell>Header</vwc-table-header-cell></vwc-table-row>';
			await elementUpdated(element);
			const row = element.querySelector('vwc-table-row');
			expect(row).toBeTruthy();
		});

		it('should have display: table-header-group', async () => {
			await elementUpdated(element);
			const computedStyle = window.getComputedStyle(element);
			expect(computedStyle.display).toBe('table-header-group');
		});
	});
});

