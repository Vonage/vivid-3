import { elementUpdated, fixture, getControlElement } from '@vivid-nx/shared';
import { ICONS_VERSION as ICON_SET_VERSION } from '@vonage/vwc-consts';
import type { Icon } from './icon';
import '.';

const COMPONENT_TAG = 'vwc-icon';

describe('icon', function () {
	function fakeFetch(requestTime = 4000) {
		(global.fetch as any) = vi.fn((_, { signal }) => {
			currentFetchSignal = signal;
			return new Promise((res) => {
				setTimeout(() => {
					res(response);
				}, requestTime);
			});
		});
	}

	// Use a unique id for each icon name to avoid caching
	let nextUniqueId = 0;
	const uniqueId = () => `icon-${nextUniqueId++}`;

	const svg = 'svg';
	let response: any;
	let responseFileType = 'image/svg+xml';

	const originalFetch = global.fetch;

	let currentFetchSignal: AbortSignal;
	let element: Icon;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Icon;
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
	});

	afterEach(function () {
		vi.useRealTimers();
		global.fetch = originalFetch;
	});

	it('should allow being created via createElement', () => {
		// createElement may fail even though indirect instantiation through innerHTML etc. succeeds
		// This is because only createElement performs checks for custom element constructor requirements
		// See https://html.spec.whatwg.org/multipage/custom-elements.html#custom-element-conformance
		expect(() => document.createElement(COMPONENT_TAG)).not.toThrow();
	});

	describe('name', function () {
		it('should leave svg undefined if fetch fails', async function () {
			response.ok = false;
			fakeFetch(100);

			// Set the name property to trigger the fetch call
			element.name = uniqueId();

			// Advance the timers to ensure the fetch call is made
			await vi.advanceTimersByTimeAsync(100);

			expect(element._svg).toEqual(undefined);
		});

		it('should leave svg undefined if fetch returns non svg content-type', async function () {
			responseFileType = 'text/plain';
			fakeFetch(100);

			// Set the name property to trigger the fetch call
			element.name = uniqueId();

			// Advance the timers to ensure the fetch call is made
			await vi.advanceTimersByTimeAsync(100);

			expect(element._svg).toEqual(undefined);
		});

		it('should show nothing when first changing the icon', async function () {
			fakeFetch(4000);
			element.name = uniqueId();

			expect(element._svg).toEqual(undefined);
		});

		it('should set the icon as loading after 500ms', async function () {
			fakeFetch(4000);
			element.name = uniqueId();
			await vi.advanceTimersByTimeAsync(500);
			expect(element._svg).toMatchSnapshot();
		});

		it('should remove loading icon after 2500ms', async function () {
			fakeFetch(4000);
			element.name = uniqueId();
			await vi.advanceTimersByTimeAsync(2500);
			expect(element._svg).toEqual(undefined);
		});

		it('should set icon in svg after icon fetch', async function () {
			fakeFetch(100);
			element.name = uniqueId();
			await vi.runAllTimersAsync();
			expect(element._svg).toEqual(svg);
		});

		it('should show empty string when no icon is available', async function () {
			fakeFetch(100);
			element.name = uniqueId();
			await vi.runAllTimersAsync();
			element.name = undefined;
			await vi.runAllTimersAsync();
			expect(element._svg).toEqual('');
		});

		it('should abort additional fetch requests', async function () {
			fakeFetch(100);
			element.name = uniqueId();
			await vi.advanceTimersByTimeAsync(50);
			const homeSignal = currentFetchSignal;

			element.name = 'user';
			await vi.advanceTimersByTimeAsync(10);

			expect(homeSignal.aborted).toBe(true);
		});
	});

	describe('iconLoaded', function () {
		it('should default to false', function () {
			expect(element.iconLoaded).toEqual(false);
		});

		it('should set to true when icon is loaded', async function () {
			element.name = uniqueId();
			await vi.runAllTimersAsync();
			expect(element.iconLoaded).toEqual(true);
		});

		it('should set an image with src when iconLoaded is false', async function () {
			const iconName = uniqueId();
			element.name = iconName;
			await vi.runAllTimersAsync();
			element.iconLoaded = false;
			await elementUpdated(element);
			const imgElement = getControlElement(element).querySelector('img');
			expect(imgElement?.src).toEqual(
				`https://icon.resources.vonage.com/v${ICON_SET_VERSION}/${iconName}.svg`
			);
		});

		it('should set aria-busy on the figure element when iconLoaded is false', async function () {
			element.name = uniqueId();
			await vi.runAllTimersAsync();
			element.iconLoaded = false;

			await elementUpdated(element);
			const figureElement = getControlElement(element);
			expect(figureElement.hasAttribute('aria-busy')).toBe(true);
		});

		it('should set iconLoaded to false when name changes', async function () {
			element.iconLoaded = true;

			element.name = uniqueId();
			await vi.advanceTimersByTimeAsync(100);

			expect(element.iconLoaded).toEqual(false);
		});
	});

	describe('label', function () {
		it('should default to undefined', async function () {
			expect(element.label).toEqual(undefined);
		});

		describe('when label is not set', function () {
			it('should set aria-hidden to true on the control element when label is undefined', async function () {
				expect(getControlElement(element).hasAttribute('aria-hidden')).toBe(true);
			});

			it('should set aria-hidden to true on the control element when label is empty', async function () {
				element.label = ' ';
				await elementUpdated(element);
				expect(getControlElement(element).hasAttribute('aria-hidden')).toBe(true);
			});

			it('should render an empty label element', async function () {
				const labelElement = getControlElement(element).querySelector('.label');
				expect(labelElement?.textContent).toBe('');
			});
		});

		describe('when label is set', function () {
			it('should set aria-hidden to false on the control element when label is set', async function () {
				element.label = 'test';
				await elementUpdated(element);
				expect(getControlElement(element).hasAttribute('aria-hidden')).toBe(false);
			});

			it('should render the label element containing the label text', async function () {
				element.label = 'test';
				await elementUpdated(element);
				const labelElement = getControlElement(element).querySelector('.label');
				expect(labelElement?.textContent).toBe('test');
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
