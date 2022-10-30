import publicCssReferences from './public-css-references';

const { transformer, matcher } = publicCssReferences;

const defaultToken = {
	value: undefined,
	name: '',
	path: [],
	original: undefined,
	filePath: '',
	isSource: false
};

const token = {
	name: "vvd-size-font-scale-base",
	value: "16",
	type: "sizing",
	public: true
};

describe('basic', () => {
	it('should match if public', () => {
		expect(matcher({
			...defaultToken,
			...token,
		})).toBeTruthy();
	});

	it('should not match if not public', () => {
		expect(matcher({
			...defaultToken,
			type: 'other'
		})).toBeFalsy();
	});

	it('should transform to css calc', () => {
		expect(transformer({
			...defaultToken,
			...token
		})).toEqual('var(--vvd-size-font-scale-base, 16)');
	});
});
