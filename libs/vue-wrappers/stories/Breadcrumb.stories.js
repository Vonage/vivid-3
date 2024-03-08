import { VBreadcrumb, VBreadcrumbItem } from '@vonage/vivid-vue';
import { argTypes } from './generated/VBreadcrumb';

export default {
	title: 'Wrappers/Breadcrumb',
	component: VBreadcrumb,
	argTypes,
};

const CommonUsageTemplate = () => ({
	components: { VBreadcrumb, VBreadcrumbItem },
	template: `<VBreadcrumb>
    <VBreadcrumbItem href="#" text="breadcrumb" />
    <VBreadcrumbItem href="#" text="breadcrumb" />
    <VBreadcrumbItem href="#" text="breadcrumb" />
    <VBreadcrumbItem text="breadcrumb" />
  </VBreadcrumb>`,
});
export const CommonUsage = CommonUsageTemplate.bind({});

const MultipleHiddenCrumbsTemplate = () => ({
	components: { VBreadcrumb, VBreadcrumbItem },
	template: `<VBreadcrumb>
    <VBreadcrumbItem href="#" text="breadcrumb" />
    <VBreadcrumbItem text="..." />
    <VBreadcrumbItem href="#" text="breadcrumb" />
  </VBreadcrumb>`,
});
export const MultipleHiddenCrumbs = MultipleHiddenCrumbsTemplate.bind({});
