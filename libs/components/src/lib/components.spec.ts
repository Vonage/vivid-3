import * as components from './components';

global.fetch = jest.fn(() => new Promise(() => {}));

describe('components', () => {
	it('should work', () => {
		expect(typeof components).toEqual(typeof {});
	});
});
