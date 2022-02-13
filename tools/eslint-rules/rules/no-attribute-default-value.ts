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

import { ESLintUtils, TSESTree } from '@typescript-eslint/experimental-utils';
import { ASTUtils } from '@angular-eslint/utils';

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
      noAttributeDefaultValue: '\'attr\' decorator assigned with a default value (unless configured to \'fromView\' mode) will mutate the custom element in the DOM light tree.'
    },
  },
  defaultOptions: [],
  create(context) {
    return {
      'Decorator:matches([expression.name=attr], [expression.callee.name=attr])'(node: TSESTree.Decorator) {

        const parent = node.parent as TSESTree.PropertyDefinition;

        if (!ASTUtils.isPropertyDefinition(parent) || parent.value === null) return; // if is not a 'PropertyDefinition' or no value is provided, we're good

        const { expression } = node;

        if (ASTUtils.isCallExpression(expression)) {

          const { arguments: args } = expression;

          const props = args.flatMap(arg => ASTUtils.isObjectExpression(arg) && arg.properties);

          const modeValues = props
            .filter(({ key, value }: TSESTree.Property) =>
              // ASTUtils.isIdentifierOrMemberExpression(key)
                key.type === 'Identifier'
              && ASTUtils.isLiteral(value)
              && key.name === 'mode'
            )
            .map(({ value }: TSESTree.Property) => (value as TSESTree.Literal).value);

          const someInvalid = modeValues.some(value => value !== 'fromView');

          if (!someInvalid) { // if all mode values are valid, we're good
            return;
          }
        }

        context.report({
          node,
          messageId: "noAttributeDefaultValue"
        });
    }
  };
  },
});
