import { axe, elementUpdated, fixture } from '@repo/shared';
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
		element.setAttribute('aria-label', 'Home');
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
