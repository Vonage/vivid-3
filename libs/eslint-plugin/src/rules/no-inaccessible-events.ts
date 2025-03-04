import * as utils from 'eslint-plugin-vue/lib/utils/index.js';
import type { Rule } from 'eslint';
import { normalizeTag } from '../utils/components';
import { ComponentMetadata } from '../utils/ComponentMetadata';

const interactiveEvents = new ComponentMetadata<string[]>();
interactiveEvents.add('VAvatar', ['click']);
interactiveEvents.add('VBadge', ['click']);
interactiveEvents.add('VIcon', ['click']);

export const noInaccessibleEvents: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Do not use interactive events on non-interactive components.',
		},
		schema: [],
	},
	create(context) {
		return utils.defineTemplateBodyVisitor(context, {
			VElement(node: any) {
				interactiveEvents.forTag(
					normalizeTag(node.name),
					(componentName, interactiveEvents) => {
						const events = node.startTag.attributes.flatMap((attr: any) => {
							if (
								attr.directive &&
								attr.key.name.name === 'on' &&
								attr.key.argument
							) {
								return [{ name: attr.key.argument.name, node: attr }];
							}
							return [];
						});

						for (const event of events) {
							if (interactiveEvents.includes(event.name)) {
								context.report({
									loc: event.node.loc,
									message: `Using the \`${event.name}\` event on ${componentName} is an accessibility concern because the component is non-interactive.`,
								});
								return;
							}
						}
					}
				);
			},
		});
	},
};
