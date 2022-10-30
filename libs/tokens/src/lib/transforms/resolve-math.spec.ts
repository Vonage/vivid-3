import resolveMath from './resolve-math';

const { transformer, matcher } = resolveMath;

const defaultToken = {
	value: undefined,
	name: '',
	path: [],
	original: undefined,
	filePath: '',
	isSource: false
};

const token = {
	value: "4 * 3.72",
	type: 'sizing',
};

describe('basic', () => {
	it('should evaluate math expression', () => {
		expect(transformer({
			...defaultToken,
			...token
		})).toEqual('14.88');
	});

	it('should throw', () => {
		expect(transformer({ ...defaultToken })).toEqual("undefined");
	});

	it('should match if is token', () => {
		expect(matcher({
			...defaultToken,
			type: 'other'
		})).toBeFalsy();
		expect(matcher({
			...defaultToken,
			...token,
		})).toBeTruthy();
	});
});
