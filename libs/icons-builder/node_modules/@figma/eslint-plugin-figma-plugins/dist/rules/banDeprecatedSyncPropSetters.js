"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.banDeprecatedSyncPropSetters = void 0;
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const util_1 = require("../util");
const DeprecatedSyncPropSetters = [
    {
        property: 'currentPage',
        replacement: 'setCurrentPageAsync',
        receiverTypes: ['PluginAPI'],
    },
    {
        property: 'effectStyleId',
        replacement: 'setEffectStyleIdAsync',
        receiverTypes: ['BlendMixin'],
    },
    {
        property: 'fillStyleId',
        replacement: 'setFillStyleIdAsync',
        receiverTypes: ['MinimalFillsMixin'],
    },
    {
        property: 'gridStyleId',
        replacement: 'setGridStyleIdAsync',
        receiverTypes: ['BaseFrameMixin'],
    },
    {
        property: 'strokeStyleId',
        replacement: 'setStrokeStyleIdAsync',
        receiverTypes: ['MinimalStrokesMixin'],
    },
    {
        property: 'textStyleId',
        replacement: 'setTextStyleIdAsync',
        receiverTypes: ['TextNode'],
    },
    {
        property: 'backgroundStyleId',
        replacement: 'setFillStyleIdAsync',
        receiverTypes: ['DeprecatedBackgroundMixin'],
    },
    {
        property: 'vectorNetwork',
        replacement: 'setVectorNetworkAsync',
        receiverTypes: ['VectorLikeMixin'],
    },
    {
        property: 'reactions',
        replacement: 'setReactionsAsync',
        receiverTypes: ['ReactionMixin'],
    },
];
exports.banDeprecatedSyncPropSetters = (0, util_1.createPluginRule)({
    name: 'ban-deprecated-sync-prop-setters',
    meta: {
        docs: {
            description: 'Ban use of deprecated synchronous property getters',
        },
        fixable: 'code',
        messages: {
            useReplacement: 'Assigning to {{receiverType}}.{{property}} is deprecated. Please use {{replacement}} instead.',
        },
        schema: [],
        type: 'problem',
    },
    defaultOptions: [],
    create(context) {
        return {
            AssignmentExpression(node) {
                if (node.left.type !== typescript_estree_1.AST_NODE_TYPES.MemberExpression) {
                    return;
                }
                const prop = node.left.property;
                if (prop.type !== typescript_estree_1.AST_NODE_TYPES.Identifier) {
                    return;
                }
                const deprecation = DeprecatedSyncPropSetters.find((s) => s.property === prop.name);
                if (!deprecation) {
                    return;
                }
                const receiver = node.left.object;
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
                            args: [node.right],
                        });
                    },
                });
            },
        };
    },
});
