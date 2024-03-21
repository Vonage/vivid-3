import { VBanner, VButton } from '@vonage/vivid-vue';
import { argTypes, Template } from './generated/VBanner';

export default {
	title: 'Wrappers/Banner',
	component: VBanner,
	argTypes,
};

export const Basic = Template.bind({});
Basic.args = {
	text: "Here's some information that you may find important!",
};

const TextTemplate = () => ({
	components: { VBanner },
	template: `<VBanner text="Here's some information that you may find important!" />`,
});
export const Text = TextTemplate.bind({});

const IconTemplate = () => ({
	components: { VBanner },
	template: `<VBanner text="Here's some information that you may find important!" icon="home-line" />`,
});
export const Icon = IconTemplate.bind({});

const ConnotationTemplate = () => ({
	components: { VBanner },
	template: `<div>
    <VBanner text="Here's some information that you may find useful!" connotation="information" />
    <VBanner text="Here's some information that you may find important!" connotation="announcement" />
    <VBanner text="Operation Successful!" connotation="success" />
    <VBanner text="Heads up - this is a warning" connotation="warning" />
    <VBanner text="ALERT! Something went wrong!" connotation="alert" />
  </div>`,
});
export const Connotation = ConnotationTemplate.bind({});

const RemovableTemplate = () => ({
	components: { VBanner },
	template: `<VBanner text="Here's some information that you may find important!" removable />`,
});
export const Removable = RemovableTemplate.bind({});

const ActionItemsTemplate = () => ({
	components: { VBanner, VButton },
	template: `<VBanner text="A banner with an action button">
    <template #action-items>
      <VButton appearance="filled" connotation="accent" label="Learn More" />
    </template>
  </VBanner>`,
});
export const ActionItems = ActionItemsTemplate.bind({});
