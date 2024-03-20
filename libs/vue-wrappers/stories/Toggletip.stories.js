import { VButton, VToggletip } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes } from './generated/VToggletip';

export default {
	title: 'Wrappers/Toggletip',
	component: VToggletip,
	argTypes,
};

const AnchorTemplate = () => ({
	components: { VButton, VToggletip },
	template: `<div>
    <VButton id="button1" icon="help-solid" shape="pill" />
    <VToggletip anchor="button1">My anchor is an ID</VToggletip>

    <VButton ref="button2" icon="help-solid" shape="pill" />
    <VToggletip :anchor="button2?.$el">My anchor is a reference</VToggletip>
  </div>`,
	setup() {
		return { button2: ref(null) };
	},
});
export const Anchor = AnchorTemplate.bind({});

const OpenTemplate = () => ({
	components: { VButton, VToggletip },
	template: `<div>
    <VButton id="button3" icon="help-solid" shape="pill" />
    <VToggletip anchor="button3" open>I'm open by default</VToggletip>
  </div>`,
});
export const Open = OpenTemplate.bind({});

const HeadlineTemplate = () => ({
	components: { VButton, VToggletip },
	template: `<div>
    <VButton id="button4" icon="help-solid" shape="pill" />
    <VToggletip anchor="button4" headline="This is the headline">This is the content</VToggletip>
  </div>`,
});
export const Headline = HeadlineTemplate.bind({});

const AlternateTemplate = () => ({
	components: { VButton, VToggletip },
	template: `<div>
    <VButton id="button5" icon="help-solid" shape="pill" />
    <VToggletip anchor="button5" alternate>An alternate toggletip</VToggletip>
  </div>`,
});
export const Alternate = AlternateTemplate.bind({});

const PlacementTemplate = () => ({
	components: { VButton, VToggletip },
	template: `<div>
    <VButton id="button6" icon="help-solid" shape="pill" />
    <VToggletip anchor="button6" placement="top">top</VToggletip>
    <VToggletip anchor="button6" placement="right">right</VToggletip>
    <VToggletip anchor="button6" placement="bottom">bottom</VToggletip>
    <VToggletip anchor="button6" placement="left">left</VToggletip>
  </div>`,
});
export const Placement = PlacementTemplate.bind({});

const ActionItemsTemplate = () => ({
	components: { VButton, VToggletip },
	template: `<div>
    <VButton id="button7" icon="help-solid" shape="pill" />
    <VToggletip anchor="button7">
      This is a toggletip with action items
      <template #action-items>
        <VButton appearance="outlined" label="Action" shape="pill" />
        <VButton appearance="filled" label="Action" shape="pill" />
      </template>
    </VToggletip>
  </div>`,
});
export const ActionItems = ActionItemsTemplate.bind({});
