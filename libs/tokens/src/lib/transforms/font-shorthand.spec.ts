import { fontShorthand } from './font-shorthand';

const { transformer, matcher } = fontShorthand;

const token = {
	type: 'typography',
	attributes: {
		category: 'font'
	},
	value: {
		fontFamily: "SpeziaMonoCompleteVariable",
		fontWeight: "Regular",
		lineHeight: "{size.font.base} * 1",
		fontSize: "{size.font.base} * 0.75"
	}
};

const expectedParsedEffects = '400 ultra-condensed calc({size.font.base} * 0.75)/calc({size.font.base} * 1) SpeziaMonoCompleteVariable';

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
