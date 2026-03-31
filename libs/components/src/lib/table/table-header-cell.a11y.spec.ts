import { axe, elementUpdated, fixture } from '@repo/shared';
import type { TableHeaderCell } from './table-header-cell';
import '.';

const COMPONENT_TAG = 'vwc-table-header-cell';

describe('Table header cell accessibility', () => {
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

	describe('when used as a column header', () => {
		it('meets accessibility requirements (no axe violations)', async () => {
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

	describe('when used as a row header', () => {
		it('meets accessibility requirements (no axe violations)', async () => {
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
