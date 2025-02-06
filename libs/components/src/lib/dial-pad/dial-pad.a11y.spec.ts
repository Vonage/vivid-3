import { axe, fixture } from '@vivid-nx/shared';
import { DialPad } from './dial-pad';
import '.';

const COMPONENT_TAG = 'vwc-dial-pad';

describe('a11y: vwc-dial-pad', () => {
  let element: DialPad;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as DialPad;
  });

  it('should pass html a11y test', async () => {
    expect(await axe(element)).toHaveNoViolations();
  });
});
