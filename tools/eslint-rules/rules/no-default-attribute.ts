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

// NOTE: The rule will be available in ESLint configs as "@nrwl/nx/workspace/no-default-attribute"
export const RULE_NAME = 'no-default-attribute';

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
      attrDecorator: 'attr decorator assigned with a default value (unless configured to \'fromView\' mode) will mutate the custom element in the DOM light tree.'
    },
  },
  defaultOptions: [],
  create(context) {
    return {
    'Decorator[expression.name="attr"]'(node: TSESTree.Decorator) {
      context.report({
        node,
        messageId: "attrDecorator"
      });
    }
  };
  },
});
