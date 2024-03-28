"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.banDeprecatedSyncPropGetters = void 0;
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const util_1 = require("../util");
const deprecatedSyncPropGetters = [
    {
        property: 'instances',
        replacement: 'getInstancesAsync',
        receiverTypes: ['ComponentNode'],
    },
    {
        property: 'consumers',
        replacement: 'getConsumersAsync',
        receiverTypes: ['BaseStyle'],
    },
    {
        property: 'mainComponent',
        replacement: 'getMainComponentAsync',
        receiverTypes: ['InstanceNode'],
    },
];
exports.banDeprecatedSyncPropGetters = (0, util_1.createPluginRule)({
    name: 'ban-deprecated-sync-prop-getters',
    meta: {
        docs: {
            description: 'Ban use of deprecated synchronous property getters',
        },
        fixable: 'code',
        messages: {
            useReplacement: 'Reading from {{receiverType}}.{{property}} is deprecated. Please use {{replacement}} instead.',
        },
        schema: [],
        type: 'problem',
    },
    defaultOptions: [],
    create(context) {
        return {
            MemberExpression(node) {
                // allow the expression to be used in an assignment
                const parent = node.parent;
                if (parent && parent.type === typescript_estree_1.AST_NODE_TYPES.AssignmentExpression && parent.left === node) {
                    return;
                }
                const prop = node.property;
                if (prop.type !== typescript_estree_1.AST_NODE_TYPES.Identifier) {
                    return;
                }
                const deprecation = deprecatedSyncPropGetters.find((g) => g.property === prop.name);
                if (!deprecation) {
                    return;
                }
                const receiver = node.object;
                const match = (0, util_1.matchAncestorTypes)(context, receiver, deprecation.receiverTypes);
                if (!match) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'useReplacement',
                    data: {
                        receiverType: (0, util_1.getTypeName)(match.nodeType, match.matchedAncestorType),
                        property: deprecation.property,
                        replacement: deprecation.replacement,
                    },
                    fix(fixer) {
                        return (0, util_1.addAsyncCallFix)({
                            context,
                            fixer,
                            expression: node,
                            receiver,
                            asyncIdentifier: deprecation.replacement,
                            args: [],
                        });
                    },
                });
            },
        };
    },
});
