import { axe, fixture, getControlElement } from '@vivid-nx/shared';
import { ICONS_VERSION as ICON_SET_VERSION } from '@vonage/vwc-consts';
import type { Icon } from './icon';
import '.';

const COMPONENT_TAG = 'vwc-icon';

describe('icon', function () {
	function fakeFetch(requestTime = 4000) {
		(global.fetch as any) = jest.fn((_, { signal }) => {
			currentFetchSignal = signal;
			return new Promise((res) => {
				setTimeout(() => res(response), requestTime);
			});
		});
	}

	function setIconNameAndTriggerFirstTimer() {
		element.name = 'none';
		jest.advanceTimersToNextTimer();
	}

	function setIconNameAndAdvanceTime(timeInMs: number, name = 'none') {
		element.name = name;
		jest.advanceTimersByTime(timeInMs);
	}

	function setIconNameAndRunAllTimers(iconName: string | undefined) {
		element.name = iconName;
		jest.runAllTimers();
	}

	const svg = 'svg';
	const response = {
		ok: true,
		headers: {
			get: () => {
				return 'image/svg+xml';
			},
		},
		text: () => svg,
	};
	const originalFetch = global.fetch;
	const originalPromise = global.Promise;

	let currentFetchSignal: AbortSignal;
	let element: Icon;

	beforeEach(async () => {
		element = (await fixture(`<${COMPONENT_TAG}></${COMPONENT_TAG}>`)) as Icon;
		global.Promise = require('promise'); // needed in order for promises to work with jest fake timers
		jest.useFakeTimers({ legacyFakeTimers: true });
	});

	afterEach(function () {
		jest.useRealTimers();
		global.fetch = originalFetch;
		global.Promise = originalPromise;
	});

	describe('name', function () {
		it('should show nothing when first changing the icon', async function () {
			fakeFetch(4000);
			setIconNameAndTriggerFirstTimer();

			expect(element._svg).toEqual(undefined);
		});

		it('should set the icon as loading after 500ms', async function () {
			fakeFetch(4000);
			setIconNameAndAdvanceTime(500);
			expect(element._svg).toMatchSnapshot();
		});

		it('should remove loading icon after 2500ms', async function () {
			fakeFetch(4000);
			setIconNameAndAdvanceTime(2500);
			expect(element._svg).toEqual(undefined);
		});

		it('should set icon in svg after icon fetch', async function () {
			fakeFetch(100);
			setIconNameAndRunAllTimers('none');
			expect(element._svg).toEqual(svg);
		});

		it('should show empty string when no icon is available', function () {
			fakeFetch(100);
			setIconNameAndRunAllTimers('none');
			setIconNameAndRunAllTimers(undefined);
			expect(element._svg).toEqual('');
		});

		it('should abort additional fetch requests', function () {
			fakeFetch(100);
			setIconNameAndAdvanceTime(50, 'home');
			const homeSignal = currentFetchSignal;

			setIconNameAndAdvanceTime(10, 'user');

			expect(homeSignal.aborted).toBe(true);
		});
	});

	describe('iconLoaded', function () {
		it('should default to false', function () {
			expect(element.iconLoaded).toEqual(false);
		});

		it('should set to true when icon is loaded', async function () {
			setIconNameAndRunAllTimers('home');
			expect(element.iconLoaded).toEqual(true);
		});

		it('should set an image with src when iconLoaded is false', async function () {
			setIconNameAndRunAllTimers('home');
			element.iconLoaded = false;
			jest.runAllTimers();
			const imgElement = getControlElement(element).querySelector('img');
			expect(imgElement?.src).toEqual(
				`https://icon.resources.vonage.com/v${ICON_SET_VERSION}/home.svg`
			);
		});

		it('should set aria-busy on the figure element when iconLoaded is false', async function () {
			setIconNameAndRunAllTimers('home');
			element.iconLoaded = false;
			jest.runAllTimers();
			const figureElement = getControlElement(element);
			expect(figureElement.hasAttribute('aria-busy')).toBe(true);
		});

		it('should set iconLoaded to false when name changes', async function () {
			element.iconLoaded = true;

			setIconNameAndAdvanceTime(100);

			expect(element.iconLoaded).toEqual(false);
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
				jest.runAllTimers();
				expect(getControlElement(element).classList).toContain(`size-${size}`);
			}
		);
	});

	describe('a11y', () => {
		it('should pass html a11y test', async () => {
			jest.clearAllTimers();
			jest.useRealTimers();
			element = (await fixture(
				`<${COMPONENT_TAG} name="home"></${COMPONENT_TAG}>`
			)) as Icon;

			expect(await axe(element)).toHaveNoViolations();
		});
	});
});
