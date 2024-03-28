"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.awaitRequiresAsync = void 0;
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const util_1 = require("../util");
/**
 * This rule requires that functions containing the `await` keyword be marked
 * `async`. It's quite a bit more generic than we want for this rule package,
 * and overlaps with a feature already present in the VSCode TypeScript
 * extension. Nevertheless, we offer it so that we can add `async` modifiers to
 * functions via a full-file autofix (e.g. eslint --fix).
 *
 * Note that this rule covers all cases where `await` is present without
 * `async`. Ideally, the fix in this rule would be restricted to cases where
 * another fix in this package creates an `await` inside of a function that is
 * not async. However, these two fixes cannot co-exist in the same eslint report;
 * adding an `async` modifier applies to the entire function, and is considered
 * "overlapping" with the fix that adds `await`. eslint reports do not permit
 * overlapping fixes.
 */
exports.awaitRequiresAsync = (0, util_1.createPluginRule)({
    name: 'await-requires-async',
    meta: {
        docs: {
            description: 'Require functions that contain `await` to be `async`',
        },
        fixable: 'code',
        messages: {
            requiresAsync: 'Functions containing the await keyword should be marked async.',
        },
        schema: [],
        type: 'problem',
    },
    defaultOptions: [],
    create(context) {
        return {
            ArrowFunctionExpression(node) {
                runRule(context, node);
            },
            FunctionDeclaration(node) {
                runRule(context, node);
            },
            FunctionExpression(node) {
                runRule(context, node);
            },
        };
    },
});
function containsAwait(containingNode) {
    let found = false;
    (0, util_1.traverseTree)(containingNode, (node) => {
        if (node.type === typescript_estree_1.AST_NODE_TYPES.AwaitExpression) {
            found = true;
            return util_1.TraverseTreeResult.Done;
        }
        // Ignore `await` in nested functions
        if (node.type === typescript_estree_1.AST_NODE_TYPES.ArrowFunctionExpression ||
            node.type === typescript_estree_1.AST_NODE_TYPES.FunctionDeclaration ||
            node.type === typescript_estree_1.AST_NODE_TYPES.FunctionExpression) {
            return util_1.TraverseTreeResult.SkipChildren;
        }
        return util_1.TraverseTreeResult.Continue;
    });
    return found;
}
function runRule(context, funcNode) {
    if (funcNode.async) {
        return;
    }
    if (!containsAwait(funcNode.body)) {
        return;
    }
    context.report({
        node: funcNode,
        messageId: 'requiresAsync',
        fix(fixer) {
            const src = context.sourceCode.getText(funcNode);
            return fixer.replaceText(funcNode, `async ${src}`);
        },
    });
}
