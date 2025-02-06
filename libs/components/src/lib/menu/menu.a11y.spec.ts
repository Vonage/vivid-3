import {
  axe,
  elementUpdated,
  fixture,
} from '@vivid-nx/shared';
import { Menu } from './menu';
import '.';
import '../menu-item';

const COMPONENT_TAG = 'vwc-menu';

describe('a11y: vwc-menu', () => {
  let element: Menu;

  beforeAll(async () => {
    await customElements.whenDefined(COMPONENT_TAG);
  });
 
  beforeEach(async () => {
    element = fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`) as Menu;
    element.open = true;
    element.ariaLabel = 'A11y label';
    element.innerHTML = `
      <div role="menuitem" id="id1">Menu Item 1</div>
      <div role="menuitem" id="id2">Menu Item 2</div>
    `;
    await elementUpdated(element);
  });

  it('should pass html a11y test', async () => {
    expect(await axe(element)).toHaveNoViolations();
  });
});
