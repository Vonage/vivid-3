import { VAudioPlayer } from '@vonage/vivid-vue';
import { argTypes } from './generated/VAudioPlayer';

export default {
	title: 'Wrappers/AudioPlayer',
	component: VAudioPlayer,
	argTypes,
};

const BasicTemplate = () => ({
	components: { VAudioPlayer },
	setup() {
		const audioUrl = "https://freetestdata.com/wp-content/uploads/2021/09/Free_Test_Data_2MB_MP3.mp3"

		return { audioUrl };
	},
	template: `
    <div>
      <VAudioPlayer
        v-bind:src="audioUrl" 
        skip-by="10"
        connotation="cta"
        class="vvd-root Vlt-purple"
        playback-rates="0.5, 1, 1.5, 2"
      />
    </div>`,
});

export const Basic = BasicTemplate.bind({});