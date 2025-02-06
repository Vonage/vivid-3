import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { Avatar } from './avatar';
import '.';

const COMPONENT_TAG = 'vwc-avatar';

describe('a11y: vwc-avatar', () => {
  let element: Avatar;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as Avatar;
  });

  it('should pass html a11y test', async () => {
    expect(await axe(element)).toHaveNoViolations();
  });

  describe('initials', () => {
    it('should pass html a11y', async () => {
      element.initials = 'ab';
      await elementUpdated(element);

      expect(await axe(element)).toHaveNoViolations();
    });
  });
});
