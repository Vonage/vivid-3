const { unescapeAll } = require('markdown-it/lib/common/utils');
const createCodeExample = require('../code-example-preview/createCodeExample');
const createVariablePreview = require('../variables-preview');

/**
 * Extend the original fence renderer to support custom fenced blocks like code preview.
 */
module.exports = (originalFenceRenderer) => (tokens, idx, options, env, slf) => {
	const token = tokens[idx];
	const info = token.info ? unescapeAll(token.info).trim() : "";
	const [lang, ...additionalOptions] = info.split(/\s+/g)

	if (lang === 'html') {
		if (additionalOptions.includes('preview')) {
			return `${createCodeExample(token.content, additionalOptions)}\n`;
		}

		if (additionalOptions.some(option => option.includes('variables-preview'))) {
			return `${createVariablePreview(token.content, additionalOptions)}\n`;
		}
	}

	return originalFenceRenderer(tokens, idx, options, env, slf);
};
