import { VButton, VTooltip } from '@vonage/vivid-vue';
import { argTypes } from './generated/VBadge';

export default {
  title: 'Wrappers/Tooltip',
  component: VTooltip,
  argTypes,
};

const AnchorTemplate = () => ({
  components: { VButton, VTooltip },
  template: `<div style="text-align:center;"><v-button id="button" icon="help-line" shape="pill"/>
<v-tooltip anchor="button" text="I'm a tooltip"/></div>`,
});

export const Anchor = AnchorTemplate.bind({});

const placementTemplate = () => ({
  components: { VButton, VTooltip },
  template: `<div style="text-align:center;">
<v-button id="anchor" appearance='outlined' label='This is an anchor'></v-button>
<v-tooltip anchor="anchor" text="right" placement="right" style="--tooltip-inline-size: 100px;"/>
<v-tooltip anchor="anchor" text="left" placement="left" style="--tooltip-inline-size: 100px;"/>
<v-tooltip anchor="anchor" text="top" placement="top" style="--tooltip-inline-size: 100px;"/>
<v-tooltip anchor="anchor" text="bottom" placement="bottom" style="--tooltip-inline-size: 100px;"/></div>`,
});

export const placement = placementTemplate.bind({});

const InlineSizeTemplate = () => ({
  components: { VButton, VTooltip },
  template: `<div style="text-align:center;"><v-button id="button" icon="info-line" shape="pill"/>
<v-tooltip anchor="button" text="My inline size is 200px" style="--tooltip-inline-size: 200px;"/></div>`,
});

export const InlineSize = InlineSizeTemplate.bind({});
