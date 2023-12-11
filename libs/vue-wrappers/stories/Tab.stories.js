import { VTab, VTabPanel, VTabs } from '@vonage/vivid-vue';
import { argTypes } from './generated/VTab';

export default {
  title: 'Wrappers/Tab',
  component: VTab,
  argTypes,
};

const LabelTemplate = () => ({
  components: { VTabs, VTab, VTabPanel },
  template: `<VTabs>
    <VTab label="Tab" id="tab" />
    <VTabPanel id="tab" />
  </VTabs>`,
});
export const Label = LabelTemplate.bind({});

const IconTemplate = () => ({
  components: { VTabs, VTab, VTabPanel },
  template: `<VTabs>
    <VTab icon="chat-line" aria-label="tab" id="tab" />
    <VTabPanel id="tab" />
  </VTabs>`,
});
export const Icon = IconTemplate.bind({});

const IconWithLabelTemplate = () => ({
  components: { VTabs, VTab, VTabPanel },
  template: `<VTabs>
    <VTab icon="chat-line" label="Tab" id="tab" />
    <VTabPanel id="tab" />
  </VTabs>`,
});
export const IconWithLabel = IconWithLabelTemplate.bind({});

const DisabledTemplate = () => ({
  components: { VTabs, VTab, VTabPanel },
  template: `<VTabs>
    <VTab disabled label="Disabled Tab" id="tab" />
    <VTabPanel id="tab" />
  </VTabs>`,
});
export const Disabled = DisabledTemplate.bind({});
