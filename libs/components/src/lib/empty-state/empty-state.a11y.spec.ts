import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { EmptyState } from './empty-state';
import '.';

const COMPONENT_TAG = 'vwc-empty-state';

describe('a11y: vwc-empty-state', () => {
  let element: EmptyState;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as EmptyState;
  });

  it('should pass html a11y test', async () => {
      const headlineText = 'headline';
      element.setAttribute('headline', headlineText);
      await elementUpdated(element);

      expect(await axe(element)).toHaveNoViolations();
    });
});
