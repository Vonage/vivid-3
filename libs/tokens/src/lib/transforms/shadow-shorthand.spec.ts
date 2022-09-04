export {}
const { transformer, matcher } = require('./shadow-shorthand');

const token = {
	type: 'boxShadow',
	attributes: {
		category: 'shadow'
	},
	value: [
		{
			x: '0',
			y: '2px',
			blur: '1px',
			spread: '0',
			color: '#0000000d',
			type: 'dropShadow'
		},
		{
			x: '0',
			y: '1px',
			blur: '2px',
			spread: '0',
			color: '#0000000d',
			type: 'innerShadow'
		},
		{
			x: '0',
			y: '1px',
			blur: '4px',
			spread: '0',
			color: '#0000001a',
			type: 'innerShadow'
		}
	]
};

const expectedParsedEffects = 'drop-shadow(0px 2px 1px #0000000d) drop-shadow(0px 1px 2px #0000000d) drop-shadow(0px 1px 4px #0000001a)';

describe('basic', () => {
	it('should transform array of drop shadows to single token value', () => {
		expect(transformer(token)).toEqual(expectedParsedEffects);
	});

	it('should ignore already parsed value', () => {
		expect(transformer({ value: expectedParsedEffects }))
			.toEqual(expectedParsedEffects);
	});

	it('should match if category and type comply to a shadow type', () => {
		expect(matcher({ attributes: {}})).toEqual(false);
		expect(matcher(token)).toEqual(true);
	});
});
