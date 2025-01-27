import * as utils from 'eslint-plugin-vue/lib/utils/index.js';
import type { Rule } from 'eslint';
import { normalizeTag } from '../utils/components';

import { ComponentMetadata } from '../utils/ComponentMetadata';

const requiredAccessibleNames = new ComponentMetadata<{
	accessibleNameAttrs: string[];
	accessibleNameViaDefaultSlot?: boolean;
}>();

requiredAccessibleNames.add('VAvatar', { accessibleNameAttrs: ['initials'] });
requiredAccessibleNames.add('VBadge', { accessibleNameAttrs: ['text'] });
requiredAccessibleNames.add('VButton', { accessibleNameAttrs: ['label'] });
requiredAccessibleNames.add('VCheckbox', {
	accessibleNameAttrs: ['label'],
	accessibleNameViaDefaultSlot: true,
});
requiredAccessibleNames.add('VCombobox', { accessibleNameAttrs: ['label'] });
requiredAccessibleNames.add('VDatePicker', { accessibleNameAttrs: ['label'] });
requiredAccessibleNames.add('VDateRangePicker', {
	accessibleNameAttrs: ['label'],
});
requiredAccessibleNames.add('VFab', { accessibleNameAttrs: ['label'] });
requiredAccessibleNames.add('VFilePicker', { accessibleNameAttrs: ['label'] });
requiredAccessibleNames.add('VMenu', { accessibleNameAttrs: [] });
requiredAccessibleNames.add('VMenuItem', {
	accessibleNameAttrs: ['text', 'text-secondary'],
});
requiredAccessibleNames.add('VNavItem', { accessibleNameAttrs: ['text'] });
requiredAccessibleNames.add('VNavDisclosure', {
	accessibleNameAttrs: ['label'],
});
requiredAccessibleNames.add('VNumberField', { accessibleNameAttrs: ['label'] });
requiredAccessibleNames.add('VRadio', { accessibleNameAttrs: ['label'] });
requiredAccessibleNames.add('VSearchableSelect', {
	accessibleNameAttrs: ['label'],
});
requiredAccessibleNames.add('VSelect', { accessibleNameAttrs: ['label'] });
requiredAccessibleNames.add('VSlider', { accessibleNameAttrs: [] });
requiredAccessibleNames.add('VSplitButton', { accessibleNameAttrs: ['label'] });
requiredAccessibleNames.add('VTab', { accessibleNameAttrs: ['label'] });
requiredAccessibleNames.add('VSwitch', { accessibleNameAttrs: ['label'] });
requiredAccessibleNames.add('VTag', { accessibleNameAttrs: ['label'] });
requiredAccessibleNames.add('VTextArea', { accessibleNameAttrs: ['label'] });
requiredAccessibleNames.add('VTextField', { accessibleNameAttrs: ['label'] });
requiredAccessibleNames.add('VTimePicker', { accessibleNameAttrs: ['label'] });
requiredAccessibleNames.add('VTreeItem', { accessibleNameAttrs: ['text'] });

export const accessibleNames: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Ensure that components have accessible names.',
		},
		schema: [],
	},
	create(context) {
		return utils.defineTemplateBodyVisitor(context, {
			VElement(node: any) {
				requiredAccessibleNames.forTag(
					normalizeTag(node.name),
					(componentName, component) => {
						// Detect spread syntax like `v-bind="attrs"`
						const usesSpreadAttribute = node.startTag.attributes.some(
							(attr: any) =>
								attr.directive &&
								attr.key.name.name === 'bind' &&
								!attr.key.argument
						);

						if (usesSpreadAttribute) {
							// Any attribute could've been added, can't check for accessible name
							return;
						}

						const attrs = node.startTag.attributes.map((attr: any) => {
							if (
								attr.directive &&
								attr.key.name.name === 'bind' &&
								attr.key.argument
							) {
								return attr.key.argument.name;
							} else if (!attr.directive) {
								return attr.key.name;
							}
						});

						const accessibleNameRequired = !attrs.includes('aria-hidden');
						const accessibleNameProvidedViaAttr =
							component.accessibleNameAttrs.some((attr) =>
								attrs.includes(attr)
							);
						const accessibleNameProvidedViaGlobalAttributes =
							attrs.includes('aria-label') || attrs.includes('title');
						const accessibleNameProvidedViaDefaultSlot =
							component.accessibleNameViaDefaultSlot &&
							node.children.length > 0;

						const accessibleNameMissing =
							accessibleNameRequired &&
							!accessibleNameProvidedViaAttr &&
							!accessibleNameProvidedViaGlobalAttributes &&
							!accessibleNameProvidedViaDefaultSlot;

						if (accessibleNameMissing) {
							context.report({
								loc: node.startTag.loc,
								message: `${componentName} does not have an accessible name.`,
							});
						}
					}
				);
			},
		});
	},
};
