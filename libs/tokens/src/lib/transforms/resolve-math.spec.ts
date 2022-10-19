import { resolveMath } from './resolve-math';

const { transformer, matcher } = resolveMath;

const defualtToken = {
	value: undefined,
	name: '',
	path: [],
	original: undefined,
	filePath: '',
	isSource: false
};

const token = {
	value: "4 * 3.72"
};

describe('basic', () => {
	it('should evaluate math expression', () => {
		expect(transformer({
			...defualtToken,
			...token
		})).toEqual('15');
	});

	it('should throw', () => {
		expect(transformer({ ...defualtToken })).toEqual("undefined");
	});

	it('should match if is token', () => {
		expect(matcher(undefined)).toBeFalsy();
		expect(matcher({
			...defualtToken,
			...token,
		})).toBeTruthy();
	});
});
