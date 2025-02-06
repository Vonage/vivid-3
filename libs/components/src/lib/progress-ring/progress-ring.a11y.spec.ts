import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { ProgressRing } from './progress-ring';
import '.';

const COMPONENT_TAG = 'vwc-progress-ring';

describe('a11y: vwc-progress-ring', () => {
  let element: ProgressRing;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as ProgressRing;
  });

  it('should pass html a11y test', async () => {
    element.ariaLabel = 'Label';
      element.min = 10;
      element.max = 90;
      element.value = 20;
      await elementUpdated(element);
      expect(await axe(element)).toHaveNoViolations();
    });
});
