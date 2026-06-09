import type { AttributeMode } from '@microsoft/fast-element';
import { ASTUtils, ESLintUtils, type TSESTree } from '@typescript-eslint/utils';
import type { Rule } from 'eslint';

export const rule = ESLintUtils.RuleCreator(() => 'https://vonage.vivid.com')({
	name: 'no-attribute-default-value',
	meta: {
		type: 'problem',
		docs: {
			description: ``,
		},
		schema: [],
		messages: {
			noAttributeDefaultValue:
				"'attr' decorator assigned with a default value (unless mode is set to 'fromView', or, to 'boolean' assigned to false) will mutate the custom element in the DOM light tree.",
		},
	},
	defaultOptions: [],
	create(context) {
		return {
			'Decorator:matches([expression.name=attr], [expression.callee.name=attr])'(
				node: TSESTree.Decorator
			) {
				const parent = node.parent as TSESTree.PropertyDefinition;

				if (parent.type !== 'PropertyDefinition' || parent.value === null)
					return; // if is not a 'PropertyDefinition' or no value is provided, we're good

				const { expression } = node;

				if (isNullish(parent)) {
					return;
				}

				if (expression.type === 'CallExpression') {
					const { arguments: args } = expression;

					const props = args.flatMap((arg) =>
						arg.type === 'ObjectExpression'
							? (arg.properties as TSESTree.Property[])
							: []
					);

					const modeValue = getAttrReflectionModeValue(props);

					if (
						isFromView(modeValue) ||
						isFalseBoolean(modeValue, parent) ||
						isNullish(parent)
					) {
						return;
					}
				}

				context.report({
					node: parent.value,
					messageId: 'noAttributeDefaultValue',
				});
			},
		};
	},
}) as unknown as Rule.RuleModule;

function getAttrReflectionModeValue(props: TSESTree.Property[]): AttributeMode {
	return props
		.filter(
			({ key, value }) =>
				ASTUtils.isIdentifier(key) &&
				value.type === 'Literal' &&
				key.name === 'mode'
		)
		.map(
			({ value }: TSESTree.Property) => (value as TSESTree.Literal).value
		)[0] as AttributeMode;
}

function isFromView(modeValue: AttributeMode) {
	return modeValue === 'fromView';
}

function isFalseBoolean(
	modeValue: AttributeMode,
	parent: TSESTree.PropertyDefinition
): boolean {
	return (
		modeValue === 'boolean' &&
		(parent.value as TSESTree.Literal).value === false
	);
}

function isNullish(parent: TSESTree.PropertyDefinition): boolean {
	return (parent.value as TSESTree.Literal).value === null;
}
