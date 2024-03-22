import { VButton, VMenu, VMenuItem } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes } from './generated/VMenu';

export default {
	title: 'Wrappers/Menu',
	component: VMenu,
	argTypes,
};

const MenuTemplate = () => ({
	components: { VMenu, VMenuItem },
	template: `<VMenu open>
    <VMenuItem text="Menu item 1" />
    <VMenuItem text="Menu item 2" />
  </VMenu>`,
});
export const Menu = MenuTemplate.bind({});

const AnchorTemplate = () => ({
	components: { VButton, VMenu, VMenuItem },
	setup() {
		const open = ref(false);
		return { open };
	},
	template: `<div>
    <VButton ref="button" label="Toggle Menu" appearance="outlined" @click="open = !open" />
    <VMenu :anchor="$refs.button?.$el" :open="open">
      <VMenuItem text="Menu item 1" />
      <VMenuItem text="Menu item 2" />
    </VMenu>
  </div>`,
});
export const Anchor = AnchorTemplate.bind({});

const PlacementTemplate = () => ({
	components: { VButton, VMenu, VMenuItem },
	data: () => ({
		open: false,
	}),
	template: `<div>
    <VButton ref="button" label="Toggle Menu" appearance="outlined" @click="open = !open" />
    <VMenu :anchor="$refs.button?.$el" :open="open" placement="right-start">
      <VMenuItem text="Menu item 1" />
      <VMenuItem text="Menu item 2" />
    </VMenu>
  </div>`,
});
export const Placement = PlacementTemplate.bind({});

const MaxInlineSizeTemplate = () => ({
	components: { VMenu, VMenuItem },
	template: `<VMenu open style="--menu-max-inline-size: 300px;">
    <VMenuItem text="Lorem ipsum dolor sit amet, consectetur adipisicing elit" />
  </VMenu>`,
});
export const MaxInlineSize = MaxInlineSizeTemplate.bind({});

const MinInlineSizeTemplate = () => ({
	components: { VMenu, VMenuItem },
	template: `<VMenu open style="--menu-min-inline-size: 300px;">
    <VMenuItem text="Menu Item" />
  </VMenu>`,
});
export const MinInlineSize = MinInlineSizeTemplate.bind({});
