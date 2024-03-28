"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dynamicPageDocumentchangeEventAdvice = void 0;
const typescript_estree_1 = require("@typescript-eslint/typescript-estree");
const util_1 = require("../util");
exports.dynamicPageDocumentchangeEventAdvice = (0, util_1.createPluginRule)({
    name: 'dynamic-page-documentchange-event-advice',
    meta: {
        docs: {
            description: 'Advice on using the `documentchange` event',
        },
        messages: {
            advice: `When using the dynamic-page manifest field, remember to call figma.loadAllPagesAsync() before using DocumentNode.{{method}}(). loadAllPagesAsync() only needs to be called once.`,
        },
        schema: [],
        type: 'suggestion',
    },
    defaultOptions: [],
    create(context) {
        return {
            CallExpression(node) {
                // Check that we're calling one of on(), once(), or off()
                const callee = node.callee;
                if (callee.type !== typescript_estree_1.AST_NODE_TYPES.MemberExpression) {
                    return;
                }
                const calleeProp = callee.property;
                if (calleeProp.type !== typescript_estree_1.AST_NODE_TYPES.Identifier) {
                    return;
                }
                if (calleeProp.name !== 'on' && calleeProp.name !== 'once' && calleeProp.name !== 'off') {
                    return;
                }
                // Check that the first argument is 'documentchange'
                const args = node.arguments;
                if (args.length < 1) {
                    return;
                }
                const eventName = args[0];
                if (eventName.type !== typescript_estree_1.AST_NODE_TYPES.Literal) {
                    return;
                }
                if (eventName.value !== 'documentchange') {
                    return;
                }
                // Ensure that we're calling the event handler method on a PluginAPI instance
                if (!(0, util_1.matchAncestorTypes)(context, callee.object, ['PluginAPI'])) {
                    return;
                }
                context.report({ node, messageId: 'advice' });
            },
        };
    },
});
