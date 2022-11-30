// import * as jestFetchMock from 'jest-fetch-mock';

// jestFetchMock.enableFetchMocks();

import { jest } from '@jest/globals';
import fetchMocks from 'jest-fetch-mock';

fetchMocks.enableMocks();

Object.defineProperty(window, 'matchMedia', {
	writable: true,
	value: jest.fn().mockImplementation((query) => ({
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
