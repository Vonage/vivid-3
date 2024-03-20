import {
	VActionGroup,
	VButton,
	VCard,
	VDivider,
	VLayout,
} from '@vonage/vivid-vue';
import { argTypes } from './generated/VAccordionItem';

export default {
	title: 'Wrappers/Divider',
	component: VDivider,
	argTypes,
};

const Template = () => ({
	components: { VDivider },
	template: `<v-divider/>`,
});
export const Basic = Template.bind({});

const OrientationTemplate = () => ({
	components: { VDivider, VLayout },
	template: `<v-layout gutters="small" column-basis="block"><v-divider orientation="horizontal"/>
<v-divider orientation="vertical" style="block-size: 40px;"/></v-layout>`,
});
export const Orientation = OrientationTemplate.bind({});

const VerticalDividerTemplate = () => ({
	components: { VActionGroup, VButton, VDivider },
	template: `<v-action-group appearance="fieldset">
  <v-button icon="transfer-line"/>
  <v-divider orientation="vertical"/>
  <v-button icon="compose-line"/>
</v-action-group>`,
});
export const UseCaseVerticalDivider = VerticalDividerTemplate.bind({});

const HorizontalDividerTemplate = () => ({
	components: { VCard, VLayout, VButton, VDivider },
	template: `<v-card style="width: 400px;">
  <template #main>
  <v-layout column-basis="block" gutters="small">
    Choose the button you like best in this card :)

    <v-divider/>

    <div style=" display: flex;column-gap: 8px;justify-content: flex-end;">
      <v-button label='cancel' appearance='outlined'/>
      <v-button label='Submit' appearance='filled'/>
    </div>

  </v-layout>
  </template>
</v-card>`,
});
export const UseCaseHorizontalDivider = HorizontalDividerTemplate.bind({});

const DecorativeElementTemplate = () => ({
	components: { VDivider, VLayout },
	template: `<v-layout style="--layout-grid-template-columns: 1fr auto 1fr;">
  <v-divider role="presentation" style="display: flex;align-items: center;"/>
  More Info
  <v-divider role="presentation" style="display: flex;align-items: center;"/>
</v-layout>`,
});
export const UseCaseDecorativeElement = DecorativeElementTemplate.bind({});
