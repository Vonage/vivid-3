import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { NavItem } from './nav-item';
import '.';

const COMPONENT_TAG = 'vwc-nav-item';

describe('a11y: vwc-nav-item', () => {
	let element: NavItem;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as NavItem;
	});

	it('should pass html a11y test', async () => {
		element.ariaCurrent = 'page';
		element.text = 'lorem';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
