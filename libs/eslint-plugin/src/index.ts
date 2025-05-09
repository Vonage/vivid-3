import type { ESLint } from 'eslint';
import { accessibleNames } from './rules/accessible-names';
import { noAnchorAttribute } from './rules/no-anchor-attribute';
import { noCurrentValueAttribute } from './rules/no-current-value-attribute';
import { noDeprecatedAPIs } from './rules/no-deprecated-apis';
import { noIdrefAriaAttribute } from './rules/no-idref-aria-attribute';
import { noInaccessibleEvents } from './rules/no-inaccessible-events';
import { noSlotAttribute } from './rules/no-slot-attribute';
import { noValueAttribute } from './rules/no-value-attribute';

const rules = {
	'@vonage/vivid/no-deprecated-apis': 'error',
	'@vonage/vivid/accessible-names': 'error',
	'@vonage/vivid/no-inaccessible-events': 'error',
	'@vonage/vivid/no-anchor-attribute': 'error',
	'@vonage/vivid/no-slot-attribute': 'error',
	'@vonage/vivid/no-value-attribute': 'error',
	'@vonage/vivid/no-current-value-attribute': 'error',
	'@vonage/vivid/no-idref-aria-attribute': 'error',
} as const;

const eslintPluginVivid: ESLint.Plugin = {
	configs: {
		vue: {
			plugins: ['@vonage/vivid'],
			rules,
		},
	},
	rules: {
		'no-deprecated-apis': noDeprecatedAPIs,
		'accessible-names': accessibleNames,
		'no-inaccessible-events': noInaccessibleEvents,
		'no-anchor-attribute': noAnchorAttribute,
		'no-slot-attribute': noSlotAttribute,
		'no-value-attribute': noValueAttribute,
		'no-current-value-attribute': noCurrentValueAttribute,
		'no-idref-aria-attribute': noIdrefAriaAttribute,
	},
};

Object.assign(eslintPluginVivid.configs!, {
	'flat/vue': [
		{
			plugins: {
				'@vonage/vivid': eslintPluginVivid,
			},
			rules,
		},
	],
});

export default eslintPluginVivid;
