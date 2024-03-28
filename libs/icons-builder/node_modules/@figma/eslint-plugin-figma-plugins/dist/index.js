"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.configs = exports.rules = void 0;
const awaitRequiresAsync_1 = require("./rules/awaitRequiresAsync");
const dynamicPageDocumentchangeEventAdvice_1 = require("./rules/dynamicPageDocumentchangeEventAdvice");
const banDeprecatedIdParams_1 = require("./rules/banDeprecatedIdParams");
const banDeprecatedSyncMethods_1 = require("./rules/banDeprecatedSyncMethods");
const banDeprecatedSyncPropGetters_1 = require("./rules/banDeprecatedSyncPropGetters");
const banDeprecatedSyncPropSetters_1 = require("./rules/banDeprecatedSyncPropSetters");
const dynamicPageFindMethodAdvice_1 = require("./rules/dynamicPageFindMethodAdvice");
function rulesetWithSeverity(severity, rules) {
    return Object.keys(rules).reduce((acc, name) => {
        acc[`@figma/figma-plugins/${name}`] = severity;
        return acc;
    }, {});
}
const errRules = {
    'await-requires-async': awaitRequiresAsync_1.awaitRequiresAsync,
    'ban-deprecated-id-params': banDeprecatedIdParams_1.banDeprecatedIdParams,
    'ban-deprecated-sync-methods': banDeprecatedSyncMethods_1.banDeprecatedSyncMethods,
    'ban-deprecated-sync-prop-getters': banDeprecatedSyncPropGetters_1.banDeprecatedSyncPropGetters,
    'ban-deprecated-sync-prop-setters': banDeprecatedSyncPropSetters_1.banDeprecatedSyncPropSetters,
};
const dynamicePageAdvice = {
    'dynamic-page-documentchange-event-advice': dynamicPageDocumentchangeEventAdvice_1.dynamicPageDocumentchangeEventAdvice,
    'dynamic-page-find-method-advice': dynamicPageFindMethodAdvice_1.dynamicPageFindMethodAdvice,
};
// The exported type annotations in this file are somewhat arbitrary; we do NOT
// expect anyone to actually consume these types. We include them because we use
// @figma as a type root, and all packages under a type root must emit a type
// declaration file.
exports.rules = Object.assign(Object.assign({}, errRules), dynamicePageAdvice);
exports.configs = {
    recommended: {
        plugins: ['@figma/figma-plugins'],
        rules: Object.assign(Object.assign({}, rulesetWithSeverity('error', errRules)), rulesetWithSeverity('warn', dynamicePageAdvice)),
    },
    'recommended-problems-only': {
        plugins: ['@figma/figma-plugins'],
        rules: Object.assign({}, rulesetWithSeverity('error', errRules)),
    },
};
