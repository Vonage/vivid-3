import { axe, elementUpdated, fixture } from '@repo/shared';
import { CountryIndicator } from './country-indicator';
import '.';

const COMPONENT_TAG = 'vwc-country-indicator';

describe('a11y: vwc-country-indicator', () => {
	let element: CountryIndicator;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG} code="UK"></${COMPONENT_TAG}>`
		)) as CountryIndicator;
	});

	it('should pass html a11y test', async () => {
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
