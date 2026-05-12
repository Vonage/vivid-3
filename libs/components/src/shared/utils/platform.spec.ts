import { isApplePlatform } from './platform';

describe('isApplePlatform', () => {
	const originalUserAgent = navigator.userAgent;

	afterEach(() => {
		Object.defineProperty(navigator, 'userAgent', {
			value: originalUserAgent,
			configurable: true,
		});
	});

	it.each([
		['Macintosh; Intel Mac OS X 10_15_7', true],
		['iPhone; CPU iPhone OS 15_0', true],
		['iPad; CPU OS 15_0', true],
		['Windows NT 10.0; Win64; x64', false],
		['Linux x86_64', false],
		['Android 12; Mobile', false],
	])('should return %s for "%s"', (userAgent, expected) => {
		Object.defineProperty(navigator, 'userAgent', {
			value: userAgent,
			configurable: true,
		});
		expect(isApplePlatform()).toBe(expected);
	});
});
