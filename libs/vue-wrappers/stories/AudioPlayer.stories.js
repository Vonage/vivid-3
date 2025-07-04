import { VAudioPlayer } from '@vonage/vivid-vue';
import { argTypes } from './generated/VAudioPlayer';

export default {
	title: 'Wrappers/AudioPlayer',
	component: VAudioPlayer,
	argTypes,
};

const Template = () => ({
	components: { VAudioPlayer },
	template: `
    <v-audio-player 
      skip-by="5"
	    src="https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"
    >
    </v-audio-player>
  `,
});

export const ExpandMode = Template.bind({});
ExpandMode.args = {
	expandMode: 'multi',
};
