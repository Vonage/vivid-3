
export {}
const { matcher } = require('./source-only');


describe('basic', () => {
	const token = {
		isSource: true
	};

	it('should match source tokens only', () => {
		expect(matcher({})).toBeUndefined();
		expect(matcher(token)).toEqual(true);
	});
});
