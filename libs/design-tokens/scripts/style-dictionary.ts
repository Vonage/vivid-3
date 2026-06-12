import type { Config } from 'style-dictionary/types';
import StyleDictionary from 'style-dictionary';
import { cssConfig, createCssPlatform, type Theme } from './css/css.config';
import { flutterConfig, flutterPlatform } from './flutter/flutter.config';

// Global tokens that apply to both themes, excluding the elevation size file
// (elevation tokens are defined completely in each theme's elevation.color.dtcg.json)
const globalSource = [
	'src/global/core/border/**/*.dtcg.json',
	'src/global/core/color/**/*.dtcg.json',
	'src/global/core/size/**/*.dtcg.json',
	'src/global/core/text/**/*.dtcg.json',
	'src/global/pattern/**/*.dtcg.json',
	'src/global/semantic/**/*.dtcg.json',
];

function createCssConfig(theme: Theme): Config {
	return {
		source: [
			...globalSource,
			`src/theme/${theme}/**/*.dtcg.json`,
		],
		hooks: {
			actions: cssConfig.actions,
			transforms: cssConfig.transforms,
			formats: cssConfig.formats,
		},
		platforms: {
			css: createCssPlatform(theme),
		},
	};
}

export const lightStyleDictionary = new StyleDictionary(createCssConfig('light'));
export const darkStyleDictionary = new StyleDictionary(createCssConfig('dark'));

// Combined light-theme instance exposing both CSS and Flutter platforms,
// used by the docs build to browse and render token data.
export const styleDictionary = new StyleDictionary({
	source: [...globalSource, 'src/theme/light/**/*.dtcg.json'],
	hooks: {
		actions: { ...cssConfig.actions, ...flutterConfig.actions },
		transforms: { ...cssConfig.transforms, ...flutterConfig.transforms },
		formats: { ...cssConfig.formats, ...flutterConfig.formats },
	},
	platforms: {
		css: createCssPlatform('light'),
		flutter: flutterPlatform,
	},
});

export const flutterStyleDictionary = new StyleDictionary({
	source: [
		...globalSource,
		'src/theme/light/**/*.dtcg.json',
	],
	hooks: {
		actions: flutterConfig.actions,
		transforms: flutterConfig.transforms,
		formats: flutterConfig.formats,
	},
	platforms: {
		flutter: flutterPlatform,
	},
});
