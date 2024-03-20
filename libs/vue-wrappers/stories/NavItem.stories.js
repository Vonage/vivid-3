import { VNav, VNavItem } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes, Template } from './generated/VNavItem';

export default {
	title: 'Wrappers/NavItem',
	component: VNavItem,
	argTypes,
};

export const Basic = Template.bind({});
Basic.args = {
	href: '#',
	text: 'NavItem',
};

const TextTemplate = () => ({
	components: { VNav, VNavItem },
	template: `<VNav>
    <VNavItem href="#" text="Account" />
  </VNav>`,
});
export const Text = TextTemplate.bind({});

const IconTemplate = () => ({
	components: { VNav, VNavItem },
	template: `<VNav>
    <VNavItem href="#" icon="profile" aria-label="Account" />
  </VNav>`,
});
export const Icon = IconTemplate.bind({});

const IconWithTextTemplate = () => ({
	components: { VNav, VNavItem },
	template: `<VNav>
    <VNavItem href="#" icon="profile" text="Account" />
  </VNav>`,
});
export const IconWithText = IconWithTextTemplate.bind({});

const AriaCurrentTemplate = () => ({
	components: { VNav, VNavItem },
	template: `<VNav>
    <VNavItem href="#" text="Account" :aria-current="selectedItem === 1 ? 'page' : undefined" @click.prevent="selectedItem = 1"/>
    <VNavItem href="#" text="Shop" :aria-current="selectedItem === 2 ? 'page' : undefined" @click.prevent="selectedItem = 2" />
    <VNavItem href="#" text="My Cart" :aria-current="selectedItem === 3 ? 'page' : undefined" @click.prevent="selectedItem = 3" />
  </VNav>`,
	setup() {
		const selectedItem = ref(1);
		return { selectedItem };
	},
});
export const AriaCurrent = AriaCurrentTemplate.bind({});
