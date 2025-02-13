import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import '.';
import { MenuItem } from './menu-item';
import { MenuItemRole } from './definition';

const COMPONENT_TAG = 'vwc-menu-item';

describe('a11y: vwc-menu-item', () => {
	let element: MenuItem;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		const container = await fixture(
			`<div role="menu"><${COMPONENT_TAG}></${COMPONENT_TAG}></div>`
		);
		element = container.querySelector(COMPONENT_TAG) as MenuItem;
	});

	it('should pass html a11y test', async () => {
		element.text = 'Menu item';
		element.role = MenuItemRole.menuitem;
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
