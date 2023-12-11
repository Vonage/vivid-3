import { VSwitch } from '@vonage/vivid-vue';
import { argTypes, Template } from './generated/VSwitch';

export default {
  title: 'Wrappers/Switch',
  component: VSwitch,
  argTypes,
  args: {
    checked: true,
  },
};

const CheckedTemplate = () => ({
  components: { VSwitch },
  template: `<div>
    <div><v-switch v-model="value"/></div>
    <div>v-model: {{ value }}</div>
    <div>
      <button @click="value = false">Set to false</button>
      <button @click="value = true">Set to true</button>
    </div>
    </div>`,
  data: () => ({ value: false }),
});
export const Checked = CheckedTemplate.bind({});
export const Disabled = Template.bind({});
Disabled.args = {
  disabled: true,
};
export const ReadOnly = Template.bind({});
ReadOnly.args = {
  readOnly: true,
};
export const Value = Template.bind({});
Value.args = {
  value: 'my value',
};

export const Name = Template.bind({});
Name.args = {
  name: 'my-name',
};

export const Label = Template.bind({});
Label.args = {
  label: 'my label',
};

const ConnotationTemplate = () => ({
  components: { VSwitch },
  template: `<v-switch connotation="primary" checked ></v-switch>
<v-switch connotation="cta" checked ></v-switch>
<v-switch connotation="success" checked ></v-switch>
<v-switch connotation="alert" checked ></v-switch>`,
});
export const Connotation = ConnotationTemplate.bind({});
