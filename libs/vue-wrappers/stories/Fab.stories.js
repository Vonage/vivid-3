import { VFab } from '@vonage/vivid-vue';
import { argTypes, Template } from './generated/VFab';

export default {
  title: 'Wrappers/Fab',
  component: VFab,
  excludeStories: /.*Data$/,
  argTypes,
};

export const Basic = Template.bind({});
Basic.args = {
  label: 'Fab',
};

const LabelTemplate = () => ({
  components: { VFab },
  template: `<VFab icon="cart-line" label="Add to cart" />`,
});
export const Label = LabelTemplate.bind({});

const IconTemplate = () => ({
  components: { VFab },
  template: `<VFab icon="cart-line" aria-label="Shopping Cart" />`,
});
export const Icon = IconTemplate.bind({});

const IconWithLabelTemplate = () => ({
  components: { VFab },
  template: `<div>
    <VFab icon="check-line" label="icon" />
    <VFab icon="check-line" label="icon-trailing" icon-trailing />
  </div>`,
});
export const IconWithLabel = IconWithLabelTemplate.bind({});

const ConnotationTemplate = () => ({
  components: { VFab },
  template: `<div>
    <VFab icon="plus-line" connotation="accent" />
    <VFab icon="plus-line" connotation="cta" />
  </div>`,
});
export const Connotation = ConnotationTemplate.bind({});

const SizeTemplate = () => ({
  components: { VFab },
  template: `<div>
    <VFab icon="thumbs-up-line" label="normal" size="normal" />
    <VFab icon="thumbs-up-line" label="expanded" size="expanded" />
  </div>`,
});
export const Size = SizeTemplate.bind({});

const DisabledTemplate = () => ({
  components: { VFab },
  template: `<VFab icon="store-line" disabled />`,
});
export const Disabled = DisabledTemplate.bind({});
