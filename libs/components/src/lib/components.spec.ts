import * as components from './components';

/* eslint-disable @typescript-eslint/no-empty-function */
global.fetch = jest.fn(() => new Promise(() => {}));

describe('components', () => {
	it('should work', () => {
		expect(typeof components).toEqual(typeof {});
	});
});
