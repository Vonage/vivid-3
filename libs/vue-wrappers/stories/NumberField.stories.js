import { VNumberField } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes } from './generated/VNumberField';

export default {
	title: 'Wrappers/NumberField',
	component: VNumberField,
	argTypes,
};

const NumberFieldTemplate = () => ({
	components: { VNumberField },
	template: `<VNumberField maxlength="4" minlength="2"></VNumberField>`,
});
export const NumberField = NumberFieldTemplate.bind({});

const VModelTemplate = () => ({
	components: { VNumberField },
	setup() {
		const value = ref('10');
		return { value };
	},
	template: `<div>
    <div>
      <VNumberField v-model="value" />
    </div> 
    <div>v-model: {{ value }}</div>
    <div>
      <button @click="value = ''">Reset</button>
      <button @click="value = '50'">Set to '50'</button>
    </div>
  </div>`,
});
export const VModel = VModelTemplate.bind({});

const LabelTemplate = () => ({
	components: { VNumberField },
	template: `<VNumberField label="My Label"></VNumberField>`,
});
export const Label = LabelTemplate.bind({});

const PlaceholderTemplate = () => ({
	components: { VNumberField },
	template: `<VNumberField placeholder="My Placeholder"></VNumberField>`,
});
export const Placeholder = PlaceholderTemplate.bind({});

const ValueTemplate = () => ({
	components: { VNumberField },
	template: `<VNumberField label="With default value" value="5"></VNumberField>`,
});
export const Value = ValueTemplate.bind({});

const HelperTemplate = () => ({
	components: { VNumberField },
	template: `<VNumberField label="Helper text below" helper-text="Help text"></VNumberField>`,
});
export const Helper = HelperTemplate.bind({});

const SuccessTextTemplate = () => ({
	components: { VNumberField },
	template: `<VNumberField label="Valid value" success-text="Great success"></VNumberField>`,
});
export const SuccessText = SuccessTextTemplate.bind({});

const ShapeTemplate = () => ({
	components: { VNumberField },
	template: `<div>
  <VNumberField label="Pill" shape="pill"></VNumberField>
  <VNumberField label="Rounded" shape="rounded"></VNumberField>
</div>`,
});
export const Shape = ShapeTemplate.bind({});

const AppearanceTemplate = () => ({
	components: { VNumberField },
	template: `<div>
  <VNumberField placeholder="appearance" label="fieldset" appearance="fieldset"></VNumberField>
  <VNumberField placeholder="appearance" label="ghost" appearance="ghost"></VNumberField>
</div>
`,
});
export const Appearance = AppearanceTemplate.bind({});

const DisabledTemplate = () => ({
	components: { VNumberField },
	template: `<VNumberField disabled value="disabled" label="fieldset" appearance="fieldset"></VNumberField>`,
});
export const Disabled = DisabledTemplate.bind({});

const ReadonlyTemplate = () => ({
	components: { VNumberField },
	template: `<VNumberField readonly value="8" label="fieldset" appearance="fieldset"></VNumberField>`,
});
export const Readonly = ReadonlyTemplate.bind({});
