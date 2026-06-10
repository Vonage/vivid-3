import {
	elementUpdated,
	fixture,
	getControlElement,
} from '@repo/shared/test-utils/fixture';
import type { Flag } from './flag';
import '.';

vi.mock('../country/utils', () => {
	return {
		getFlagIconName: (countryCode: string | undefined) => {
			if (!countryCode || typeof countryCode !== 'string') return undefined;
			return `flag-${countryCode.trim().toLowerCase()}`;
		},
	};
});

const COMPONENT_TAG = 'vwc-flag';

describe('flag', function () {
	function fakeFetch(requestTime = 4000) {
		(global.fetch as any) = vi.fn((_, { signal }) => {
			currentFetchSignal = signal;
			return new Promise((resolve, reject) => {
				setTimeout(() => {
					resolve(response);
				}, requestTime);
				signal.addEventListener('abort', () => {
					reject(signal.reason);
				});
			});
		});
	}

	// Use a unique code for each run to avoid caching
	let nextUniqueId = 0;
	const uniqueCode = () => `t${nextUniqueId++}`;

	const svg = 'svg';
	let response: any;
	let responseFileType = 'image/svg+xml';

	const originalFetch = global.fetch;

	let currentFetchSignal: AbortSignal;
	let element: Flag;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Flag;
		vi.useFakeTimers({ toFake: ['setTimeout', 'clearTimeout'] });
		responseFileType = 'image/svg+xml';
		response = {
			ok: true,
			headers: {
				get: () => {
					return responseFileType;
				},
			},
			text: () => svg,
		};
		fakeFetch();
	});

	afterEach(function () {
		vi.useRealTimers();
		global.fetch = originalFetch;
	});

	it('should allow being created via createElement', () => {
		expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
	});

	describe('code', function () {
		it('should leave svg undefined if fetch fails', async function () {
			response.ok = false;
			fakeFetch(100);
			element.code = uniqueCode();
			await vi.advanceTimersByTimeAsync(100);
			expect(element._svg).toEqual(undefined);
		});

		it('should leave svg undefined if fetch returns non svg content-type', async function () {
			responseFileType = 'text/plain';
			fakeFetch(100);
			element.code = uniqueCode();
			await vi.advanceTimersByTimeAsync(100);
			expect(element._svg).toEqual(undefined);
		});

		it('should show nothing when first changing the code', async function () {
			fakeFetch(4000);
			element.code = uniqueCode();
			expect(element._svg).toEqual(undefined);
		});

		it('should set the placeholder after 500ms', async function () {
			fakeFetch(4000);
			element.code = uniqueCode();
			await vi.advanceTimersByTimeAsync(500);
			expect(element._svg).toMatchSnapshot();
		});

		it('should remove placeholder after 2500ms', async function () {
			fakeFetch(4000);
			element.code = uniqueCode();
			await vi.advanceTimersByTimeAsync(2500);
			expect(element._svg).toEqual(undefined);
		});

		it('should set svg after flag fetch', async function () {
			fakeFetch(100);
			element.code = uniqueCode();
			await vi.runAllTimersAsync();
			expect(element._svg).toEqual(svg);
		});

		it('should show empty string when no flag is available', async function () {
			fakeFetch(100);
			element.code = uniqueCode();
			await vi.runAllTimersAsync();
			element.code = undefined;
			await vi.runAllTimersAsync();
			expect(element._svg).toEqual('');
		});

		it('should abort additional fetch requests', async function () {
			fakeFetch(100);
			element.code = uniqueCode();
			await vi.advanceTimersByTimeAsync(50);
			const firstSignal = currentFetchSignal;

			element.code = uniqueCode();
			await vi.advanceTimersByTimeAsync(10);

			expect(firstSignal.aborted).toBe(true);
		});
	});

	describe('flagLoaded', function () {
		it('should default to false', function () {
			expect(element.flagLoaded).toEqual(false);
		});

		it('should set to true when flag is loaded', async function () {
			element.code = uniqueCode();
			await vi.runAllTimersAsync();
			expect(element.flagLoaded).toEqual(true);
		});

		it('should set aria-busy on the figure element when flagLoaded is false', async function () {
			element.code = uniqueCode();
			await vi.runAllTimersAsync();
			element.flagLoaded = false;
			await elementUpdated(element);
			const figureElement = getControlElement(element);
			expect(figureElement.hasAttribute('aria-busy')).toBe(true);
		});
	});

	describe('label', function () {
		describe('when label is not set', function () {
			it('should set aria-hidden to true on the control element', async function () {
				expect(getControlElement(element).hasAttribute('aria-hidden')).toBe(
					true
				);
			});
		});

		describe('when label is set', function () {
			it('should set aria-hidden to false on the control element', async function () {
				element.label = 'test';
				await elementUpdated(element);
				expect(getControlElement(element).hasAttribute('aria-hidden')).toBe(
					false
				);
			});
		});
	});

	describe('size', function () {
		it('should default to no size class', async function () {
			expect(getControlElement(element).className).not.toContain('size-');
		});

		it.each([0, 2] as const)(
			'should set size class accordingly when size is %s',
			async function (size) {
				element.size = size;
				await elementUpdated(element);
				expect(getControlElement(element).classList).toContain(`size-${size}`);
			}
		);
	});
});
