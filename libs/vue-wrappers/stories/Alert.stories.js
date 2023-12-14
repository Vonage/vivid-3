import { ref } from 'vue';
import { VAlert, VButton, VOption, VSelect, VSwitch } from '@vonage/vivid-vue';
import { argTypes, Template } from './generated/VAlert';

export default {
  title: 'Wrappers/Alert',
  component: VAlert,
  argTypes,
};

export const Basic = Template.bind({});

const TextTemplate = () => ({
  components: { VAlert },
  template: `<VAlert text="An important information for you" open />`,
});
export const Text = TextTemplate.bind({});

const HeadlineTemplate = () => ({
  components: { VAlert },
  template: `<VAlert headline="This requires your attention" text="An important information for you" open />`,
});
export const Headline = HeadlineTemplate.bind({});

const OpenTemplate = () => ({
  components: { VAlert, VButton },
  template: `<div>
    <VAlert text="An important information for you" ref="alert" :open="open"/>
    <VButton appearance="outlined" label="Show/Hide alert" @click="open = !open" />
  </div>`,
  setup() {
    return {
      open: ref(false),
    };
  },
});
export const Open = OpenTemplate.bind({});

const ConnotationTemplate = () => ({
  components: { VAlert, VSelect, VOption },
  template: `<div>
    <VAlert text="An important information for you" :connotation="connotation" open />
    <VSelect label="Select a connotation" v-model="connotation">
      <VOption value="accent" text="accent" />
      <VOption value="success" text="success" />
      <VOption value="warning" text="warning" />
      <VOption value="alert" text="alert" />
      <VOption value="information" text="information" />
    </VSelect>
  </div>`,
  setup() {
    return {
      connotation: ref('accent'),
    };
  },
});
export const Connotation = ConnotationTemplate.bind({});

const IconTemplate = () => ({
  components: { VAlert },
  template: `<VAlert text="An important information for you" open icon="megaphone-solid" />`,
});
export const Icon = IconTemplate.bind({});

const PlacementTemplate = () => ({
  components: { VAlert },
  template: `<div style="--alert-min-inline-size: 200px;">
    <VAlert placement="top-start" text="top-start" open />
    <VAlert placement="top" text="top" open />
    <VAlert placement="top-end" text="top-end" open />
    <VAlert placement="bottom-start" text="bottom-start" open />
    <VAlert placement="bottom" text="bottom" open />
    <VAlert placement="bottom-end" text="bottom-end" open />
  </div>`,
});
export const Placement = PlacementTemplate.bind({});

const RemovableTemplate = () => ({
  components: { VAlert, VButton },
  template: `<div>
    <VAlert text="An important information for you" removable :open="open" @close="open = false"/>
    <VButton appearance="outlined" label="Show alert" @click="open = true" />
  </div>`,
  setup() {
    return {
      open: ref(false),
    };
  },
});
export const Removable = RemovableTemplate.bind({});

const TimeoutmsTemplate = () => ({
  components: { VAlert, VButton },
  template: `<div>
    <VAlert text="An important information for you" timeoutms="2000" ref="alert" :open="open" @close="open = false"/>
    <VButton appearance="outlined" label="Show an alert for 2 seconds" @click="open = true" />
  </div>`,
  setup() {
    return {
      open: ref(false),
    };
  },
});
export const Timeoutms = TimeoutmsTemplate.bind({});

const MainTemplate = () => ({
  components: { VAlert, VSwitch },
  template: `<VAlert open>
    <template #main>
      <VSwitch label="Do not show more alerts" />
    </template>
  </VAlert>`,
});
export const Main = MainTemplate.bind({});

const ActionItemsTemplate = () => ({
  components: { VAlert, VButton },
  template: `<VAlert text="An important information for you" open>
    <template #action-items>
      <VButton appearance="outlined" shape='pill' label="Action" />
    </template>
  </VAlert>`,
});
export const ActionItems = ActionItemsTemplate.bind({});

const MinimumInlineSizeTemplate = () => ({
  components: { VAlert },
  template: `<VAlert style="--alert-min-inline-size: auto;" text="Very fitting!" open />`,
});
export const MinimumInlineSize = MinimumInlineSizeTemplate.bind({});

const MaxInlineSizeTemplate = () => ({
  components: { VAlert },
  template: `<VAlert style="--alert-max-inline-size: 300px;" text="This is helptful to prevent the alert from becoming too wide when displaying a long message" open />`,
});
export const MaxInlineSize = MaxInlineSizeTemplate.bind({});
