import './index.ts';
import {elementUpdated, fixture} from '@vivid-nx/shared';
import type {Icon} from './icon';

const COMPONENT_TAG = 'vwc-icon';

fdescribe('icon', function () {
	let element: Icon;

	beforeEach(async () => {
		element = (await fixture(
			`<${COMPONENT_TAG}></${COMPONENT_TAG}>`
		)) as Icon;
	});

	it('should set placeholder on loading state', async function () {
		element.placeholder = 'hhh';
		element.state = 'loading';
		await elementUpdated(element);

		expect(element.shadowRoot?.querySelector('figure')?.innerHTML)
			.toEqual(element.placeholder);
	});

	it('should set icon on loaded state', async function () {
		element.svg = 'hhh';
		element.state = 'loaded';
		await elementUpdated(element);

		expect(element.shadowRoot?.querySelector('figure')?.innerHTML)
			.toEqual(element.svg);
	});

	describe('typeChanged', function () {
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
			global.Promise = require('promise');
			jest.useFakeTimers('legacy');
		});

		afterEach(function () {
			jest.useRealTimers();
			global.fetch = originalFetch;
			global.Promise = originalPromise;
		});

		it('should enter loading state', async function () {
			fakeFetch(4000);
			element.type = 'none';
			jest.advanceTimersToNextTimer();

			expect(element.state)
				.toEqual('loading');
			expect(element.placeholder).toEqual(null);
			expect(element.svg).toEqual(null);
		});

		it('should enter loading state', async function () {
			fakeFetch(4000);
			element.type = 'none';
			jest.advanceTimersByTime(500);
			expect(element.state)
				.toEqual('loading');
			expect(element.placeholder).toMatchSnapshot();
			expect(element.svg).toEqual(null);
		});

		it('should exit loading state after timeout', async function () {
			fakeFetch(4000);
			element.type = 'none';
			jest.advanceTimersByTime(2500);
			expect(element.state)
				.toEqual('loading');
			expect(element.placeholder).toEqual(null);
			expect(element.svg).toEqual(null);
		});

		it('should enter loaded state after icon fetch', async function () {
			fakeFetch(100);
			element.type = 'none';
			jest.runAllTimers();
			expect(element.state)
				.toEqual('loaded');
			expect(element.svg).toEqual(svg);
		});

		it('should show empty string when no icon is available', function () {
			fakeFetch(100);
			element.type = 'none';
			jest.runAllTimers();
			element.type = undefined;
			jest.runAllTimers();
			expect(element.state)
				.toEqual('loaded');
			expect(element.placeholder).toEqual(null);
			expect(element.svg).toEqual('');
		});
	});

});
