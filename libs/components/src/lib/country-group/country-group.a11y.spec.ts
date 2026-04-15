import { axe, elementUpdated, fixture } from '@repo/shared';
import { CountryGroup } from './country-group';
import '.';

const COMPONENT_TAG = 'vwc-country-group';

describe('a11y: vwc-country-group', () => {
	let element: CountryGroup;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG} style="width: 320px">
				<vwc-country code="UK"></vwc-country>
				<vwc-country code="DE"></vwc-country>
			</${COMPONENT_TAG}>`
		)) as CountryGroup;
		await elementUpdated(element);
	});

	it('should pass html a11y test', async () => {
		expect(await axe(element)).toHaveNoViolations();
	});
});
