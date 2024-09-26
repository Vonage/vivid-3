import { VSearchableSelect, VOption } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes } from './generated/VSearchableSelect';

export default {
	title: 'Wrappers/SearchableSelect',
	component: VSearchableSelect,
	argTypes,
};

const DefaultTemplate = () => ({
	components: { VSearchableSelect, VOption },
	template: `
  <div>
    <VSearchableSelect label="Label" >
      <VOption value="1" text="Option 1"></VOption>
      <VOption value="2" text="Option 2"></VOption>
      <VOption value="3" text="Option 3"></VOption>
    </VSearchableSelect>
  </div>`,
});
export const Default = DefaultTemplate.bind({});

const SingleTemplate = () => ({
	components: { VSearchableSelect, VOption },
	template: `
  <div>
		<div>
    <VSearchableSelect label="Label" v-model="value">
      <VOption value="1" text="Option 1"></VOption>
      <VOption value="2" text="Option 2"></VOption>
      <VOption value="3" text="Option 3"></VOption>
    </VSearchableSelect>
		</div>
		<div>v-model: {{ value }}</div>
		<div>
			<button @click="value = ''">Reset</button>
			<button @click="value = '3'">Set to '3'</button>
		</div>
  </div>`,
	setup() {
		const value = ref('2');
		return { value };
	},
});
export const Single = SingleTemplate.bind({});

const MultipleTemplate = () => ({
	components: { VSearchableSelect, VOption },
	template: `
  <div>
    <div>
      <VSearchableSelect multiple label="Label" :values="values" @update:values="values = $event">
        <VOption value="1" text="Option 1" />
        <VOption value="2" text="Option 2" />
        <VOption value="3" text="Option 3" />
      </VSearchableSelect>
    </div>
    <div>v-model: {{ values }}</div>
    <div>
      <button @click="values = []">Reset</button>
      <button @click="values = ['2', '1']">Set to ['2', '1']</button>
    </div>
  </div>`,
	setup() {
		const values = ref(['2']);
		return { values };
	},
});
export const Multiple = MultipleTemplate.bind({});
