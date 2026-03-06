import type {
	Config,
	TransformedToken,
	PlatformConfig,
} from 'style-dictionary/types';
import resolveMath from './resolve-math';

const { transform, filter } = resolveMath;

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
	it('should evaluate math expression', () => {
		expect(
			transformer({
				...defaultToken,
				value: '4 * 3.72',
				type: 'sizing',
			})
		).toEqual('14.88');
	});

	it('should throw', () => {
		expect(transformer({ ...defaultToken })).toEqual('undefined');
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
