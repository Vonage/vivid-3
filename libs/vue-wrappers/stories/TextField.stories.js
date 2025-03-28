import {
	VButton,
	VLayout,
	VTextField,
	VSelect,
	VOption,
} from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes, Template } from './generated/VTextField';

export default {
	title: 'Wrappers/TextField',
	component: VTextField,
	argTypes,
};

export const Basic = Template.bind({});

const LabelTemplate = () => ({
	components: { VTextField },
	template: `<VTextField label="My Label" />`,
});
export const Label = LabelTemplate.bind({});

const PlaceholderTemplate = () => ({
	components: { VTextField },
	template: `<VTextField placeholder="My Placeholder" />`,
});
export const Placeholder = PlaceholderTemplate.bind({});

const HelperTextTemplate = () => ({
	components: { VTextField },
	template: `<VTextField label="Helper text below" helper-text="Help text" />`,
});
export const HelperText = HelperTextTemplate.bind({});

const SuccessTextTemplate = () => ({
	components: { VTextField },
	template: `<VTextField label="Username" value="Vlad" success-text="Valid username" />`,
});
export const SuccessText = SuccessTextTemplate.bind({});

const CharacterCountTemplate = () => ({
	components: { VTextField },
	template: `<VTextField label="Char count example" char-count maxlength="15" />`,
});
export const CharacterCount = CharacterCountTemplate.bind({});

const IconTemplate = () => ({
	components: { VTextField },
	template: `<VTextField icon="search-line" label="Search..." />`,
});
export const Icon = IconTemplate.bind({});

const ShapeTemplate = () => ({
	components: { VTextField },
	template: `<div>
    <VTextField label="Pill" shape="pill" />
    <VTextField label="Rounded" shape="rounded" />
  </div>`,
});
export const Shape = ShapeTemplate.bind({});

const AppearanceTemplate = () => ({
	components: { VTextField },
	template: `<div>
    <VTextField placeholder="appearance" label="fieldset" appearance="fieldset" />
    <VTextField placeholder="appearance" label="ghost" appearance="ghost" />
  </div>`,
});
export const Appearance = AppearanceTemplate.bind({});

const DisabledTemplate = () => ({
	components: { VTextField },
	setup() {
		const value = ref('disabled');
		return { value };
	},
	template: `<VTextField disabled icon="chat-line" v-model="value" label="fieldset" appearance="fieldset" />`,
});
export const Disabled = DisabledTemplate.bind({});

const ReadonlyTemplate = () => ({
	components: { VTextField },
	setup() {
		const value = ref('readonly text');
		return { value };
	},
	template: `<VTextField readonly icon="chat-line" v-model="value" label="fieldset" appearance="fieldset" />`,
});
export const Readonly = ReadonlyTemplate.bind({});

const InFormTemplate = () => ({
	components: { VButton, VLayout, VTextField },
	template: `<form method="post" action="">
    <VLayout columnSpacing="small" columnBasis="block">
      <VTextField required label="Add email" placeholder="e.g. john@doe.dev" type="email" name="email" autocomplete="email" icon="search" maxlength="30" charCount style="justify-self: flex-start;" />
      <VButton label="Submit" appearance="filled" type="submit" />
    </VLayout>
  </form>`,
});
export const InForm = InFormTemplate.bind({});

const VModelTemplate = () => ({
	components: { VTextField },
	setup() {
		const value = ref('');
		return { value };
	},
	template: `<div>
    <div>
      <VTextField v-model="value" />
    </div>
    <div>v-model: {{ value }}</div>
    <div>
      <button @click="value = ''">Reset</button>
      <button @click="value = 'hello'">Set to 'hello'</button>
    </div>
  </div>`,
});
export const VModel = VModelTemplate.bind({});

const BubblingEventTemplate = () => ({
	components: { VTextField, VSelect, VOption },
	setup() {
		const value = ref('');
		const updateCount = ref(0);
		function onModelUpdate($event) {
			updateCount.value += 1;
			console.log('@update:modelValue', $event);
		}
		const inputCount = ref(0);
		function onInput($event) {
			inputCount.value += 1;
			console.log('@input', $event.target, $event.currentTarget);
		}
		return { value, inputCount, updateCount, onModelUpdate, onInput };
	},
	template: `<div>
    <div>
      <VTextField v-model="value" @update:modelValue="onModelUpdate" @input="onInput">
				<template #action-items>
					<VSelect>
						<VOption text="Option 1" value="1"></VOption>
						<VOption text="Option 2" value="2"></VOption>
					</VSelect>
				</template>
    	</VTextField>
    </div>
    <div>v-model: {{ value }}</div>
    <div>input event count: {{ inputCount }}</div>
    <div>update:model-value event count: {{ updateCount }}</div>
  </div>`,
});
export const BubblingEvent = BubblingEventTemplate.bind({});
