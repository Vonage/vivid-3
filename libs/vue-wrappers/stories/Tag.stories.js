import { VTag, VTagGroup } from '@vonage/vivid-vue';
import { argTypes } from './generated/VTag';

export default {
	title: 'Wrappers/Tag',
	component: VTag,
	argTypes,
};

const Template = () => ({
	components: { VTag, VTagGroup },
	template: `<VTagGroup>
  <VTag label='tag'></VTag>
</VTagGroup>`,
});

export const Label = Template.bind({});

const ShapeTemplate = () => ({
	components: { VTag, VTagGroup },
	template: `<VTagGroup>
  <VTag label='rounded' shape='rounded'/>
  <VTag label='pill' shape='pill'/>
</VTagGroup>`,
});

export const Shape = ShapeTemplate.bind({});

const IconTemplate = () => ({
	components: { VTag, VTagGroup },
	template: `<VTagGroup>
  <VTag label='icon' icon='pin-line' />
</VTagGroup>`,
});

export const Icon = IconTemplate.bind({});

const AppearanceTemplate = () => ({
	components: { VTag, VTagGroup },
	template: `<VTagGroup>
  <VTag label='subtle' appearance='subtle'/>
  <VTag label='duotone' appearance='duotone'/>
</VTagGroup>`,
});

export const Appearance = AppearanceTemplate.bind({});

const SubtleTagWithConnotationTemplate = () => ({
	components: { VTag, VTagGroup },
	template: `<VTagGroup>
  <VTag label='accent' appearance='subtle' connotation='accent'/>
  <VTag label='cta' appearance='subtle' connotation='cta'/>
</VTagGroup>`,
});

export const SubtleTagWithConnotation = SubtleTagWithConnotationTemplate.bind(
	{}
);

const DuotoneTagWithConnotationTemplate = () => ({
	components: { VTag, VTagGroup },
	template: `<VTagGroup>
  <VTag label='accent' appearance='subtle' connotation='accent'/>
  <VTag label='cta' appearance='subtle' connotation='cta'/>
</VTagGroup>`,
});

export const DuotoneTagWithConnotation = DuotoneTagWithConnotationTemplate.bind(
	{}
);

const DisabledTemplate = () => ({
	components: { VTag, VTagGroup },
	template: `<VTagGroup>
  <VTag label="disabled" disabled/>
</VTagGroup>`,
});

export const Disabled = DisabledTemplate.bind({});

const SelectableTemplate = () => ({
	components: { VTag, VTagGroup },
	template: `<VTagGroup>
  <VTag label="selectable" selectable selected/>
</VTagGroup>`,
});

export const Selectable = SelectableTemplate.bind({});

const RemovableTemplate = () => ({
	components: { VTag, VTagGroup },
	template: `<VTagGroup>
  <VTag label="removable" removable/>
</VTagGroup>`,
});

export const Removable = RemovableTemplate.bind({});
