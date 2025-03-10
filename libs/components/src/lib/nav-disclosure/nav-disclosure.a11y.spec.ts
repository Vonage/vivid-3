import { axe, elementUpdated, fixture } from '@vivid-nx/shared';
import { NavDisclosure } from './nav-disclosure';
import '.';

const COMPONENT_TAG = 'vwc-nav-disclosure';

describe('a11y: vwc-nav-disclosure', () => {
	let element: NavDisclosure;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as NavDisclosure;
	});

	it('should pass html a11y test', async () => {
		element.open = true;
		element.label = 'Label';
		element.ariaCurrent = 'true';
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
