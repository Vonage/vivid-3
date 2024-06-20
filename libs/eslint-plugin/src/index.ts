import type { ESLint } from 'eslint';
import { noDeprecatedAPIs } from './rules/no-deprecated-apis';
import { noInaccessibleEvents } from './rules/no-inaccessible-events';
import { noAnchorAttribute } from './rules/no-anchor-attribute';
import { noSlotAttribute } from './rules/no-slot-attribute';

const eslintPluginVivid: ESLint.Plugin = {
	configs: {
		vue: {
			plugins: ['@vonage/vivid'],
			rules: {
				'@vonage/vivid/no-deprecated-apis': 'error',
				'@vonage/vivid/no-inaccessible-events': 'error',
				'@vonage/vivid/no-anchor-attribute': 'error',
				'@vonage/vivid/no-slot-attribute': 'error',
			},
		},
	},
	rules: {
		'no-deprecated-apis': noDeprecatedAPIs,
		'no-inaccessible-events': noInaccessibleEvents,
		'no-anchor-attribute': noAnchorAttribute,
		'no-slot-attribute': noSlotAttribute,
	},
};

export default eslintPluginVivid;
