"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicPageFindMethodAdvice = void 0;
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const util_1 = require("../util");
const findMethods = ['findAll', 'findAllWithCriteria', 'findOne'];
exports.dynamicPageFindMethodAdvice = (0, util_1.createPluginRule)({
    name: 'dynamic-page-find-method-advice',
    meta: {
        docs: {
            description: 'Advice on using the find*() family of methods',
        },
        messages: {
            advice: 'When using the dynamic-page manifest field, remember to call figma.loadAllPagesAsync() before using DocumentNode.{{method}}(). loadAllPagesAsync() only needs to be called once.',
        },
        schema: [],
        type: 'suggestion',
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
                if (!findMethods.includes(calleeProp.name)) {
                    return;
                }
                const receiver = callee.object;
                const match = (0, util_1.matchAncestorTypes)(context, receiver, ['DocumentNode']);
                if (!match) {
                    return;
                }
                context.report({
                    node,
                    messageId: 'advice',
                    data: { method: calleeProp.name },
                });
            },
        };
    },
});
