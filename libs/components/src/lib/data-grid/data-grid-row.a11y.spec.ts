import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { DataGridRow } from './data-grid-row';
import '.';

const COMPONENT_TAG = 'vwc-data-grid-row';

describe('a11y: vwc-data-grid-row', () => {
  let element: DataGridRow;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    const div = (await fixture(`
      <div role="grid">
        <${COMPONENT_TAG}>
          <div role="gridcell"></div>
        </${COMPONENT_TAG}>
      </div>
    `)) as HTMLDivElement;
    element = div.querySelector(COMPONENT_TAG) as DataGridRow;
  });

  it('should pass html a11y test', async () => {
    element.ariaSelected = 'true';
    await elementUpdated(element);

    expect(await axe(element)).toHaveNoViolations();
  });
});
