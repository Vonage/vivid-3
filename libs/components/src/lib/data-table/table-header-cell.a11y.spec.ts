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
      <div role="grid">
        <div role="row">
          <${COMPONENT_TAG}>Header content</${COMPONENT_TAG}>
        </div>
      </div>
    `)) as HTMLDivElement;
		element = div.querySelector(COMPONENT_TAG) as TableHeaderCell;
	});

	it('should pass html a11y test', async () => {
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
