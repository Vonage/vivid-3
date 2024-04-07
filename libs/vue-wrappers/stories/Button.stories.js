import { VButton } from '@vonage/vivid-vue';
import { argTypes, Template } from './generated/VButton';

export default {
	title: 'Wrappers/Button',
	component: VButton,
	excludeStories: /.*Data$/,
	argTypes,
	args: {
		label: 'Button',
	},
};

export const Basic = Template.bind({});

export const Filled = Template.bind({});
Filled.args = { appearance: 'filled' };

export const Outlined = Template.bind({});
Outlined.args = { appearance: 'outlined' };

export const PillShape = Template.bind({});
PillShape.args = {
	appearance: 'filled',
	shape: 'pill',
};

export const Dense = Template.bind({});
Dense.args = {
	appearance: 'filled',
	size: 'condensed',
};

export const Enlarged = Template.bind({});
Enlarged.args = {
	appearance: 'filled',
	size: 'expanded',
};

export const Icon = Template.bind({});
Icon.args = {
	appearance: 'filled',
	icon: 'download',
};

export const TrailingIcon = Template.bind({});
TrailingIcon.args = {
	appearance: 'filled',
	icon: 'download',
	iconTrailing: true,
};

export const IconStacked = Template.bind({});
IconStacked.args = {
	appearance: 'filled',
	icon: 'download',
	stacked: true,
};

export const TrailingIconStacked = Template.bind({});
TrailingIconStacked.args = {
	appearance: 'filled',
	icon: 'download',
	stacked: true,
	iconTrailing: true,
};

export const Disabled = Template.bind({});
Disabled.args = {
	appearance: 'filled',
	disabled: true,
};

export const Pending = Template.bind({});
Pending.args = {
	appearance: 'filled',
	pending: true,
};
