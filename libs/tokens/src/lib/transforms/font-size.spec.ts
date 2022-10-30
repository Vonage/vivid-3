import fontSize from './font-size';

const { transformer, matcher } = fontSize;

const defaultToken = {
	value: undefined,
	name: '',
	path: [],
	original: undefined,
	filePath: '',
	isSource: false
};

const token = {
	value: "16 * 4.125",
	type: 'fontSizes',
};

describe('basic', () => {
	it('should match if token is of type fontSizes', () => {
		expect(matcher({
			...defaultToken,
			...token,
		})).toBeTruthy();
	});

	it('should not match if not of type fontSizes', () => {
		expect(matcher({
			...defaultToken,
			type: 'other'
		})).toBeFalsy();
	});

	it('should transform to css calc', () => {
		expect(transformer({
			...defaultToken,
			...token
		})).toEqual('calc(16 * 4.125)');
	});
});
