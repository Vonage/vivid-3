import * as jestFetchMock from 'jest-fetch-mock';
import { toHaveNoViolations } from 'jest-axe';

jestFetchMock.enableFetchMocks();

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query: any) => ({
		matches: false,
		media: query,
		onchange: null,
		addListener: jest.fn(), // deprecated
		removeListener: jest.fn(), // deprecated
		addEventListener: jest.fn(),
		removeEventListener: jest.fn(),
		dispatchEvent: jest.fn(),
	})),
});

Object.defineProperty(document, 'adoptedStyleSheets', {
	writable: true,
	value: [],
});
Object.defineProperty(ShadowRoot.prototype, 'adoptedStyleSheets', {
	writable: true,
	value: [],
});
CSSStyleSheet.prototype.replaceSync = jest.fn();

expect.extend(toHaveNoViolations);
