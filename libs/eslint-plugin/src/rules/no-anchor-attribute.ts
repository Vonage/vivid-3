import * as utils from 'eslint-plugin-vue/lib/utils/index.js';
import type { Rule } from 'eslint';
import { normalizeTag } from '../utils/components';
import { ComponentMetadata } from '../utils/ComponentMetadata';

const anchoredComponents = new ComponentMetadata<null>();

anchoredComponents.add('VTooltip', null);
anchoredComponents.add('VToggletip', null);
anchoredComponents.add('VMenu', null);

export const noAnchorAttribute: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Use anchor slot instead of the `anchor` prop.',
		},
		fixable: 'code',
		schema: [],
	},
	create(context) {
		return utils.defineTemplateBodyVisitor(context, {
			VElement(node) {
				anchoredComponents.forTag(normalizeTag(node.name), () => {
					for (const attr of node.startTag.attributes) {
						if (attr.directive || attr.key.name !== 'anchor') {
							continue;
						}

						const anchorId = attr.value.value;

						const fix = buildFixIfPossible(node, anchorId);

						context.report({
							loc: attr.loc,
							message: `Prefer anchor slot over the \`anchor\` prop.`,
							fix: fix?.(context, attr),
						});
					}
				});
			},
		});
	},
};

const buildFixIfPossible = (node: any, anchorId: string) => {
	const preceding = getPrecedingNodeIgnoringWhitespace(node);

	const isAnchorTarget =
		preceding &&
		preceding.node.type === 'VElement' &&
		preceding.node.startTag.attributes.some(
			(attr: any) =>
				!attr.directive &&
				attr.key.name === 'id' &&
				attr.value.value === anchorId
		);

	return isAnchorTarget
		? (context: Rule.RuleContext, attr: any) => (fixer: Rule.RuleFixer) => {
				return [
					fixer.remove(preceding.node),
					...preceding.whitespace.map((node) => fixer.remove(node)),
					fixer.remove(attr),
					node.endTag
						? fixer.insertTextAfter(
								node.startTag,
								`<template #anchor>${context.sourceCode.getText(
									preceding.node
								)}</template>`
						  )
						: fixer.replaceTextRange(
								[node.range[1] - 2, node.range[1]],
								`><template #anchor>${context.sourceCode.getText(
									preceding.node
								)}</template></${node.rawName}>`
						  ),
				];
		  }
		: undefined;
};

const getPrecedingNodeIgnoringWhitespace = (
	node: any
): {
	node: any;
	whitespace: any[];
} | null => {
	const whitespace: any[] = [];
	for (let index = node.parent.children.indexOf(node) - 1; index > 0; index--) {
		const currentNode = node.parent.children[index];

		if (isWhitespace(currentNode)) {
			whitespace.push(currentNode);
			continue;
		}

		return { whitespace, node: currentNode };
	}
	return null;
};

const isWhitespace = (node: any) => node.type === 'VText' && !node.value.trim();
