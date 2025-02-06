import {
  axe,
  elementUpdated,
  fixture,
} from '@vivid-nx/shared';
import { TextAnchor } from './text-anchor';
import '.';

const COMPONENT_TAG = 'vwc-text-anchor';

describe('a11y: vwc-text-anchor', () => {
  let element: TextAnchor;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as TextAnchor;
  });

  it('should pass html a11y test', async () => {
    element.text = 'Link text';
    element.href = '/somewhere';
    await elementUpdated(element);

    expect(await axe(element)).toHaveNoViolations();
  });
});
