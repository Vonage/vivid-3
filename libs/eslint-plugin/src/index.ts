import type { ESLint } from 'eslint';
import { noDeprecatedAPIs } from './rules/no-deprecated-apis';
import { noInaccessibleEvents } from './rules/no-inaccessible-events';
import { noSlotAttribute } from './rules/no-slot-attribute';
import { noValueAttribute } from './rules/no-value-attribute';
import { noCurrentValueAttribute } from './rules/no-current-value-attribute';

const eslintPluginVivid: ESLint.Plugin = {
	configs: {
		vue: {
			plugins: ['@vonage/vivid'],
			rules: {
				'@vonage/vivid/no-deprecated-apis': 'error',
				'@vonage/vivid/no-inaccessible-events': 'error',
				'@vonage/vivid/no-slot-attribute': 'error',
				'@vonage/vivid/no-value-attribute': 'error',
				'@vonage/vivid/no-current-value-attribute': 'error',
			},
		},
	},
	rules: {
		'no-deprecated-apis': noDeprecatedAPIs,
		'no-inaccessible-events': noInaccessibleEvents,
		'no-slot-attribute': noSlotAttribute,
		'no-value-attribute': noValueAttribute,
		'no-current-value-attribute': noCurrentValueAttribute,
	},
};

export default eslintPluginVivid;
