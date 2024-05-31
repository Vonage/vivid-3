import type { ESLint } from 'eslint';
import { noDeprecatedAPIs } from './rules/no-deprecated-apis';
import { noSlotAttribute } from './rules/no-slot-attribute';

const eslintPluginVivid: ESLint.Plugin = {
	configs: {
		vue: {
			plugins: ['@vonage/vivid'],
			rules: {
				'@vonage/vivid/no-deprecated-apis': 'error',
				'@vonage/vivid/no-slot-attribute': 'error',
			},
		},
	},
	rules: {
		'no-deprecated-apis': noDeprecatedAPIs,
		'no-slot-attribute': noSlotAttribute,
	},
};

export default eslintPluginVivid;
