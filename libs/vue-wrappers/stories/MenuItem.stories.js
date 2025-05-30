import { VDivider, VMenu, VMenuItem } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes, Template } from './generated/VMenuItem';

export default {
	title: 'Wrappers/MenuItem',
	component: VMenuItem,
	argTypes,
};

export const Basic = Template.bind({});
Basic.args = {
	text: 'Menu item',
};

const TextTemplate = () => ({
	components: { VMenu, VMenuItem },
	template: `<VMenu open>
    <VMenuItem text="Menu item" />
  </VMenu>`,
});
export const Text = TextTemplate.bind({});

const SecondaryTextTemplate = () => ({
	components: { VMenu, VMenuItem },
	template: `<VMenu open>
    <VMenuItem text="menu item" textSecondary="secondary text" />
  </VMenu>`,
});
export const SecondaryText = SecondaryTextTemplate.bind({});

const RoleTemplate = () => ({
	components: { VMenu, VMenuItem, VDivider },
	template: `<VMenu open>
    <VMenuItem text="Menu item 1" />
    <VMenuItem text="Menu item 2" />
    <VDivider />
    <VMenuItem control-type="checkbox" text="Checkbox 1" />
    <VMenuItem control-type="checkbox" text="Checkbox 2" />
    <VDivider />
    <VMenuItem control-type="radio" text="Radio 1.1" />
    <VMenuItem control-type="radio" text="Radio 1.2" />
    <VDivider />
    <VMenuItem control-type="radio" text="Radio 2.1" />
    <VMenuItem control-type="radio" text="Radio 2.2" />
  </VMenu>`,
});
export const Role = RoleTemplate.bind({});

const IconTemplate = () => ({
	components: { VMenu, VMenuItem },
	template: `<VMenu open>
    <VMenuItem icon="file-pdf-line" text="Export to PDF" />
  </VMenu>`,
});
export const Icon = IconTemplate.bind({});

const DisabledTemplate = () => ({
	components: { VMenu, VMenuItem },
	template: `<VMenu open>
    <VMenuItem disabled text="Disabled Menu item" />
  </VMenu>`,
});
export const Disabled = DisabledTemplate.bind({});

const VModelCheckedTemplate = () => ({
	components: { VMenu, VMenuItem },
	setup() {
		const value = ref(true);
		return { value };
	},
	template: `<div>
    <VMenu open>
      <VMenuItem control-type="checkbox" v-model="value" text="Check me"/>
    </VMenu>
    <div style="margin-left: 300px">
      value: {{ value }} <button @click="value = !value">Toggle</button>
    </div>
  </div>`,
});
export const VModelChecked = VModelCheckedTemplate.bind({});

const VModelRadioTemplate = () => ({
	components: { VMenu, VMenuItem },
	setup() {
		const valueA = ref(true);
		const valueB = ref(false);
		return { valueA, valueB };
	},
	template: `<div>
    <VMenu open>
      <VMenuItem control-type="radio" v-model="valueA" text="Item A"/>
      <VMenuItem control-type="radio" v-model="valueB" text="Item B"/>
    </VMenu>
    <div style="margin-left: 300px">
      <div>valueA: {{ valueA }} <button @click="valueA = !valueA">Toggle</button></div>
      <div>valueB: {{ valueB }} <button @click="valueB = !valueB">Toggle</button></div>
    </div>
  </div>`,
});
export const VModelRadio = VModelRadioTemplate.bind({});
