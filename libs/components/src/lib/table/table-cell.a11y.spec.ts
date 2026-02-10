import { axe, elementUpdated, fixture } from '@repo/shared';
import { TableCell } from './table-cell';
import '.';

const COMPONENT_TAG = 'vwc-table-cell';

describe('a11y: vwc-table-cell', () => {
	let element: TableCell;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		const div = (await fixture(`
      <div role="grid">
        <div role="row">
          <${COMPONENT_TAG}>Cell content</${COMPONENT_TAG}>
        </div>
      </div>
    `)) as HTMLDivElement;
		element = div.querySelector(COMPONENT_TAG) as TableCell;
	});

	it('should pass html a11y test', async () => {
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
