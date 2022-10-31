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

describe('basic', () => {
	it('should map font weight to weight and stretch', () => {
		expect(transformer({
			...defualtToken,
			value: "Wide Medium",
			type: 'fontWeights',
		})).toEqual('500 condensed');
	});

	it('should throw', () => {
		expect(transformer({ ...defualtToken })).toEqual(undefined);
	});

	it('should match if token is of type fontWeights', () => {
		expect(matcher({
			...defualtToken,
			type: 'fontWeights'
		})).toBeTruthy();
	});

	it('should return false if token is not of type fontWeights', () => {
		expect(matcher({
			...defualtToken,
			type: 'other'
		})).toBeFalsy();
	});
});
