import type { Rule } from 'eslint';
import path from 'node:path';

type TemplateVisitor = Rule.RuleListener;

/**
 * Register the given visitor to parser services.
 * If the parser service of `vue-eslint-parser` was not found,
 * this generates a warning.
 */
export function defineTemplateBodyVisitor(
	context: Rule.RuleContext,
	templateBodyVisitor: TemplateVisitor,
	scriptVisitor?: Rule.RuleListener,
	options?: { templateBodyTriggerSelector?: 'Program' | 'Program:exit' }
): Rule.RuleListener {
	const sourceCode = context.sourceCode as any;
	const parserServices = sourceCode?.parserServices;

	if (!parserServices?.defineTemplateBodyVisitor) {
		const filename = context.filename;
		if (path.extname(filename) === '.vue') {
			context.report({
				loc: {
					line: 1,
					column: 0,
				},
				message:
					'Use the latest vue-eslint-parser. See also https://eslint.vuejs.org/user-guide/#what-is-the-use-the-latest-vue-eslint-parser-error.',
			});
		}
		return {};
	}

	return parserServices.defineTemplateBodyVisitor(
		templateBodyVisitor,
		scriptVisitor,
		options
	);
}
