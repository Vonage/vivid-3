import {
  ADD_TEMPLATE_TO_FIXTURE,
  axe,
  elementUpdated,
  fixture,
} from '@vivid-nx/shared';
import type { Button } from '../button/button';
import { Tooltip } from './tooltip';
import '.';

const COMPONENT_TAG = 'a11y: vwc-tooltip';

describe('vwc-tooltip', () => {
  let element: Tooltip;
  let anchor: Button;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as Tooltip;
    anchor = (await fixture(
      '<vwc-button id="anchor"></vwc-button>',
      ADD_TEMPLATE_TO_FIXTURE
    )) as Button;
  });

  it('should pass html a11y test', async () => {
    element.anchor = anchor;
    element.open = true;
    element.text = 'Tooltip text';
    await elementUpdated(element);

    expect(await axe(element)).toHaveNoViolations();
  });
});
