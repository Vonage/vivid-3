import { VRangeSlider } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes, Template } from './generated/VRangeSlider';

export default {
	title: 'Wrappers/RangeSlider',
	component: VRangeSlider,
	argTypes,
};

export const Basic = Template.bind({});

const VModelTemplate = () => ({
	components: { VRangeSlider },
	setup() {
		const start = ref('0');
		const end = ref('10');
		return { start, end };
	},
	template: `<div>
	<div>v-model:start: {{ start }}</div>
	<div>
		<button @click="start = '0'">Reset</button>
		<button @click="start = '2'">Set to '2'</button>
	</div>
	<div>v-model:end: {{ end }}</div>
	<div>
		<button @click="end = '10'">Reset</button>
		<button @click="end = '8'">Set to '8'</button>
	</div>
	<div>
		<VRangeSlider :start="start" @update:start="start = $event" :end="end" @update:end="end = $event"/>
	</div>
	</div>`,
});
export const VModel = VModelTemplate.bind({});

const VModelVue3OnlyTemplate = () => ({
	components: { VRangeSlider },
	setup() {
		const start = ref('0');
		const end = ref('10');
		return { start, end };
	},
	template: `<div>
		<div>v-model:start: {{ start }}</div>
		<div>
			<button @click="start = '0'">Reset</button>
			<button @click="start = '2'">Set to '2'</button>
		</div>
		<div>v-model:end: {{ end }}</div>
		<div>
			<button @click="end = '10'">Reset</button>
			<button @click="end = '8'">Set to '8'</button>
		</div>
    <div>
      <VRangeSlider v-model:start="start" v-model:end="end"/>
    </div>
  </div>`,
});
export const VModelVue3Only = VModelVue3OnlyTemplate.bind({});
