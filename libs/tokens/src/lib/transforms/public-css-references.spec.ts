import type {
	Config,
	TransformedToken,
	PlatformConfig,
} from 'style-dictionary/types';
import publicCssReferences from './public-css-references';

const { transform, filter } = publicCssReferences;

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
			transformer({
				...defaultToken,
				name: 'vvd-size-font-scale-base',
				value: '16',
				type: 'sizing',
				public: true,
			})
		).toEqual('var(--vvd-size-font-scale-base, 16)');
	});
});
