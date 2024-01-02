import { VDateRangePicker } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes, Template } from './generated/VDateRangePicker';

export default {
  title: 'Wrappers/DateRangePicker',
  component: VDateRangePicker,
  argTypes,
};

export const Basic = Template.bind({});

const VModelTemplate = () => ({
  components: { VDateRangePicker },
  setup() {
    const start = ref('');
    const end = ref('');
    return { start, end };
  },
  template: `<div>
    <div>v-model:start: {{ start }}</div>
    <div>
      <button @click="start = ''">Reset</button>
      <button @click="start = '2023-02-01'">Set to '2023-02-01'</button>
    </div>
    <div>v-model:end: {{ end }}</div>
    <div>
      <button @click="end = ''">Reset</button>
      <button @click="end = '2023-02-10'">Set to '2023-02-10'</button>
    </div>
    <div>
      <VDateRangePicker :start="start" @update:start="start = $event" :end="end" @update:end="end = $event"/>
    </div>
  </div>`,
});
export const VModel = VModelTemplate.bind({});

const VModelVue3OnlyTemplate = () => ({
  components: { VDateRangePicker },
  setup() {
    const start = ref('');
    const end = ref('');
    return { start, end };
  },
  template: `<div>
    <div>v-model:start: {{ start }}</div>
    <div>
      <button @click="start = ''">Reset</button>
      <button @click="start = '2023-02-01'">Set to '2023-02-01'</button>
    </div>
    <div>v-model:end: {{ end }}</div>
    <div>
      <button @click="end = ''">Reset</button>
      <button @click="end = '2023-02-10'">Set to '2023-02-10'</button>
    </div>
    <div>
      <VDateRangePicker v-model:start="start" v-model:end="end"/>
    </div> 
  </div>`,
});
export const VModelVue3Only = VModelVue3OnlyTemplate.bind({});
