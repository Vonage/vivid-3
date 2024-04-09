import type { ESLint } from 'eslint';
import { noDeprecatedAPIs } from './rules/no-deprecated-apis';

const eslintPluginVivid: ESLint.Plugin = {
	configs: {
		vue: {
			plugins: ['@vonage/vivid'],
			rules: {
				'@vonage/vivid/no-deprecated-apis': 'error',
			},
		},
	},
	rules: {
		'no-deprecated-apis': noDeprecatedAPIs,
	},
};

export default eslintPluginVivid;
