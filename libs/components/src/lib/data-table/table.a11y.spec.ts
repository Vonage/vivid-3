import { axe, elementUpdated, fixture } from '@repo/shared';
import { Table } from './table';
import '.';

const COMPONENT_TAG = 'vwc-table';

describe('a11y: vwc-table', () => {
	let element: Table;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}>
				<vwc-table-head>
					<vwc-table-row>
						<vwc-table-header-cell>Column 1</vwc-table-header-cell>
						<vwc-table-header-cell>Column 2</vwc-table-header-cell>
					</vwc-table-row>
				</vwc-table-head>
				<vwc-table-body>
					<vwc-table-row>
						<vwc-table-cell>Data 1</vwc-table-cell>
						<vwc-table-cell>Data 2</vwc-table-cell>
					</vwc-table-row>
					<vwc-table-row>
						<vwc-table-cell>Data 3</vwc-table-cell>
						<vwc-table-cell>Data 4</vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
			</${COMPONENT_TAG}>`
		)) as Table;

		await elementUpdated(element);
	});

	it('should pass html a11y test', async () => {
		expect(await axe(element)).toHaveNoViolations();
	});
});

