import { VFilePicker } from '@vonage/vivid-vue';
import { argTypes } from './generated/VFilePicker';

export default {
	title: 'Wrappers/FilePicker',
	component: VFilePicker,
	excludeStories: /.*Data$/,
	argTypes,
};

const Template = () => ({
	components: { VFilePicker },
	template: `
		<VFilePicker label="File Picker" helper-text="helper-text" max-file-size="0.1">
		Drag & Drop or click to upload
		</VFilePicker>`,
});

export const Basic = Template.bind({});
