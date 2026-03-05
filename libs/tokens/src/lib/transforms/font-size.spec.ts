import type {
	Config,
	TransformedToken,
	PlatformConfig,
} from 'style-dictionary/types';
import fontSize from './font-size';

const { transform, filter } = fontSize;

const defaultToken: Partial<TransformedToken> = {
	value: undefined,
	name: '',
	path: [],
	original: undefined,
	filePath: '',
	isSource: false,
};

const config = {} as Config;
const platformConfig = {} as PlatformConfig;

const matcher = (token: Partial<TransformedToken>) =>
	filter(token as TransformedToken, config);

const transformer = (token: Partial<TransformedToken>) =>
	transform(token as TransformedToken, platformConfig, config);

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
			transformer({
				...defaultToken,
				value: '16 * 4.125',
				type: 'fontSizes',
			})
		).toEqual('calc(16 * 4.125)');
	});
});
