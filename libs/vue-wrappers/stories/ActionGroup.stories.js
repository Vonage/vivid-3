import { VActionGroup, VButton, VLayout, VTextField, VDivider } from '@vonage/vivid-vue';
import { argTypes } from './generated/VActionGroup';

export default {
  title: 'Wrappers/ActionGroup',
  component: VActionGroup,
  argTypes,
};

const ActionGroupTemplate = () => ({
  components: { VActionGroup, VButton },
  template: `<VActionGroup>
    <VButton icon="reply-line" />
    <VButton label="copy" />
    <VButton label="paste" />
    <VButton label="submit" />
  </VActionGroup>`,
});
export const ActionGroup = ActionGroupTemplate.bind({});

const AppearanceTemplate = () => ({
  components: { VActionGroup, VButton },
  template: `<div>
    <VActionGroup appearance="fieldset">
      <VButton label="edit" />
      <VButton label="copy" />
      <VButton label="paste" />
      <VButton label="submit" />
    </VActionGroup>
    <VActionGroup appearance="ghost">
      <VButton label="edit" appearance="filled" />
      <VButton label="copy" appearance="filled" />
      <VButton label="paste" appearance="filled" />
      <VButton label="submit" appearance="filled" />
    </VActionGroup>
  </div>`,
});
export const Appearance = AppearanceTemplate.bind({});

const ShapeTemplate = () => ({
  components: { VActionGroup, VButton },
  template: `<VActionGroup shape="pill">
    <VButton label="edit" shape="pill" />
    <VButton label="copy" shape="pill" />
    <VButton label="paste" shape="pill" />
    <VButton label="submit" shape="pill" />
  </VActionGroup>`,
});
export const Shape = ShapeTemplate.bind({});

const TightTemplate = () => ({
  components: { VLayout, VActionGroup, VTextField, VButton },
  template: `<VLayout column-basis="block" column-spacing="small" style="--layout-grid-template-columns: 250px;">
    <VTextField name="username" aria-label="Username" placeholder="Username" />
    <VActionGroup appearance="fieldset" tight>
      <VButton icon="flag-uruguay" />
      <VTextField appearance="ghost" aria-label="Phone number" placeholder="Phone number" name="phone" autocomplete="" style="flex-grow: 1;"/>
    </VActionGroup>
  </VLayout>`,
});
export const Tight = TightTemplate.bind({});

const SeparatorTemplate = () => ({
  components: { VActionGroup, VButton, VDivider },
  template: `<VActionGroup appearance="fieldset">
    <VButton icon="reply-line" />
    <VDivider orientation="vertical" />
    <VButton icon="compose-line" />
  </VActionGroup>`,
});
export const Separator = SeparatorTemplate.bind({});

const SemiSplitButtonTemplate = () => ({
  components: { VActionGroup, VButton, VDivider },
  template: `<div>
    <VActionGroup shape="pill">
      <VButton label="My Action" appearance="ghost" shape="pill" />
      <VDivider orientation="vertical" />
      <VButton shape="pill" icon="chevron-down-solid" />
    </VActionGroup>
    <VActionGroup shape="pill" tight>
      <VButton label="My Action" appearance="ghost" shape="pill" />
      <VButton shape="pill" icon="chevron-down-solid" />
    </VActionGroup>
  </div>`,
});
export const SemiSplitButton = SemiSplitButtonTemplate.bind({});

const ComposedSearchTemplate = () => ({
  components: { VActionGroup, VButton, VDivider, VTextField },
  template: `<VActionGroup shape="pill">
    <VButton label="Action" appearance="ghost" icon="chevron-down-solid" icon-trailing shape="pill" />
    <VDivider orientation="vertical" />
    <VTextField icon="search-line" placeholder="Search..." appearance="ghost" shape="pill" style="min-width: 160px;" />
  </VActionGroup>`,
});
export const ComposedSearch = ComposedSearchTemplate.bind({});

const RadioGroupTemplate = () => ({
  components: { VButton, VActionGroup },
  template: `<VActionGroup role="radiogroup" aria-label="Text Alignment">
    <VButton type="button" role="radio" icon="align-left-line" aria-checked="false" tabindex="0" aria-label="Text Align Left" />
    <VButton type="button" role="radio" icon="align-center-line" aria-checked="true" tabindex="-1" aria-label="Text Align Center" appearance="filled" />
    <VButton type="button" role="radio" icon="align-right-line" aria-checked="false" tabindex="-1" aria-label="Text Align Right" />
  </VActionGroup>`,
});
export const RadioGroup = RadioGroupTemplate.bind({});
