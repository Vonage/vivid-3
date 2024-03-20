import { VCombobox, VOption } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes, Template } from './generated/VCombobox';

export default {
	title: 'Wrappers/Combobox',
	component: VCombobox,
	argTypes,
};

export const Basic = Template.bind({});

const VModelTemplate = () => ({
	components: { VCombobox, VOption },
	setup() {
		const value = ref('');
		return { value };
	},
	template: `<div>
    <div>
      <VCombobox v-model="value">
        <VOption text="Option 1" />
        <VOption text="Option 2" />
      </VCombobox>
    </div> 
    <div>v-model: {{ value }}</div>
    <div>
      <button @click="value = ''">Reset</button>
      <button @click="value = 'hello'">Set to 'hello'</button>
    </div>
  </div>`,
});
export const VModel = VModelTemplate.bind({});

const DefaultSlotTemplate = () => ({
	components: { VCombobox, VOption },
	template: `<v-combobox>
 <v-option text="First Option"/>
 <v-option text="Second Option"/>
</v-combobox>`,
});

export const DefaultSlot = DefaultSlotTemplate.bind({});

const LabelExampleTemplate = () => ({
	components: { VCombobox, VOption },
	template: `<v-combobox label="Search for something">
 <v-option text="First Option"/>
 <v-option text="Second Option"/>
</v-combobox>`,
});

export const Label = LabelExampleTemplate.bind({});

const ValueExampleTemplate = () => ({
	components: { VCombobox, VOption },
	template: `<v-combobox value="First Option">
 <v-option text="First Option"/>
 <v-option text="Second Option"/>
</v-combobox>`,
});

export const Value = ValueExampleTemplate.bind({});

const PlaceholderExampleTemplate = () => ({
	components: { VCombobox, VOption },
	template: `<v-combobox placeholder="placeholder">
 <v-option text="First Option"/>
 <v-option text="Second Option"/>
</v-combobox>`,
});

export const Placeholder = PlaceholderExampleTemplate.bind({});

const AutocompleteExampleTemplate = () => ({
	components: { VCombobox, VOption },
	template: `<v-combobox autocomplete="both">
 <v-option text="First Option"/>
 <v-option text="Second Option"/>
</v-combobox>`,
});

export const Autocomplete = AutocompleteExampleTemplate.bind({});

const OpenExampleTemplate = () => ({
	components: { VCombobox, VOption },
	template: `<v-combobox open>
  <v-option text="First Option"/>
  <v-option text="Second Option"/>
</v-combobox>`,
});

export const Open = OpenExampleTemplate.bind({});

const PlacementExampleTemplate = () => ({
	components: { VCombobox, VOption },
	template: `<div style="block-size: 140px;display: flex;flex-direction: column;justify-content: flex-end;align-items: start;">
  <v-combobox placement="top">
    <v-option text="First Option"></v-option>
    <v-option text="Second Option"></v-option>
  </v-combobox>
</div>`,
});

export const Placement = PlacementExampleTemplate.bind({});

const DisabledExampleTemplate = () => ({
	components: { VCombobox, VOption },
	template: `<v-combobox disabled>
 <v-option text="First Option" />
 <v-option text="Second Option" />
</v-combobox>`,
});

export const Disabled = DisabledExampleTemplate.bind({});
