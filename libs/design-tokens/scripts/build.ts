import type { Config } from 'style-dictionary';
import StyleDictionary from 'style-dictionary';
import { cssConfig, cssPlatform } from './css.config';

const config: Config = {
	source: ['src/*.dtcg.json'],
	hooks: {
		...cssConfig,
	},
	platforms: {
		css: cssPlatform,
	},
	log: {
		verbosity: 'verbose',
	},
};

const styleDictionary = new StyleDictionary(config);
await styleDictionary.buildAllPlatforms();
