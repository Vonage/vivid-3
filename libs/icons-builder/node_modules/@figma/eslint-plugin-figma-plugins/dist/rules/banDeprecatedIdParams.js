"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.banDeprecatedIdParams = void 0;
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const util_1 = require("../util");
const deprecatedIdParams = [
    {
        receiverType: 'VariablesAPI',
        method: 'createVariable',
        paramIndex: 1,
        wantParamType: 'VariableCollection',
        asyncObjectFetch: 'figma.variables.getVariableCollectionByIdAsync',
    },
    {
        receiverType: 'ExplicitVariableModesMixin',
        method: 'setExplicitVariableModeForCollection',
        paramIndex: 0,
        wantParamType: 'VariableCollection',
        asyncObjectFetch: 'figma.variables.getVariableCollectionByIdAsync',
    },
    {
        receiverType: 'ExplicitVariableModesMixin',
        method: 'clearExplicitVariableModeForCollection',
        paramIndex: 0,
        wantParamType: 'VariableCollection',
        asyncObjectFetch: 'figma.variables.getVariableCollectionByIdAsync',
    },
    {
        receiverType: 'SceneNodeMixin',
        method: 'setBoundVariable',
        paramIndex: 1,
        wantParamType: 'Variable',
        asyncObjectFetch: 'figma.variables.getVariableByIdAsync',
    },
];
exports.banDeprecatedIdParams = (0, util_1.createPluginRule)({
    name: 'ban-deprecated-id-params',
    meta: {
        docs: {
            description: 'Ban use of deprecated string ID parameters',
        },
        fixable: 'code',
        messages: {
            useReplacement: 'Passing a string ID for parameter {{humanReadableParamIndex}} to {{receiverType}}.{{method}} is deprecated. Please pass a {{wantParamType}} instead.',
        },
        schema: [],
        type: 'problem',
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                const callee = node.callee;
                if (callee.type !== typescript_estree_1.AST_NODE_TYPES.MemberExpression) {
                    return;
                }
                const calleeProp = callee.property;
                if (calleeProp.type !== typescript_estree_1.AST_NODE_TYPES.Identifier) {
                    return;
                }
                const deprecation = deprecatedIdParams.find((p) => p.method === calleeProp.name);
                if (!deprecation) {
                    return;
                }
                const receiver = callee.object;
                const match = (0, util_1.matchAncestorTypes)(context, receiver, [deprecation.receiverType]);
                if (!match) {
                    return;
                }
                const arg = node.arguments[deprecation.paramIndex];
                if (!arg) {
                    return;
                }
                if (!(0, util_1.isStringNode)(context, arg)) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'useReplacement',
                    data: {
                        humanReadableParamIndex: deprecation.paramIndex + 1,
                        receiverType: (0, util_1.getTypeName)(match.nodeType, match.matchedAncestorType),
                        method: deprecation.method,
                        wantParamType: deprecation.wantParamType,
                    },
                    fix(fixer) {
                        const argText = context.sourceCode.getText(arg);
                        return fixer.replaceText(arg, `await ${deprecation.asyncObjectFetch}(${argText})`);
                    },
                });
            },
        };
    },
});
