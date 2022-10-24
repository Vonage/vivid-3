import { isTypography, isFontSize, isSource } from '.';

describe('Filters', () => {
	it('should return true if token of type typography', () => {
		expect(isTypography({ type: 'typography' })).toEqual(true);
	});

	it('should return false if token not of type typography', () => {
		expect(isTypography({ type: 'other' })).toEqual(false);
	});

	it('should return true if token of type fontSizes', () => {
		expect(isFontSize({ type: 'fontSizes' })).toEqual(true);
	});

	it('should return false if token not of type fontSizes', () => {
		expect(isFontSize({ type: 'other' })).toEqual(false);
	});

	it('should return true if source tokens', () => {
		expect(isSource({ isSource: true })).toEqual(true);
	});

	it('should return false if not source tokens', () => {
		expect(isSource({ isSource: false })).toEqual(false);
	});
});
