import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import { TableHead } from './table-head';
import '.';

const COMPONENT_TAG = 'vwc-table-head';

describe('Table head', () => {
	let element: TableHead;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TableHead;
	});

	describe('when the component is set up', () => {
		it('is a table head component', async () => {
			expect(element).toBeInstanceOf(TableHead);
		});

		it('can be created in the DOM', () => {
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('when rendering', () => {
		it('shows the header rows and cells you put inside it', async () => {
			element.innerHTML =
				'<vwc-table-row><vwc-table-header-cell>Header</vwc-table-header-cell></vwc-table-row>';
			await elementUpdated(element);
			const row = element.querySelector('vwc-table-row');
			expect(row).toBeTruthy();
		});
	});
});
