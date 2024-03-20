import fontSize from './font-size';

const { transformer, matcher } = fontSize;

const defaultToken = {
	value: undefined,
	name: '',
	path: [],
	original: undefined,
	filePath: '',
	isSource: false,
};

describe('basic', () => {
	it('should match if token is of type fontSizes', () => {
		expect(
			matcher({
				...defaultToken,
				type: 'fontSizes',
			})
		).toBeTruthy();
	});

	it('should not match if token is not of type fontSizes', () => {
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
					value: '16 * 4.125',
					type: 'fontSizes',
				},
				{}
			)
		).toEqual('calc(16 * 4.125)');
	});
});
