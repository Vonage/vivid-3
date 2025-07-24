const { unescapeAll } = require('markdown-it/lib/common/utils');
const {
	createCodeExample,
} = require('../code-example-preview/createCodeExample');
const createVariablePreview = require('../variables-preview');

/**
 * Extend the original fence renderer to support custom fenced blocks like code preview.
 */
module.exports =
	(originalFenceRenderer) => (tokens, idx, options, env, slf) => {
		const token = tokens[idx];
		const info = token.info ? unescapeAll(token.info).trim() : '';
		const [lang, ...additionalOptions] = info.split(/\s+/g);

		if (lang === 'html' || lang === 'vue') {
			if (additionalOptions.includes('preview')) {
				return `${createCodeExample({
					code: token.content,
					options: additionalOptions,
					url: env.page.url,
					lang,
				})}\n`;
			}

			if (
				additionalOptions.some((option) => option.includes('variables-preview'))
			) {
				return `${createVariablePreview({
					code: token.content,
					options: additionalOptions,
					url: env.page.url,
				})}\n`;
			}
		}

		return originalFenceRenderer(tokens, idx, options, env, slf);
	};
