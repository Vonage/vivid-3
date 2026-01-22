import { axe, elementUpdated, fixture } from '@repo/shared';
import { TableRow } from './table-row';
import '.';

const COMPONENT_TAG = 'vwc-table-row';

describe('a11y: vwc-table-row', () => {
	let element: TableRow;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		const div = (await fixture(`
      <div role="grid">
        <${COMPONENT_TAG}>
          <div role="gridcell">Cell 1</div>
          <div role="gridcell">Cell 2</div>
        </${COMPONENT_TAG}>
      </div>
    `)) as HTMLDivElement;
		element = div.querySelector(COMPONENT_TAG) as TableRow;
	});

	it('should pass html a11y test', async () => {
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
