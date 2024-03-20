import { VNav, VNavDisclosure, VNavItem } from '@vonage/vivid-vue';
import { ref } from 'vue';
import { argTypes } from './generated/VNav';

export default {
	title: 'Wrappers/Nav',
	component: VNav,
	argTypes,
};

const DefaultTemplate = () => ({
	components: { VNav, VNavItem },
	template: `<VNav>
    <VNavItem
      href="#"
      text="1st level item"
      :aria-current="selectedItem === 1 ? 'page' : undefined"
      @click.prevent="selectedItem = 1"
    />
    <VNavItem
      href="#"
      text="1st level item"
      :aria-current="selectedItem === 2 ? 'page' : undefined"
      @click.prevent="selectedItem = 2"
    />
    <VNavItem
      href="#"
      text="1st level item"
      :aria-current="selectedItem === 3 ? 'page' : undefined"
      @click.prevent="selectedItem = 3"
    />
  </VNav>`,
	setup() {
		const selectedItem = ref(1);
		return { selectedItem };
	},
});
export const Default = DefaultTemplate.bind({});

const NavigationDisclosureTemplate = () => ({
	components: { VNav, VNavDisclosure, VNavItem },
	template: `<VNav>
    <VNavDisclosure label="1st level item" open>
      <VNavItem
        href="#"
        text="2nd level item"
        :aria-current="selectedItem === 1 ? 'page' : undefined"
        @click.prevent="selectedItem = 1"
      />
      <VNavDisclosure label="2nd level item" open>
        <VNavItem
          href="#"
          text="3rd level item"
          :aria-current="selectedItem === 2 ? 'page' : undefined"
          @click.prevent="selectedItem = 2"
        />
        <VNavItem
          href="#"
          text="3rd level item"
          :aria-current="selectedItem === 3 ? 'page' : undefined"
          @click.prevent="selectedItem = 3"
        />
      </VNavDisclosure>
    </VNavDisclosure>
  </VNav>`,
	setup() {
		const selectedItem = ref(1);
		return { selectedItem };
	},
});
export const NavigationDisclosure = NavigationDisclosureTemplate.bind({});
