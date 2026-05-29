import { ESLintUtils, type TSESTree } from '@typescript-eslint/utils';

export const RULE_NAME = 'underscore-member-requires-internal';

export const rule = ESLintUtils.RuleCreator(() => import.meta.url)({
	name: RULE_NAME,
	meta: {
		type: 'problem',
		fixable: 'code',
		docs: {
			description:
				'Members starting with `_` must be private/protected or have an `@internal` or `@public` JSDoc tag.',
		},
		schema: [],
		messages: {
			underscoreMemberRequiresInternal:
				"Member '{{ name }}' starts with '_' and is public. It must be private, protected, or have an @internal JSDoc tag.",
		},
	},
	defaultOptions: [],
	create(context) {
		function getJsDocComment(
			node: TSESTree.Node
		): TSESTree.Comment | undefined {
			const sourceCode = context.sourceCode ?? context.getSourceCode();
			const comments = sourceCode.getCommentsBefore(node);
			for (let i = comments.length - 1; i >= 0; i--) {
				const comment = comments[i];
				if (comment.type === 'Block' && comment.value.startsWith('*')) {
					return comment;
				}
			}
			return undefined;
		}

		function hasJsDocTag(node: TSESTree.Node, tag: string): boolean {
			const jsdoc = getJsDocComment(node);
			return jsdoc !== undefined && jsdoc.value.includes(tag);
		}

		function check(
			node: TSESTree.PropertyDefinition | TSESTree.MethodDefinition
		) {
			const { key, accessibility } = node;

			if (accessibility === 'private' || accessibility === 'protected') {
				return;
			}

			let name: string | undefined;
			if (key.type === 'Identifier') {
				name = key.name;
			} else if (key.type === 'Literal' && typeof key.value === 'string') {
				name = key.value;
			}

			if (!name || !name.startsWith('_')) {
				return;
			}

			if (hasJsDocTag(node, '@internal') || hasJsDocTag(node, '@public')) {
				return;
			}

			const existingJsDoc = getJsDocComment(node);

			context.report({
				node: key,
				messageId: 'underscoreMemberRequiresInternal',
				data: { name },
				fix(fixer) {
					if (existingJsDoc) {
						// Insert @internal after the opening `/**`
						return fixer.insertTextAfterRange(
							[existingJsDoc.range[0], existingJsDoc.range[0] + 3],
							' @internal'
						);
					}
					// Insert a new `/** @internal */` comment on the preceding line
					const sourceCode = context.sourceCode ?? context.getSourceCode();
					const text = sourceCode.getText();
					const nodeStart = node.range![0];
					let lineStart = nodeStart;
					while (lineStart > 0 && text[lineStart - 1] !== '\n') {
						lineStart--;
					}
					const indent =
						text.slice(lineStart, nodeStart).match(/^(\s*)/)?.[1] ?? '';
					return fixer.insertTextBefore(node, `/** @internal */\n${indent}`);
				},
			});
		}

		return {
			PropertyDefinition: check,
			MethodDefinition: check,
		};
	},
});
