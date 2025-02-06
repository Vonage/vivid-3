import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { Progress } from './progress';
import '.';

const COMPONENT_TAG = 'vwc-progress';

describe('a11y: vwc-progress', () => {
  let element: Progress;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as Progress;
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
