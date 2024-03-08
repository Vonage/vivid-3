import { VRadioGroup, VRadio } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes } from './generated/VRadioGroup';

export default {
	title: 'Wrappers/RadioGroup',
	component: VRadioGroup,
	argTypes,
};

const VModelTemplate = () => ({
	components: { VRadioGroup, VRadio },
	setup() {
		const value = ref('1');
		return { value };
	},
	template: `<div>
    <div>
      <VRadioGroup v-model="value">
        <VRadio label="Option 1" value="1"/>
        <VRadio label="Option 2" value="2"/>
        <VRadio label="Option 3" value="3"/>
      </VRadioGroup>
    </div> 
    <div>v-model: {{ value }}</div>
    <div>
      <button @click="value = ''">Reset</button>
      <button @click="value = '2'">Set to '2'</button>
    </div>
  </div>`,
});
export const VModel = VModelTemplate.bind({});

const LabelTemplate = () => ({
	components: { VRadioGroup, VRadio },
	template: `<VRadioGroup label="Pick a number" name="number">
    <VRadio label="1" value="1" />
    <VRadio label="2" value="2" />
    <VRadio label="3" value="3" />
  </VRadioGroup>`,
});
export const Label = LabelTemplate.bind({});

const DisabledTemplate = () => ({
	components: { VRadioGroup, VRadio },
	template: `<VRadioGroup label="Pick a number" name="number" disabled>
    <VRadio label="1" value="1" checked />
    <VRadio label="2" value="2" />
    <VRadio label="3" value="3" />
  </VRadioGroup>`,
});
export const Disabled = DisabledTemplate.bind({});

const ReadonlyTemplate = () => ({
	components: { VRadioGroup, VRadio },
	template: `<VRadioGroup label="Pick a number" name="number" readonly>
    <VRadio label="1" value="1" checked />
    <VRadio label="2" value="2" />
    <VRadio label="3" value="3" />
  </VRadioGroup>`,
});
export const Readonly = ReadonlyTemplate.bind({});

const OrientationTemplate = () => ({
	components: { VRadioGroup, VRadio },
	template: `<VRadioGroup label="Pick a number" name="number" orientation="vertical">
    <VRadio label="1" value="1" />
    <VRadio label="2" value="2" />
    <VRadio label="3" value="3" />
  </VRadioGroup>`,
});
export const Orientation = OrientationTemplate.bind({});
