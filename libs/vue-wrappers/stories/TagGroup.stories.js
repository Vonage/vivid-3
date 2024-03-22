import { VTag, VTagGroup } from '@vonage/vivid-vue';
import { argTypes } from './generated/VTagGroup';

export default {
	title: 'Wrappers/TagGroup',
	component: VTagGroup,
	argTypes,
};

const Template = () => ({
	components: { VTag, VTagGroup },
	template: `<VTagGroup>
  <VTag label="first tag"/>
  <VTag label="second tag"/>
  <VTag label="third tag"/>
</VTagGroup>`,
});

export const Default = Template.bind({});

const SelectableTemplate = () => ({
	components: { VTag, VTagGroup },
	template: `<VTagGroup>
  <VTag label="first tag" selectable selected/>
  <VTag label="second tag" selectable/>
  <VTag label="third tag" selectable selected/>
</VTagGroup>`,
});

export const Selectable = SelectableTemplate.bind({});

const RemovableTemplate = () => ({
	components: { VTag, VTagGroup },
	template: `<VTagGroup>
  <VTag label="first tag" removable/>
  <VTag label="second tag" removable/>
  <VTag label="third tag" removable/>
</VTagGroup>`,
});

export const Removable = RemovableTemplate.bind({});
