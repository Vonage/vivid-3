import { axe, elementUpdated, fixture } from '@repo/shared';
import { TableHeaderCell } from './table-header-cell';
import '.';

const COMPONENT_TAG = 'vwc-table-header-cell';

describe('a11y: vwc-table-header-cell', () => {
	let element: TableHeaderCell;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		const div = (await fixture(`
      <vwc-table>
				<vwc-table-head>
					<vwc-table-row>
						<${COMPONENT_TAG}>Header content</${COMPONENT_TAG}>
					</vwc-table-row>
				</vwc-table-head>
				<vwc-table-body>
					<vwc-table-row>
						<vwc-table-cell>Cell content</vwc-table-cell>
					</vwc-table-row>
				</vwc-table-body>
      </vwc-table>
    `)) as HTMLDivElement;
		element = div.querySelector(COMPONENT_TAG) as TableHeaderCell;
	});

	describe('column scope', () => {
		it('should pass html a11y test', async () => {
			const div = (await fixture(`
				<vwc-table>
					<vwc-table-head>
						<vwc-table-row>
							<${COMPONENT_TAG}>Header content</${COMPONENT_TAG}>
						</vwc-table-row>
					</vwc-table-head>
					<vwc-table-body>
						<vwc-table-row>
							<vwc-table-cell>Cell content</vwc-table-cell>
						</vwc-table-row>
					</vwc-table-body>
				</vwc-table>
			`)) as HTMLDivElement;
			element = div.querySelector(COMPONENT_TAG) as TableHeaderCell;
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});

	describe('row scope', () => {
		it('should pass html a11y test', async () => {
			const div = (await fixture(`
				<vwc-table>
					<vwc-table-row>
						<${COMPONENT_TAG}>Header content</${COMPONENT_TAG}>
						<vwc-table-cell>Cell content</vwc-table-cell>
					</vwc-table-row>
				</vwc-table>
			`)) as HTMLDivElement;
			element = div.querySelector(COMPONENT_TAG) as TableHeaderCell;
			await elementUpdated(element);

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
