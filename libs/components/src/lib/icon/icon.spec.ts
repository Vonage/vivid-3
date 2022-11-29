import {elementUpdated, fixture} from '@vivid-nx/shared';
import type {Icon} from './icon';
import '.';

const COMPONENT_TAG = 'vwc-icon';

describe('icon', function () {
	let element: Icon;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Icon;
	});

	describe('resolver', function () {
		/**
		 * @param requestTime
		 */
		function fakeFetch(requestTime = 4000) {
			(global.fetch as any) = jest.fn(() => {
				return new Promise(res => {
					setTimeout(() => res(response), requestTime);
				});
			});
		}

		const svg = 'svg';
		const response = {
			ok: true,
			headers: {
				get: () => {
					return 'image/svg+xml';
				}
			},
			text: () => svg
		};
		const originalFetch = global.fetch;
		const originalPromise = global.Promise;

		beforeEach(function () {
			global.Promise = require('promise'); // needed in order for promises to work with jest fake timers
			jest.useFakeTimers({legacyFakeTimers: true});
		});

		afterEach(function () {
			jest.useRealTimers();
			global.fetch = originalFetch;
			global.Promise = originalPromise;
		});

		/**
		 *
		 */
		function setIconNameAndTriggerFirstTimer() {
			element.name = 'none';
			jest.advanceTimersToNextTimer();
		}

		/**
		 * @param timeInMs
		 */
		function setIconNameAndAdvanceTime(timeInMs: number) {
			element.name = 'none';
			jest.advanceTimersByTime(timeInMs);
		}

		/**
		 * @param iconName
		 */
		function setIconNameAndRunAllTimers(iconName: string | undefined) {
			element.name = iconName;
			jest.runAllTimers();
		}

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
	});

	describe('size', function () {
		let controlElement: Element | null | undefined;
		beforeEach(function () {
			controlElement = element.shadowRoot?.querySelector('.control');
		});

		it('should set size class only if exists', async function () {
			const classListContainsSize = controlElement?.className.split(' ').reduce((contains: boolean, className: string) => {
				return contains || className.indexOf('size-') > -1;
			}, false);
			expect(classListContainsSize).toEqual(false);
		});

		it('should set size class according to attribute plus base size', async function () {
			const sizeValue = 2;
			element.size = sizeValue;
			await elementUpdated(element);
			const expectedClass = `size-${sizeValue}`;
			expect(controlElement?.classList.contains(expectedClass)).toEqual(true);
		});
	});
});
