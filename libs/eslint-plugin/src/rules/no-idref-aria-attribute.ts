import { Rule } from 'eslint';
import * as utils from 'eslint-plugin-vue/lib/utils/index.js';
import { getAttributes } from '../utils/attributes';
import { ComponentMetadata } from '../utils/ComponentMetadata';
import { normalizeTag } from '../utils/components';

const IDREF_ARIA_ATTRIBUTES = [
	'aria-activedescendant',
	'aria-controls',
	'aria-describedby',
	'aria-details',
	'aria-errormessage',
	'aria-flowto',
	'aria-labelledby',
	'aria-owns',
];

const components = new ComponentMetadata<null>();

// Add all components that use DelegatesAria
components.add('VBreadcrumb', null);
components.add('VBreadcrumbItem', null);
components.add('VButton', null);
components.add('VNav', null);
components.add('VTagGroup', null);
components.add('VTag', null);
components.add('VActionGroup', null);
components.add('VHeader', null);
components.add('VSwitch', null);
components.add('VDivider', null);
components.add('VTextArea', null);
components.add('VCheckbox', null);
components.add('VSearchableSelect', null);
components.add('VFilePicker', null);
components.add('VCalendarEvent', null);
components.add('VProgress', null);
components.add('VProgressRing', null);
components.add('VSelectableBox', null);
components.add('VBanner', null);
components.add('VMenu', null);
components.add('VTextField', null);
components.add('VDialog', null);
components.add('VSlider', null);
components.add('VTextAnchor', null);
components.add('VSplitButton', null);
components.add('VNumberField', null);
components.add('VNavDisclosure', null);

export const noIdrefAriaAttribute: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Do not use IDREF ARIA attributes on components.',
		},
		messages: {
			noIdrefAriaAttribute:
				'IDREF ARIA attributes (like {{attribute}}) should not be used on components that delegate ARIA attributes, as they will not work correctly with shadow DOM.',
		},
		schema: [],
	},
	create(context) {
		return utils.defineTemplateBodyVisitor(context, {
			VElement(node) {
				const tagName = normalizeTag(node.name);
				components.forTag(tagName, () => {
					const attrs = getAttributes(node.startTag);
					for (const attr of attrs) {
						if (IDREF_ARIA_ATTRIBUTES.includes(attr.node.rawName)) {
							context.report({
								loc: attr.node.loc,
								messageId: 'noIdrefAriaAttribute',
								data: { attribute: attr.node.rawName },
							});
						}
					}
				});
			},
		});
	},
};
