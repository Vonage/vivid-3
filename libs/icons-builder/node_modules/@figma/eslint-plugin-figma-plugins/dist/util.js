"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isStringNode = exports.getTypeName = exports.traverseTree = exports.TraverseTreeResult = exports.matchAncestorTypes = exports.addAsyncCallFix = exports.createPluginRule = void 0;
const utils_1 = require("@typescript-eslint/utils");
const typescript_1 = __importDefault(require("typescript"));
exports.createPluginRule = utils_1.ESLintUtils.RuleCreator((name) => `https://github.com/figma/eslint-plugin-figma-plugins/blob/main/docs/rules/${name}.md`);
function mapIdentity(val, _index) {
    return val;
}
function addAsyncCallFix({ context, fixer, expression, receiver, asyncIdentifier, args, argsPostProcessor, }) {
    const doParens = receiver.type !== utils_1.AST_NODE_TYPES.Identifier &&
        receiver.type !== utils_1.AST_NODE_TYPES.MemberExpression &&
        receiver.type !== utils_1.AST_NODE_TYPES.CallExpression;
    let rcvSrc = context.sourceCode.getText(receiver);
    rcvSrc = doParens ? `(${rcvSrc})` : rcvSrc;
    const paramsSrc = args
        .map((a) => context.sourceCode.getText(a))
        .map(argsPostProcessor !== null && argsPostProcessor !== void 0 ? argsPostProcessor : mapIdentity)
        .join(', ');
    return fixer.replaceText(expression, `await ${rcvSrc}.${asyncIdentifier}(${paramsSrc})`);
}
exports.addAsyncCallFix = addAsyncCallFix;
function matchAncestorTypes(context, node, ancestorTypes) {
    const type = utils_1.ESLintUtils.getParserServices(context).getTypeAtLocation(node);
    const match = ancestorTypes.find((name) => composedOfTypeWithName(type, name));
    return match ? { nodeType: type, matchedAncestorType: match } : undefined;
}
exports.matchAncestorTypes = matchAncestorTypes;
var TraverseTreeResult;
(function (TraverseTreeResult) {
    TraverseTreeResult[TraverseTreeResult["Continue"] = 0] = "Continue";
    TraverseTreeResult[TraverseTreeResult["SkipChildren"] = 1] = "SkipChildren";
    TraverseTreeResult[TraverseTreeResult["Done"] = 2] = "Done";
})(TraverseTreeResult || (exports.TraverseTreeResult = TraverseTreeResult = {}));
/**
 * Traverse a TSESTree.Node tree in depth-first order. The visitor function can
 * indicate whether to continue traversing the node's children, skip the node's
 * children, or stop traversing altogether.
 */
function traverseTree(root, visitor) {
    traverseTreeRecursive(root, visitor);
}
exports.traverseTree = traverseTree;
function traverseTreeRecursive(node, visitor) {
    // This algorithm is provided by:
    // github.com/typescript-eslint/typescript-eslint/blob/705370ac0d9c54081657b8855b398e57d6ea4ddb/packages/typescript-estree/src/simple-traverse.ts
    const result = visitor(node);
    if (result === TraverseTreeResult.Done) {
        return TraverseTreeResult.Done;
    }
    if (result === TraverseTreeResult.SkipChildren) {
        return;
    }
    for (const [k, childOrChildren] of Object.entries(node)) {
        // Avoid cycles. Ideally, we could restrict this to an even narrower set of
        // keys, but it's a lot of work to inventory all possible keys containing
        // child nodes, and it wouldn't be future-proof.
        if (k === 'parent') {
            continue;
        }
        if (isValidNode(childOrChildren)) {
            if (traverseTreeRecursive(childOrChildren, visitor) === TraverseTreeResult.Done) {
                return TraverseTreeResult.Done;
            }
        }
        else if (Array.isArray(childOrChildren)) {
            for (const child of childOrChildren) {
                if (!isValidNode(child)) {
                    // We're not in an array of children, so let's just skip this key
                    break;
                }
                if (traverseTreeRecursive(child, visitor) === TraverseTreeResult.Done) {
                    return TraverseTreeResult.Done;
                }
            }
        }
    }
}
/**
 * This is a duck-type test to determine whether a value is a TSESTree.Node. It
 * is not particularly bulletproof, and I'd suggest not using it unless you can
 * guarantee that the input value is either a node or comes from a node.
 */
function isValidNode(x) {
    return typeof x === 'object' && x != null && 'type' in x && typeof x.type === 'string';
}
function composedOfTypeWithName(t, typeName) {
    if (t.symbol && t.symbol.name === typeName) {
        return true;
    }
    if (t.aliasSymbol && t.aliasSymbol.name === typeName) {
        return true;
    }
    if (t.isUnion()) {
        return t.types.some((t) => composedOfTypeWithName(t, typeName));
    }
    if (t.isIntersection()) {
        return t.types.some((t) => composedOfTypeWithName(t, typeName));
    }
    const baseTypes = t.getBaseTypes();
    if (baseTypes) {
        return baseTypes.some((t) => composedOfTypeWithName(t, typeName));
    }
    return false;
}
/**
 * When running these rules from tests, sometimes a TypeScript Type object's
 * symbol property is undefined, contrary to the type declaration. This seems to
 * happen when an expression has a named type, but the type does not to resolve
 * to anything that the typechecker knows about.
 *
 * The discrepancy between the compiler API and its type definitions may be due
 * to this bug: https://github.com/microsoft/TypeScript/issues/13165
 *
 * As a workaround, we use two fallbacks, in order of priority:
 * - aliasSymbol.escapedName
 * - the fallback argument, which should be the type we searched for in
 *   matchAncestorTypes()
 */
function getTypeName(t, fallback) {
    var _a, _b, _c, _d;
    return (_d = (_b = (_a = t.symbol) === null || _a === void 0 ? void 0 : _a.name) !== null && _b !== void 0 ? _b : (_c = t.aliasSymbol) === null || _c === void 0 ? void 0 : _c.escapedName) !== null && _d !== void 0 ? _d : fallback;
}
exports.getTypeName = getTypeName;
function isStringNode(context, node) {
    const type = utils_1.ESLintUtils.getParserServices(context).getTypeAtLocation(node);
    return !!(type.flags & typescript_1.default.TypeFlags.StringLike);
}
exports.isStringNode = isStringNode;
