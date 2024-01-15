import { VSplitButton } from '@vonage/vivid-vue';
import { argTypes, Template } from './generated/VSplitButton';

export default {
	title: 'Wrappers/SplitButton',
	component: VSplitButton,
	excludeStories: /.*Data$/,
	argTypes,
	args: {
		label: 'SplitButton',
	},
};

export const Basic = Template.bind({});
