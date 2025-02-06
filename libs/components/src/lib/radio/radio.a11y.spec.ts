import {
  axe,
  elementUpdated,
  fixture,
} from '@vivid-nx/shared';
import { Radio } from './radio';
import '.';

const COMPONENT_TAG = 'vwc-radio';

describe('a11y: vwc-radio', () => {
  let element: Radio;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    element = fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Radio;
    await elementUpdated(element);
  });

    it('should pass html a11y test', async () => {
      element.label = 'lorem';
      element.checked = true;
      await elementUpdated(element);

      expect(await axe(element)).toHaveNoViolations();
    });

    describe('aria-label', () => {
      beforeEach(async () => {
        element.ariaLabel = 'Label';
        await elementUpdated(element);
      });
      
      it('should pass html a11y test', async () => {
        expect(await axe(element)).toHaveNoViolations();
      });
    });
});
