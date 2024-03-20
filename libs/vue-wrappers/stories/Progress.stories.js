import { VLayout, VProgress } from '@vonage/vivid-vue';
import { argTypes, Template } from './generated/VProgress';

export default {
	title: 'Wrappers/Progress',
	component: VProgress,
	argTypes,
};

export const Basic = Template.bind({});

const MinMaxTemplate = () => ({
	components: { VProgress },
	template: `<VProgress :min="0" :max="50" :value="12.5" />`,
});
export const MinMax = MinMaxTemplate.bind({});

const ValueTemplate = () => ({
	components: { VProgress },
	template: `<VProgress :min="0" :max="50" :value="12.5" />`,
});
export const Value = ValueTemplate.bind({});

const PausedTemplate = () => ({
	components: { VProgress },
	template: `<VProgress :min="0" :max="50" :value="25" paused />`,
});
export const Paused = PausedTemplate.bind({});

const PausedIndeterminateTemplate = () => ({
	components: { VProgress },
	template: `<VProgress :min="0" :max="50" value="indeterminate" paused />`,
});
export const PausedIndeterminate = PausedIndeterminateTemplate.bind({});

const ReverseTemplate = () => ({
	components: { VProgress, VLayout },
	template: `<VLayout>
    <VProgress :min="0" :max="50" :value="25" reverse />
    <VProgress :min="0" :max="50" value="indeterminate" reverse />
  </VLayout>`,
});
export const Reverse = ReverseTemplate.bind({});

const ConnotationTemplate = () => ({
	components: { VProgress, VLayout },
	template: `<VLayout>
    <VProgress :min="0" :max="100" :value="25" connotation="accent" />
    <VProgress :min="0" :max="100" :value="25" connotation="cta" />
    <VProgress :min="0" :max="100" :value="25" connotation="success" />
    <VProgress :min="0" :max="100" :value="25" connotation="alert" />
    <VProgress :min="0" :max="100" :value="25" connotation="pacific" />
  </VLayout>`,
});
export const Connotation = ConnotationTemplate.bind({});

const ShapeTemplate = () => ({
	components: { VProgress, VLayout },
	template: `<VLayout>
    <VProgress :min="0" :max="50" :value="25" shape="rounded" />
    <VProgress :min="0" :max="50" :value="25" shape="sharp" />
  </VLayout>`,
});
export const Shape = ShapeTemplate.bind({});

const DeterminateStateTemplate = () => ({
	components: { VProgress },
	template: `<VProgress :min="0" :max="50" :value="12.5" />`,
});
export const DeterminateState = DeterminateStateTemplate.bind({});

const IndeterminateTemplate = () => ({
	components: { VProgress },
	template: `<VProgress :min="0" :max="50" value="indeterminate" />`,
});
export const Indeterminate = IndeterminateTemplate.bind({});
