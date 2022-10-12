import { sourceOnly } from './source-only';

const { matcher } = sourceOnly;

describe('basic', () => {
	const token = {
		isSource: true
	};

	it('should match source tokens only', () => {
		expect(matcher({ isSource: false })).toEqual(false);
		expect(matcher(token)).toEqual(true);
	});
});
