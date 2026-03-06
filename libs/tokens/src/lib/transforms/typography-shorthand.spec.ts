import type {
	Config,
	TransformedToken,
	PlatformConfig,
} from 'style-dictionary/types';
import typographyShorthand from './typography-shorthand';

const { transform, filter } = typographyShorthand;

const defualtToken: Partial<TransformedToken> = {
	value: undefined,
	name: '',
	path: [],
	original: undefined,
	filePath: '',
	isSource: false,
};

const token: Partial<TransformedToken> = {
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

const config = {} as Config;
const platformConfig = {} as PlatformConfig;

const matcher = (token: Partial<TransformedToken>) =>
	filter(token as TransformedToken, config);

const transformer = (token: Partial<TransformedToken>) =>
	transform(token as TransformedToken, platformConfig, config);

describe('basic', () => {
	it('should transform object of typography to a font shorthand value', () => {
		expect(
			transformer({
				...defualtToken,
				...token,
			})
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
