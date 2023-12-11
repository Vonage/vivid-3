import { VNav, VNavDisclosure, VNavItem } from '@vonage/vivid-vue';
import { argTypes } from './generated/VNavDisclosure';

export default {
  title: 'Wrappers/NavDisclosure',
  component: VNavDisclosure,
  argTypes,
};

const LabelTemplate = () => ({
  components: { VNav, VNavDisclosure, VNavItem },
  template: `<VNav>
    <VNavDisclosure label="1st level item">
      <VNavItem href="#" text="2nd level item" />
    </VNavDisclosure>
  </VNav>`,
});
export const Label = LabelTemplate.bind({});

const OpenTemplate = () => ({
  components: { VNav, VNavDisclosure, VNavItem },
  template: `<VNav>
    <VNavDisclosure label="1st level item" open>
      <VNavItem href="#" text="2nd level item" />
    </VNavDisclosure>
  </VNav>`,
});
export const Open = OpenTemplate.bind({});

const IconTemplate = () => ({
  components: { VNav, VNavDisclosure, VNavItem },
  template: `<VNav>
    <VNavDisclosure label="1st level item" icon="profile">
      <VNavItem href="#" text="2nd level item" />
    </VNavDisclosure>
  </VNav>`,
});
export const Icon = IconTemplate.bind({});

const IconOnlyTemplate = () => ({
  components: { VNav, VNavDisclosure, VNavItem },
  template: `<VNav>
    <VNavDisclosure icon="profile">
      <VNavItem href="#" text="2nd level item" />
    </VNavDisclosure>
  </VNav>`,
});
export const IconOnly = IconOnlyTemplate.bind({});
