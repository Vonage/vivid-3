import { resolveMath } from './resolve-math';

const { transformer, matcher } = resolveMath;

const token = {
	value: "4 * 3.72"
};

describe('basic', () => {
	it('should evaluate math expression', () => {
		expect(transformer(token)).toEqual('15');
	});

	it('should throw', () => {
		expect(transformer({ })).toEqual("undefined");
	});

	it('should match if is token', () => {
		expect(matcher(undefined)).toBeFalsy();
		expect(matcher(token)).toBeTruthy();
	});
});
