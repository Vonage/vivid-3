import { rule as noAttributeDefaultValue } from './rules/no-attribute-default-value';
import { rule as underscoreMemberRequiresInternal } from './rules/underscore-member-requires-internal';
import type { ESLint } from 'eslint';

const eslintPlugin: ESLint.Plugin = {
	rules: {
		'no-attribute-default-value': noAttributeDefaultValue,
		'underscore-member-requires-internal': underscoreMemberRequiresInternal,
	},
};

export default eslintPlugin;
