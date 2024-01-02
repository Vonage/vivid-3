import { VButton, VDialog, VLayout, VProgress, VTextArea, VTextField } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes, Template } from './generated/VDialog';

export default {
  title: 'Wrappers/Dialog',
  component: VDialog,
  excludeStories: /.*Data$/,
  argTypes,
};

export const Basic = Template.bind({});
Basic.args = {
  headline: 'Headline',
  open: true,
};

const OpenDeclarativeTemplate = () => ({
  components: { VDialog },
  setup() {
    const open = ref(false);
    return { open };
  },
  template: `<div>
    <div>open: {{open}} <button @click="open = !open">toggle</button></div>
    <VDialog :open="open" @close="open = false" headline="Dialog"/>
  </div>`,
});
export const OpenDeclarative = OpenDeclarativeTemplate.bind({});

const OpenImperativeTemplate = () => ({
  components: { VDialog },
  setup() {
    const dialog = ref(null);
    return { dialog };
  },
  template: `<div>
    <div>
      <button @click="dialog.show()">.show()</button>
      <button @click="dialog.showModal()">.showModal()</button>
      <button @click="dialog.close()">.close()</button>
    </div>
    <VDialog ref="dialog" headline="Dialog" />
  </div>`,
});
export const OpenImperative = OpenImperativeTemplate.bind({});

const SubtitleTemplate = () => ({
  components: { VDialog },
  template: `
  <VDialog subtitle="subtitle content" open />`,
});
export const Subtitle = SubtitleTemplate.bind({});

const IconTemplate = () => ({
  components: { VDialog },
  template: `<VDialog icon="info" open />`,
});
export const Icon = IconTemplate.bind({});

const IconPlacementTemplate = () => ({
  components: { VDialog },
  template: `
  <VDialog icon-placement="side" icon="info" headline="Dialog Headline" subtitle="subtitle content" open />`,
});
export const IconPlacement = IconPlacementTemplate.bind({});

const GraphicTemplate = () => ({
  components: { VDialog },
  template: `<VDialog open>
    <template #graphic>
      <img src="https://doodleipsum.com/40x40/hand-drawn?bg=7463D9&i=af462b28146d2ac91599602e083ddee5" />
    </template>
  </VDialog>`,
});
export const Graphic = GraphicTemplate.bind({});

const BodyTemplate = () => ({
  components: { VDialog, VTextField, VButton, VLayout },
  template: `
<VDialog open headline="Dialog Content" subtitle="Dialog with body content">
  <template #body>
    <form>
      <VLayout column-basis="block">
        <VTextField label="Name"></VTextField>
        <VTextField label="Password" type="password"></VTextField>
        <VButton label="Login" appearance="filled"></VButton>
      </VLayout>
    </form>
  </template>
</VDialog>`,
});
export const Body = BodyTemplate.bind({});

const FullWidthBodyTemplate = () => ({
  components: { VDialog, VProgress, VLayout, VTextField, VTextArea },
  template: `<VDialog open icon-placement="side" icon="info" headline="Dialog Headline" full-width-body>
    <template #body>
      <div style="background: lightgoldenrodyellow; padding: 10px">content</div>
    </template>
  </VDialog>`,
});
export const FullWidthBody = FullWidthBodyTemplate.bind({});

const FooterTemplate = () => ({
  components: { VDialog, VButton },
  template: `<VDialog open headline="Dialog with footer" subtitle="this is an example of the dialog with slotted buttons inside footer">
    <template #footer>
      <VButton appearance="outlined" label="Cancel"></VButton>
      <VButton appearance="filled" label="Action"></VButton>
    </template>
  </VDialog>`,
});
export const Footer = FooterTemplate.bind({});

const MainTemplate = () => ({
  components: { VDialog },
  template: `<VDialog open>
    <template #main>
      <div>Use main slot for your own layout and content</div>
    </template>
  </VDialog>`,
});
export const Main = MainTemplate.bind({});

const InlineMinMaxSizeTemplate = () => ({
  components: { VDialog },
  template: `<VDialog icon="info" headline="Headline" subtitle="subtitle content" open style="--dialog-min-inline-size: 560px" />`,
});
export const InlineMinMaxSize = InlineMinMaxSizeTemplate.bind({});

const BlockSizeTemplate = () => ({
  components: { VDialog },
  template: `<VDialog icon="info" headline="Headline" subtitle="subtitle content" open style="--dialog-max-block-size: 100px" />`,
});
export const BlockSize = BlockSizeTemplate.bind({});
