import {
  axe,
  elementUpdated,
  fixture,
} from '@vivid-nx/shared';
import { Fab } from './fab';
import '.';

const COMPONENT_TAG = 'vwc-fab';

describe('a11y: vwc-fab', () => {
  let element: Fab;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });

  beforeEach(async () => {
    element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Fab;
  });

  it('should pass html a11y test', async () => {
    const icon = 'home-line';
    element.icon = icon;
    element.iconTrailing = true;
    await elementUpdated(element);

    expect(await axe(element)).toHaveNoViolations();
  });
});
