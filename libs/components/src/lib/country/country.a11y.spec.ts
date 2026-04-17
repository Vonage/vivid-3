import { axe } from '@repo/shared/test-utils/axe';
import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import type { Country } from './country';
import '.';

const COMPONENT_TAG = 'vwc-country';

describe('a11y: vwc-country', () => {
	let element: Country;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG} code="UK"></${COMPONENT_TAG}>`
		)) as Country;
	});

	it('should pass html a11y test', async () => {
		await elementUpdated(element);

		expect(await axe(element)).toHaveNoViolations();
	});
});
