import resolveMath from './resolve-math';

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
	value: "4 * 3.72",
	type: 'sizing',
};

describe('basic', () => {
	it('should evaluate math expression', () => {
		expect(transformer({
			...defualtToken,
			...token
		})).toEqual('14.88');
	});

	it('should throw', () => {
		expect(transformer({ ...defualtToken })).toEqual("undefined");
	});

	it('should match if is token', () => {
		expect(matcher({
			...defualtToken,
			type: 'other'
		})).toBeFalsy();
		expect(matcher({
			...defualtToken,
			...token,
		})).toBeTruthy();
	});
});
