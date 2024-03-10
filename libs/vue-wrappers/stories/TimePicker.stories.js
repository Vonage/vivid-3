import { VTimePicker } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes, Template } from './generated/VTimePicker';

export default {
	title: 'Wrappers/TimePicker',
	component: VTimePicker,
	argTypes,
};

export const Basic = Template.bind({});

const VModelTemplate = () => ({
	components: { VTimePicker },
	setup() {
		const value = ref('');
		return { value };
	},
	template: `<div>
    <div>
      <VTimePicker v-model="value" />
    </div>
    <div>v-model: {{ value }}</div>
    <div>
      <button @click="value = ''">Reset</button>
      <button @click="value = '12:34:45'">Set to '12:34:45'</button>
    </div>
  </div>`,
});
export const VModel = VModelTemplate.bind({});
