import { VTextArea } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes, Template } from './generated/VTextArea';

export default {
	title: 'Wrappers/TextArea',
	component: VTextArea,
	argTypes,
};

export const Basic = Template.bind({});

const VModelTemplate = () => ({
	components: { VTextArea },
	setup() {
		const value = ref('');
		return { value };
	},
	template: `<div>
    <div>
      <VTextArea v-model="value" />
    </div>
    <div>v-model: {{ value }}</div>
    <div>
      <button @click="value = ''">Reset</button>
      <button @click="value = 'hello'">Set to 'hello'</button>
    </div>
  </div>`,
});
export const VModel = VModelTemplate.bind({});
