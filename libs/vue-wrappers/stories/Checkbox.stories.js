import { VCheckbox, VLayout } from '@vonage/vivid-vue';
import { ref, watchEffect } from 'vue';
import { argTypes, Template } from './generated/VCheckbox';

export default {
	title: 'Wrappers/Checkbox',
	component: VCheckbox,
	argTypes,
};

export const Basic = Template.bind({});

const LabelTemplate = () => ({
	components: { VCheckbox },
	template: `<VCheckbox label="A default checkbox" />`,
});
export const Label = LabelTemplate.bind({});

const IndeterminateTemplate = () => ({
	components: { VCheckbox },
	template: `<VCheckbox ref="checkbox" indeterminate/>`,
});
export const Indeterminate = IndeterminateTemplate.bind({});

const DisabledTemplate = () => ({
	components: { VCheckbox, VLayout },
	setup() {
		const value = ref(true);
		return { value };
	},
	template: `<VLayout>
    <VCheckbox disabled />
    <VCheckbox disabled v-model="value" />
    <VCheckbox readonly />
    <VCheckbox readonly v-model="value" />
  </VLayout>`,
});
export const Disabled = DisabledTemplate.bind({});

const VModelTemplate = () => ({
	components: { VCheckbox },
	setup() {
		const checked = ref(false);
		return { checked };
	},
	template: `<div>
     <div><v-checkbox v-model="checked" /></div>
     <div>v-model: {{ checked }}</div>
     <div><button @click="checked = !checked">Toggle</button></div>
  </div>`,
});
export const VModel = VModelTemplate.bind({});
