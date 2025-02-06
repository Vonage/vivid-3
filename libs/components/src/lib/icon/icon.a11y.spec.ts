import { axe, fixture } from '@vivid-nx/shared';
import type { Icon } from './icon';
import '.';

const COMPONENT_TAG = 'vwc-icon';

describe('a11y: icon', function () {
	const originalFetch = global.fetch;

	let element: Icon;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Icon;
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
	});

	afterEach(function () {
		vi.useRealTimers();
		global.fetch = originalFetch;
	});

	it('should pass html a11y test', async () => {
		vi.clearAllTimers();
		vi.useRealTimers();
		element = (await fixture(
			`<${COMPONENT_TAG} name="home"></${COMPONENT_TAG}>`
		)) as Icon;

		expect(await axe(element)).toHaveNoViolations();
	});
});
