import * as utils from 'eslint-plugin-vue/lib/utils/index.js';
import type { Rule } from 'eslint';
import { normalizeTag } from '../utils/components';
import { ComponentMetadata } from '../utils/ComponentMetadata';
import { camelToKebab } from '../utils/casing';
import { getAttributes } from '../utils/attributes';

const componentsWithCurrentValue = new ComponentMetadata<
	{
		currentValueAttr: string;
		modelValueAttr: string;
	}[]
>();
componentsWithCurrentValue.add('VTextField', [
	{
		currentValueAttr: 'currentValue',
		modelValueAttr: 'modelValue',
	},
]);
componentsWithCurrentValue.add('VTextArea', [
	{
		currentValueAttr: 'currentValue',
		modelValueAttr: 'modelValue',
	},
]);
componentsWithCurrentValue.add('VNumberField', [
	{
		currentValueAttr: 'currentValue',
		modelValueAttr: 'modelValue',
	},
]);
componentsWithCurrentValue.add('VSelect', [
	{
		currentValueAttr: 'currentValue',
		modelValueAttr: 'modelValue',
	},
]);
componentsWithCurrentValue.add('VCombobox', [
	{
		currentValueAttr: 'currentValue',
		modelValueAttr: 'modelValue',
	},
]);
componentsWithCurrentValue.add('VSlider', [
	{
		currentValueAttr: 'currentValue',
		modelValueAttr: 'modelValue',
	},
]);
componentsWithCurrentValue.add('VRangeSlider', [
	{
		currentValueAttr: 'currentValue',
		modelValueAttr: 'modelValue',
	},
	{
		currentValueAttr: 'currentStart',
		modelValueAttr: 'start',
	},
	{
		currentValueAttr: 'currentEnd',
		modelValueAttr: 'end',
	},
]);
componentsWithCurrentValue.add('VDatePicker', [
	{
		currentValueAttr: 'currentValue',
		modelValueAttr: 'modelValue',
	},
]);
componentsWithCurrentValue.add('VDateRangePicker', [
	{
		currentValueAttr: 'currentValue',
		modelValueAttr: 'modelValue',
	},
	{
		currentValueAttr: 'currentStart',
		modelValueAttr: 'start',
	},
	{
		currentValueAttr: 'currentEnd',
		modelValueAttr: 'end',
	},
]);
componentsWithCurrentValue.add('VTimePicker', [
	{
		currentValueAttr: 'currentValue',
		modelValueAttr: 'modelValue',
	},
]);
componentsWithCurrentValue.add('VFilePicker', [
	{
		currentValueAttr: 'currentValue',
		modelValueAttr: 'modelValue',
	},
]);
componentsWithCurrentValue.add('VCheckbox', [
	{
		currentValueAttr: 'currentChecked',
		modelValueAttr: 'modelValue',
	},
]);
componentsWithCurrentValue.add('VSwitch', [
	{
		currentValueAttr: 'currentChecked',
		modelValueAttr: 'modelValue',
	},
]);
componentsWithCurrentValue.add('VRadio', [
	{
		currentValueAttr: 'currentChecked',
		modelValueAttr: 'modelValue',
	},
]);

export const noCurrentValueAttribute: Rule.RuleModule = {
	meta: {
		type: 'problem',
		docs: {
			description: 'Do not use current value attributes.',
		},
		fixable: 'code',
		schema: [],
	},
	create(context) {
		return utils.defineTemplateBodyVisitor(context, {
			VElement(node) {
				componentsWithCurrentValue.forTag(
					normalizeTag(node.name),
					(_, currentValueAttrs) => {
						const attrs = getAttributes(node.startTag);

						for (const currentValueAttr of currentValueAttrs) {
							const currentValueUsage = attrs.find(
								(attr) => attr.name === currentValueAttr.currentValueAttr
							);

							if (currentValueUsage) {
								context.report({
									loc: currentValueUsage.node.loc,
									message: `Use \`${currentValueAttr.modelValueAttr}\` instead of \`${currentValueAttr.currentValueAttr}\` to set the current value.`,
									fix(fixer) {
										return fixer.replaceText(
											currentValueUsage.node,
											camelToKebab(currentValueAttr.modelValueAttr)
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
