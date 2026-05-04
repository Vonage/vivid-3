import { axe } from '@repo/shared/test-utils/axe';
import { fixture } from '@repo/shared/test-utils/fixture';
import type { Flag } from './flag';
import '.';

const COMPONENT_TAG = 'vwc-flag';

describe('a11y: flag', function () {
	const originalFetch = global.fetch;

	let element: Flag;

	beforeAll(async () => {
		await customElements.whenDefined(COMPONENT_TAG);
	});

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Flag;
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
	});

	afterEach(function () {
		vi.useRealTimers();
		global.fetch = originalFetch;
	});

	it('should pass html a11y test', async () => {
		(global.fetch as any) = vi.fn(() =>
			Promise.resolve({
				ok: true,
				headers: { get: () => 'image/svg+xml' },
				text: () => Promise.resolve('<svg></svg>'),
			})
		);

		vi.clearAllTimers();
		vi.useRealTimers();

		element = (await fixture(
			`<${COMPONENT_TAG} code="DE" label="Germany"></${COMPONENT_TAG}>`
		)) as Flag;

		expect(await axe(element)).toHaveNoViolations();
	});
});
