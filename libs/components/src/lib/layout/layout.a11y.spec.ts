import {
  axe,
  elementUpdated,
  fixture,
} from '@vivid-nx/shared';
import { LayoutSize } from '../enums';
import { Layout } from './layout';
import '.';

const COMPONENT_TAG = 'vwc-layout';

describe('vwc-layout', () => {
  let element: Layout;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    element = (await fixture(`
      <${COMPONENT_TAG}>
        <div style="border: 1px solid">test</div>
        <div style="border: 1px solid">test</div>
      </${COMPONENT_TAG}>
    `)) as Layout;
  });

  it('should pass html a11y test', async () => {
      element.gutters = LayoutSize.Large;
      await elementUpdated(element);

      expect(await axe(element)).toHaveNoViolations();
    });
});
