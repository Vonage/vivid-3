import { axe, fixture } from '@vivid-nx/shared';
import { Elevation } from './elevation';
import '.';

const COMPONENT_TAG = 'vwc-elevation';

describe('a11y: vwc-elevation', () => {
	let element: Elevation;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Elevation;
	});

	it('should pass html a11y test', async () => {
		expect(await axe(element)).toHaveNoViolations();
	});
});
