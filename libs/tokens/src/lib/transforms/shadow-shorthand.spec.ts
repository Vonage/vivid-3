import shadowShorthand from './shadow-shorthand';

const { transformer, matcher } = shadowShorthand;

const defaultToken = {
	value: undefined,
	name: '',
	path: [],
	original: undefined,
	filePath: '',
	isSource: false,
};

const token = {
	...defaultToken,
	type: 'boxShadow',
	attributes: {
		category: 'shadow',
	},
	value: [
		{
			x: '0',
			y: '2',
			blur: '1',
			spread: '0',
			color: '#0000000d',
			type: 'dropShadow',
		},
		{
			x: '0',
			y: '1',
			blur: '2',
			spread: '0',
			color: '#0000000d',
			type: 'innerShadow',
		},
		{
			x: '0',
			y: '1',
			blur: '4',
			spread: '0',
			color: '#0000001a',
			type: 'innerShadow',
		},
	],
};

const expectedParsedEffects =
	'drop-shadow(0px 2px 1px #0000000d) drop-shadow(0px 1px 2px #0000000d) drop-shadow(0px 1px 4px #0000001a)';

describe('basic', () => {
	it('should transform array of drop shadows to single token value', () => {
		expect(transformer(token, {})).toEqual(expectedParsedEffects);
	});

	it('should ignore already parsed value', () => {
		expect(
			transformer({ ...defaultToken, value: expectedParsedEffects }, {})
		).toEqual(expectedParsedEffects);
	});

	it('should match if category and type comply to a shadow type', () => {
		expect(matcher({ ...defaultToken, attributes: {} })).toEqual(false);
		expect(
			matcher({
				...defaultToken,
				type: 'boxShadow',
				attributes: { category: 'something-with-shadow' },
			})
		).toEqual(true);
		expect(matcher(token)).toEqual(true);
	});
});
