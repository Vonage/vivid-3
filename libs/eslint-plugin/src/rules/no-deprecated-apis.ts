import * as utils from 'eslint-plugin-vue/lib/utils';
import type { Rule } from 'eslint';
import { normalizeTag } from '../utils/components';
import { ComponentMetadata } from '../utils/ComponentMetadata';
import { Node } from '../types/vue-eslint-parser';

const renamedProps = new ComponentMetadata<
	{
		oldName: string;
		newName: string;
	}[]
>();

renamedProps.add('VSelectableBox', [
	{ oldName: 'clickable', newName: 'clickable-box' },
]);

export const noDeprecatedAPIs: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Do not use deprecated APIs.',
		},
		fixable: 'code',
		schema: [],
	},
	create(context) {
		return utils.defineTemplateBodyVisitor(context, {
			VElement(node) {
				renamedProps.forTag(
					normalizeTag(node.name),
					(componentName, renamedProps) => {
						const attrs: Array<{ name: string; node: Node }> =
							node.startTag.attributes.flatMap((attr: Node) => {
								if (
									attr.directive &&
									attr.key.name.name === 'bind' &&
									attr.key.argument &&
									attr.key.argument.type === 'VIdentifier'
								) {
									return [
										{ name: attr.key.argument.name, node: attr.key.argument },
									];
								} else if (!attr.directive) {
									return [{ name: attr.key.name, node: attr.key }];
								}
								return [];
							});

						for (const renamedProp of renamedProps) {
							const deprecatedPropUsage = attrs.find(
								(attr) => attr.name === renamedProp.oldName
							);

							if (deprecatedPropUsage) {
								context.report({
									loc: deprecatedPropUsage.node.loc,
									message: `${componentName} uses a deprecated prop \`${renamedProp.oldName}\`. Use \`${renamedProp.newName}\` instead.`,
									fix(fixer) {
										return fixer.replaceText(
											deprecatedPropUsage.node,
											renamedProp.newName
										);
									},
								});
							}
						}
					}
				);
			},
		});
	},
};
