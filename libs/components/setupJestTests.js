// import * as jestFetchMock from 'jest-fetch-mock';
// import { enableFetchMocks } from 'jest-fetch-mock';
import { jest } from '@jest/globals';
import fetchMock from 'jest-fetch-mock';
import './src/shared/utils';

fetchMock.enableMocks();

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

jest.mock('./src/shared/utils', () => {
	const originalModule = jest.requireActual('./src/shared/utils');

	//Mock the default export and named export 'foo'
	return {
		...originalModule,
		loadComponentsModules: jest.fn((components) => {
			components.forEach((component) => import(`./src/lib/${component}/index.ts`));

			return Promise.all(
				components.map(component =>
					customElements.whenDefined(`vwc-${component}`)
				)
			);
		}),
	};
});
