import { axe } from '@repo/shared/test-utils/axe';
import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import type { TableRow } from './table-row';
import '.';

const COMPONENT_TAG = 'vwc-table-row';

describe('Table row accessibility', () => {
	let element: TableRow;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		const div = (await fixture(`
      <div role="table">
        <${COMPONENT_TAG}>
          <div role="cell">Cell 1</div>
          <div role="cell">Cell 2</div>
        </${COMPONENT_TAG}>
      </div>
    `)) as HTMLDivElement;
		element = div.querySelector(COMPONENT_TAG) as TableRow;
	});

	it('meets accessibility requirements (no axe violations)', async () => {
		await elementUpdated(element);
		expect(await axe(element)).toHaveNoViolations();
	});
});
