import publicCssReferences from './public-css-references';

const { transformer, matcher } = publicCssReferences;

const defaultToken = {
	value: undefined,
	name: '',
	path: [],
	original: undefined,
	filePath: '',
	isSource: false,
};

describe('basic', () => {
	it('should match if token is public', () => {
		expect(
			matcher({
				...defaultToken,
				public: true,
			})
		).toBeTruthy();
	});

	it('should not match if token is not public', () => {
		expect(
			matcher({
				...defaultToken,
				type: 'other',
			})
		).toBeFalsy();
	});

	it('should transform to css calc', () => {
		expect(
			transformer(
				{
					...defaultToken,
					name: 'vvd-size-font-scale-base',
					value: '16',
					type: 'sizing',
					public: true,
				},
				{}
			)
		).toEqual('var(--vvd-size-font-scale-base, 16)');
	});
});
