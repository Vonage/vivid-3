import * as utils from 'eslint-plugin-vue/lib/utils/index.js';
import type { Rule } from 'eslint';
import { normalizeTag } from '../utils/components';
import { ComponentMetadata } from '../utils/ComponentMetadata';
import { getAttributes } from '../utils/attributes';

const componentsWithValueAttributes = new ComponentMetadata<{
	valueAttr: string;
	initialValueAttr: string;
}>();
componentsWithValueAttributes.add('VTextField', {
	valueAttr: 'value',
	initialValueAttr: 'initialValue',
});
componentsWithValueAttributes.add('VTextArea', {
	valueAttr: 'value',
	initialValueAttr: 'initialValue',
});
componentsWithValueAttributes.add('VNumberField', {
	valueAttr: 'value',
	initialValueAttr: 'initialValue',
});
componentsWithValueAttributes.add('VSearchableSelect', {
	valueAttr: 'value',
	initialValueAttr: 'initialValue',
});
componentsWithValueAttributes.add('VSelect', {
	valueAttr: 'value',
	initialValueAttr: 'initialValue',
});
componentsWithValueAttributes.add('VCombobox', {
	valueAttr: 'value',
	initialValueAttr: 'initialValue',
});
componentsWithValueAttributes.add('VSlider', {
	valueAttr: 'value',
	initialValueAttr: 'initialValue',
});
componentsWithValueAttributes.add('VRangeSlider', {
	valueAttr: 'value',
	initialValueAttr: 'initialValue',
});
componentsWithValueAttributes.add('VDatePicker', {
	valueAttr: 'value',
	initialValueAttr: 'initialValue',
});
componentsWithValueAttributes.add('VDateRangePicker', {
	valueAttr: 'value',
	initialValueAttr: 'initialValue',
});
componentsWithValueAttributes.add('VTimePicker', {
	valueAttr: 'value',
	initialValueAttr: 'initialValue',
});
componentsWithValueAttributes.add('VFilePicker', {
	valueAttr: 'value',
	initialValueAttr: 'initialValue',
});
componentsWithValueAttributes.add('VCheckbox', {
	valueAttr: 'checked',
	initialValueAttr: 'defaultChecked',
});
componentsWithValueAttributes.add('VSwitch', {
	valueAttr: 'checked',
	initialValueAttr: 'defaultChecked',
});
componentsWithValueAttributes.add('VRadio', {
	valueAttr: 'checked',
	initialValueAttr: 'defaultChecked',
});

export const noValueAttribute: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Do not use the value (or checked) attribute.',
		},
		schema: [],
	},
	create(context) {
		return utils.defineTemplateBodyVisitor(context, {
			VElement(node) {
				componentsWithValueAttributes.forTag(
					normalizeTag(node.name),
					(_, { valueAttr, initialValueAttr }) => {
						const attrs = getAttributes(node.startTag);

						const valueAttributeUsage = attrs.find(
							(attr) => attr.name === valueAttr
						);

						if (valueAttributeUsage) {
							context.report({
								loc: valueAttributeUsage.node.loc,
								message: `Do not use \`${valueAttr}\`. Use \`modelValue\` to set the current value or \`${initialValueAttr}\` to set the initial value.`,
							});
						}
					}
				);
			},
		});
	},
};
