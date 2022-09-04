export {}
const { transformer, matcher } = require('./font-shorthand');

const token = {
	type: 'typography',
	attributes: {
		category: 'font'
	},
	value: {
		fontFamily: "SpeziaCompleteVariableUpright",
		fontWeight: "500",
		lineHeight: "68",
		fontSize: "52",
		fontStretch: "condensed"
	}
};

const expectedParsedEffects = '500 condensed 52/68 SpeziaCompleteVariableUpright';

describe('basic', () => {
	it('should transform object of typography to a font shorthand value', () => {
		expect(transformer(token)).toEqual(expectedParsedEffects);
	});

	it('should ignore already parsed value', () => {
		expect(transformer({ value: expectedParsedEffects }))
			.toEqual(expectedParsedEffects);
	});

	it('should match if category and type comply to a font type', () => {
		expect(matcher({ attributes: {}})).toEqual(false);
		expect(matcher(token)).toEqual(true);
	});
});
