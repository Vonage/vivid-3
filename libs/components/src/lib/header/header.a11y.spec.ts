import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { Header } from './header';
import '.';

const COMPONENT_TAG = 'vwc-header';

describe('a11y: vwc-header', () => {
  let element: Header;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    element = (await fixture(
      `<${COMPONENT_TAG}></${COMPONENT_TAG}>`
    )) as Header;
  });

  it('should pass html a11y test', async () => {
    element.alternate = true;
    await elementUpdated(element);

    expect(await axe(element)).toHaveNoViolations();
  });
});
