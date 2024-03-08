import { VBreadcrumbItem } from '@vonage/vivid-vue';
import { argTypes, Template } from './generated/VBreadcrumbItem';

export default {
	title: 'Wrappers/BreadcrumbItem',
	component: VBreadcrumbItem,
	argTypes,
};

export const Basic = Template.bind({});
Basic.args = {
	text: 'Breadcrumb Item',
};

const LinkTemplate = () => ({
	components: { VBreadcrumbItem },
	template: `<VBreadcrumbItem text="Breadcrumb" href="https://vivid.vonage.com" />`,
});
export const Link = LinkTemplate.bind({});

const TextTemplate = () => ({
	components: { VBreadcrumbItem },
	template: `<VBreadcrumbItem text="Breadcrumb" />`,
});
export const Text = TextTemplate.bind({});

const CombinedTemplate = () => ({
	components: { VBreadcrumbItem },
	template: `<div style="display: flex">
    <VBreadcrumbItem
      text="Breadcrumb"
      href="https://vivid.vonage.com" />

    <VBreadcrumbItem
      text="Breadcrumb"
      href="https://vivid.vonage.com" />

    <VBreadcrumbItem
      text="..." />

    <VBreadcrumbItem
      text="Breadcrumb" />
  </div>`,
});
export const Combined = CombinedTemplate.bind({});
