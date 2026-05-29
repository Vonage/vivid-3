import { axe } from '@repo/shared/test-utils/axe';
import { elementUpdated, fixture } from '@repo/shared/test-utils/fixture';
import { mockIntersectionObserver } from '@repo/shared/test-utils/intersection-observer-mock';
import type { CountryGroup } from './country-group';
import '.';

const COMPONENT_TAG = 'vwc-country-group';

describe('a11y: country-group', () => {
	let element: CountryGroup;
	let io: ReturnType<typeof mockIntersectionObserver>;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		io = mockIntersectionObserver();
		element = (await fixture(
			`<${COMPONENT_TAG} style="width: 320px">
				<vwc-country code="UK"></vwc-country>
				<vwc-country code="DE"></vwc-country>
			</${COMPONENT_TAG}>`
		)) as CountryGroup;
		await elementUpdated(element);
	});

	afterEach(() => {
		io.cleanup();
	});

	it('should pass html a11y test', async () => {
		expect(await axe(element)).toHaveNoViolations();
	});
});
