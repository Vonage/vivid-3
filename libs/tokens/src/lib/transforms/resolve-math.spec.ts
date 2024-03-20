import resolveMath from './resolve-math';

const { transformer, matcher } = resolveMath;

const defaultToken = {
	value: undefined,
	name: '',
	path: [],
	original: undefined,
	filePath: '',
	isSource: false,
};

describe('basic', () => {
	it('should evaluate math expression', () => {
		expect(
			transformer(
				{
					...defaultToken,
					value: '4 * 3.72',
					type: 'sizing',
				},
				{}
			)
		).toEqual('14.88');
	});

	it('should throw', () => {
		expect(transformer({ ...defaultToken }, {})).toEqual('undefined');
	});

	it('should match if is token', () => {
		expect(
			matcher({
				...defaultToken,
				type: 'other',
			})
		).toBeFalsy();
		expect(
			matcher({
				...defaultToken,
				type: 'sizing',
			})
		).toBeTruthy();
	});
});
