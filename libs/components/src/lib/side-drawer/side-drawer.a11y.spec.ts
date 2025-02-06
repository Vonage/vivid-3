import {
  axe,
  elementUpdated,
  fixture,
  getControlElement,
} from '@vivid-nx/shared';
import { SideDrawer } from './side-drawer';
import '.';

const COMPONENT_TAG = 'vwc-side-drawer';

describe('a11y: vwc-side-drawer', () => {
  let element: SideDrawer;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as SideDrawer;
    await elementUpdated(element);
  });

  it('should pass html a11y test', async () => {
    element.modal = true;
    element.open = true;
    await elementUpdated(element);

    expect(await axe(element)).toHaveNoViolations();
  });
});
