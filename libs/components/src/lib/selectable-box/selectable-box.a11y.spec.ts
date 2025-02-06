import {
  axe,
  elementUpdated,
  fixture,
} from '@vivid-nx/shared';
import { SelectableBox } from './selectable-box';
import '.';

const COMPONENT_TAG = 'vwc-selectable-box';

describe('a11y: vwc-selectable-box', () => {
  let element: SelectableBox;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as SelectableBox;
  });

  it('should pass html a11y test', async () => {
      element.ariaLabel = 'Box 1';
      await elementUpdated(element);

      expect(await axe(element)).toHaveNoViolations();
    });
    
  describe('radio', () => {
      it('should pass html a11y test', async () => {
        element = (await fixture(
          `<${COMPONENT_TAG} control-type="radio" aria-label="Box 1"></${COMPONENT_TAG}>`
        )) as SelectableBox;

        expect(await axe(element)).toHaveNoViolations();
      });

    });

    describe('clickableBox', () => {
      it('should pass html a11y test', async () => {
        element.clickableBox = true;
        await elementUpdated(element);

        expect(await axe(element)).toHaveNoViolations();
      });

      describe('radio', () => {
        it('should pass html a11y test', async () => {
          element = (await fixture(
            `<${COMPONENT_TAG} control-type="radio" aria-label="Box 1" clickable-box></${COMPONENT_TAG}>`
          )) as SelectableBox;

          expect(await axe(element)).toHaveNoViolations();
        });
      });
    });
});
