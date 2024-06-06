import type { ESLint } from 'eslint';
import { noDeprecatedAPIs } from './rules/no-deprecated-apis';
import { noInaccessibleEvents } from './rules/no-inaccessible-events';

const eslintPluginVivid: ESLint.Plugin = {
	configs: {
		vue: {
			plugins: ['@vonage/vivid'],
			rules: {
				'@vonage/vivid/no-deprecated-apis': 'error',
				'@vonage/vivid/no-inaccessible-events': 'error',
			},
		},
	},
	rules: {
		'no-deprecated-apis': noDeprecatedAPIs,
		'no-inaccessible-events': noInaccessibleEvents,
	},
};

export default eslintPluginVivid;
