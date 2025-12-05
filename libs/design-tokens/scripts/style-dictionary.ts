import type { Config } from 'style-dictionary';
import StyleDictionary from 'style-dictionary';
import { cssConfig, cssPlatform } from './css/css.config';
import { flutterConfig, flutterPlatform } from './flutter/flutter.config';

const config: Config = {
	source: ['src/*.dtcg.json'],
	hooks: {
		actions: {
			...cssConfig.actions,
			...flutterConfig.actions,
		},
		transforms: {
			...cssConfig.transforms,
			...flutterConfig.transforms,
		},
	},
	platforms: {
		css: cssPlatform,
		flutter: flutterPlatform,
	},
};

export const styleDictionary = new StyleDictionary(config);
