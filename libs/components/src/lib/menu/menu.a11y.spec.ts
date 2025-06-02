import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { Menu } from './menu';
import '.';
import '../menu-item';
import '../divider';

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
      <vwc-menu-item text="Menu Item 1"></vwc-menu-item>
      <vwc-menu-item control-type="checkbox" text="Menu Item Checkbox"></vwc-menu-item>
      <vwc-divider></vwc-divider>
      <vwc-menu-item control-type="radio" text="Menu Item Radio"></vwc-menu-item>
    `;
		await elementUpdated(element);
	});

	it('should pass html a11y test', async () => {
		expect(await axe(element)).toHaveNoViolations();
	});
});
