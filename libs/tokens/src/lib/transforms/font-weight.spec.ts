import fontWeight from './font-weight';

const { transformer, matcher } = fontWeight;

const defualtToken = {
	value: undefined,
	name: '',
	path: [],
	original: undefined,
	filePath: '',
	isSource: false
};

const token = {
	value: "Wide Medium",
	type: 'fontWeights',
};

describe('basic', () => {
	it('should map font weight to weight and stretch', () => {
		expect(transformer({
			...defualtToken,
			...token
		})).toEqual('500 condensed');
	});

	it('should throw', () => {
		expect(transformer({ ...defualtToken })).toEqual(undefined);
	});

	it('should match if is of type fontWeights', () => {
		expect(matcher({
			...defualtToken,
			...token,
		})).toBeTruthy();
	});

	it('should not match if not of type fontWeights', () => {
		expect(matcher({
			...defualtToken,
			type: 'other'
		})).toBeFalsy();
	});
});
