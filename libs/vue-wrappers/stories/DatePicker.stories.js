import { VDatePicker } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes, Template } from './generated/VDatePicker';

export default {
  title: 'Wrappers/DatePicker',
  component: VDatePicker,
  argTypes,
};

export const Basic = Template.bind({});

const VModelTemplate = () => ({
  components: { VDatePicker },
  setup() {
    const value = ref('');
    return { value };
  },
  template: `<div>
    <div>
      <VDatePicker v-model="value" />
    </div> 
    <div>v-model: {{ value }}</div>
    <div>
      <button @click="value = ''">Reset</button>
      <button @click="value = '2023-02-01'">Set to '2023-02-01'</button>
    </div>
  </div>`,
});
export const VModel = VModelTemplate.bind({});
