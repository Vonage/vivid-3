/**
 * This file sets you up with with structure needed for an ESLint rule.
 *
 * It leverages utilities from @typescript-eslint to allow TypeScript to
 * provide autocompletions etc for the configuration.
 *
 * Your rule's custom logic will live within the create() method below
 * and you can learn more about writing ESLint rules on the official guide:
 *
 * https://eslint.org/docs/developer-guide/working-with-rules
 *
 * You can also view many examples of existing rules here:
 *
 * https://github.com/typescript-eslint/typescript-eslint/tree/master/packages/eslint-plugin/src/rules
 */

import { AttributeMode } from '@microsoft/fast-element';
import { ESLintUtils, TSESTree, ASTUtils } from '@typescript-eslint/experimental-utils';

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/no-attribute-default-value"
export const RULE_NAME = 'no-attribute-default-value';

export const rule = ESLintUtils.RuleCreator(() => __filename)({
  name: RULE_NAME,
  meta: {
    type: 'problem',
    docs: {
      description: ``,
      recommended: 'error',
    },
    schema: [],
    messages: {
      noAttributeDefaultValue: '\'attr\' decorator assigned with a default value (unless mode is set to \'fromView\', or, to \'boolean\' assigned to false) will mutate the custom element in the DOM light tree.'
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      'Decorator:matches([expression.name=attr], [expression.callee.name=attr])'(node: TSESTree.Decorator) {

        const parent = node.parent as TSESTree.PropertyDefinition;

        if (parent.type !== 'PropertyDefinition' || parent.value === null) return; // if is not a 'PropertyDefinition' or no value is provided, we're good

        const { expression } = node;

        if (expression.type === 'CallExpression') {

          const { arguments: args } = expression;

          const props = args.flatMap(arg =>
            arg.type === 'ObjectExpression'
            && arg.properties
          );

          const modeValue = getAttrReflectionModeValue(props);

          if (isFromView(modeValue) || isFalseBoolean(modeValue, parent)) {
            return;
          }
        }

        context.report({
          node: parent.value,
          messageId: "noAttributeDefaultValue"
        });
      }
    };
  },
});

function getAttrReflectionModeValue(props: TSESTree.ObjectLiteralElement[]): AttributeMode {
  return props
    .filter(({ key, value }: TSESTree.Property) => ASTUtils.isIdentifier(key)
      && value.type === 'Literal'
      && key.name === 'mode'
    )
    .map(({ value }: TSESTree.Property) => (value as TSESTree.Literal).value)[0] as AttributeMode;
}

function isFromView(modeValue: AttributeMode) {
  return modeValue === 'fromView';
}

function isFalseBoolean(modeValue: AttributeMode, parent: TSESTree.PropertyDefinition): boolean {
  return modeValue === 'boolean' && (parent.value as TSESTree.Literal).value === false;
}

