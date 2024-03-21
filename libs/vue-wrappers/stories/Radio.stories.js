import { VRadio } from '@vonage/vivid-vue';
import { argTypes } from './generated/VRadioGroup';

export default {
	title: 'Wrappers/Radio',
	component: VRadio,
	argTypes,
};

const LabelTemplate = () => ({
	components: { VRadio },
	template: `<VRadio label="A default radio" />`,
});
export const Label = LabelTemplate.bind({});

const CheckedTemplate = () => ({
	components: { VRadio },
	template: `<VRadio checked />`,
});
export const Checked = CheckedTemplate.bind({});

const DisabledTemplate = () => ({
	components: { VRadio },
	template: `<div>
      <VRadio disabled />
      <VRadio disabled checked />
    </div>`,
});
export const Disabled = DisabledTemplate.bind({});

const ValueTemplate = () => ({
	components: { VRadio },
	template: `<VRadio value="my-value" />`,
});
export const Value = ValueTemplate.bind({});
