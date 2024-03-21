import typographyShorthand from './typography-shorthand';

const { transformer, matcher } = typographyShorthand;

const defualtToken = {
	value: undefined,
	name: '',
	path: [],
	original: undefined,
	filePath: '',
	isSource: false,
};

const token = {
	type: 'typography',
	attributes: {
		category: 'font',
	},
	value: {
		fontFamily: 'SpeziaMonoCompleteVariable',
		fontWeight: 'Regular',
		lineHeight: '{size.font.base} * 1',
		fontSize: '{size.font.base} * 0.75',
	},
};

const expectedParsedEffects =
	'Regular {size.font.base} * 0.75/{size.font.base} * 1 SpeziaMonoCompleteVariable';

describe('basic', () => {
	it('should transform object of typography to a font shorthand value', () => {
		expect(
			transformer(
				{
					...defualtToken,
					...token,
				},
				{}
			)
		).toEqual(expectedParsedEffects);
	});

	it('should match if category and type comply to a font type', () => {
		expect(
			matcher({
				...defualtToken,
				attributes: {},
			})
		).toEqual(false);
		expect(
			matcher({
				...defualtToken,
				...token,
			})
		).toEqual(true);
	});
});
