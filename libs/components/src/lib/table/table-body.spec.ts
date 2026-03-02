import { elementUpdated, fixture } from '@repo/shared';
import { TableBody } from './table-body';
import '.';

const COMPONENT_TAG = 'vwc-table-body';

describe('Table body', () => {
	let element: TableBody;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as TableBody;
	});

	describe('when the component is set up', () => {
		it('is a table body component', async () => {
			expect(element).toBeInstanceOf(TableBody);
		});

		it('can be created in the DOM', () => {
			expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
		});
	});

	describe('when rendering', () => {
		it('shows the data rows and cells you put inside it', async () => {
			element.innerHTML =
				'<vwc-table-row><vwc-table-cell>Data</vwc-table-cell></vwc-table-row>';
			await elementUpdated(element);
			const row = element.querySelector('vwc-table-row');
			expect(row).toBeTruthy();
		});
	});
});
