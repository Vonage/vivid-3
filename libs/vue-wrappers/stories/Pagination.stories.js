import { VPagination } from '@vonage/vivid-vue';
import { argTypes, Template } from './generated/VPagination';

export default {
	title: 'Wrappers/Pagination',
	component: VPagination,
	argTypes,
};

export const Basic = Template.bind({});

const PaginationTemplate = () => ({
	components: { VPagination },
	template: `<VPagination total="10" />`,
});
export const Pagination = PaginationTemplate.bind({});

const TotalTemplate = () => ({
	components: { VPagination },
	template: `<VPagination total="20" />`,
});
export const Total = TotalTemplate.bind({});

const SizeTemplate = () => ({
	components: { VPagination },
	template: `<div>
    <VPagination size="super-condensed" total="20" />
    <VPagination size="condensed" total="20" />
    <VPagination size="normal" total="20" />
  </div>`,
});
export const Size = SizeTemplate.bind({});

const SelectedIndexTemplate = () => ({
	components: { VPagination },
	template: `<div>
    <VPagination total="20" ref="pagination" selectedIndex="5"/>
  </div>`,
});
export const SelectedIndex = SelectedIndexTemplate.bind({});

const NavIconsTemplate = () => ({
	components: { VPagination },
	template: `<div>
    <VPagination total="20" />
    <VPagination total="20" navIcons />
  </div>`,
});
export const NavIcons = NavIconsTemplate.bind({});
