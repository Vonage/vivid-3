import * as utils from 'eslint-plugin-vue/lib/utils/index.js';
import type { Rule } from 'eslint';
import { ComponentMetadata } from '../utils/ComponentMetadata';
import { normalizeTag } from '../utils/components';

const componentsWithNamedSlots = new ComponentMetadata<null>();
componentsWithNamedSlots.add('VAccordionItem', null);
componentsWithNamedSlots.add('VAlert', null);
componentsWithNamedSlots.add('VAvatar', null);
componentsWithNamedSlots.add('VBadge', null);
componentsWithNamedSlots.add('VBanner', null);
componentsWithNamedSlots.add('VButton', null);
componentsWithNamedSlots.add('VCalendar', null);
componentsWithNamedSlots.add('VCard', null);
componentsWithNamedSlots.add('VCheckbox', null);
componentsWithNamedSlots.add('VDatePicker', null);
componentsWithNamedSlots.add('VDateRangePicker', null);
componentsWithNamedSlots.add('VDialog', null);
componentsWithNamedSlots.add('VEmptyState', null);
componentsWithNamedSlots.add('VFab', null);
componentsWithNamedSlots.add('VFilePicker', null);
componentsWithNamedSlots.add('VHeader', null);
componentsWithNamedSlots.add('VMenuItem', null);
componentsWithNamedSlots.add('VMenu', null);
componentsWithNamedSlots.add('VNavDisclosure', null);
componentsWithNamedSlots.add('VNavItem', null);
componentsWithNamedSlots.add('VNote', null);
componentsWithNamedSlots.add('VNumberField', null);
componentsWithNamedSlots.add('VOption', null);
componentsWithNamedSlots.add('VSearchableSelect', null);
componentsWithNamedSlots.add('VSelect', null);
componentsWithNamedSlots.add('VSideDrawer', null);
componentsWithNamedSlots.add('VSplitButton', null);
componentsWithNamedSlots.add('VTab', null);
componentsWithNamedSlots.add('VTag', null);
componentsWithNamedSlots.add('VTextArea', null);
componentsWithNamedSlots.add('VTextField', null);
componentsWithNamedSlots.add('VTimePicker', null);
componentsWithNamedSlots.add('VToggletip', null);
componentsWithNamedSlots.add('VTooltip', null);
componentsWithNamedSlots.add('VTreeItem', null);

export const noSlotAttribute: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description:
				'Use Vue template slot syntax instead of the `slot` attribute.',
		},
		fixable: 'code',
		schema: [],
	},
	create(context) {
		return utils.defineTemplateBodyVisitor(context, {
			VElement(node: any) {
				componentsWithNamedSlots.forTag(normalizeTag(node.name), () => {
					for (const child of node.children) {
						if (child.name === 'template' || child.type !== 'VElement') {
							continue;
						}

						for (const attr of child.startTag.attributes) {
							/* v8 ignore else -- @preserve */
							if (!attr.directive && attr.key.name === 'slot') {
								context.report({
									loc: attr.key.loc,
									message:
										'Use Vue template slot syntax instead of the `slot` attribute.',
									fix(fixer) {
										return [
											fixer.insertTextBefore(
												child,
												`<template #${attr.value.value}>`
											),
											fixer.insertTextAfter(child, '</template>'),
											fixer.remove(attr),
										];
									},
								});
							}
						}
					}
				});
			},
		});
	},
};
