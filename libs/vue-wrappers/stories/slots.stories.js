import { VAccordion, VAccordionItem } from '@vonage/vivid-vue';

export default {
	title: 'Basic/Slots',
	component: {},
};

const DefaultSlotTemplate = () => ({
	components: { VAccordion, VAccordionItem },
	template: `<VAccordion>
		<VAccordionItem heading="Default slot">
			Default slot content <button>Default slot el</button>
    </VAccordionItem>
  </VAccordion>`,
});

export const DefaultSlot = DefaultSlotTemplate.bind({});

const NamedSlotTemplate = () => ({
	components: { VAccordion, VAccordionItem },
	template: `<VAccordion>
		<VAccordionItem heading="Named slot">
			<template #icon><button>named slot el1</button><button>named slot el2</button></template>
    </VAccordionItem>
  </VAccordion>`,
});

export const NamedSlot = NamedSlotTemplate.bind({});

const NamedSlotTextNodesTemplate = () => ({
	components: { VAccordion, VAccordionItem },
	template: `<VAccordion>
		<VAccordionItem heading="Named slot text nodes">
			Text nodes will be wrapped in a span to allow them
			<template #icon>
				Text node 1
				<button>element</button>
				Text node 2
				<!-- Comment node -->
				Text node 3
			</template>
    </VAccordionItem>
  </VAccordion>`,
});

export const NamedSlotTextNodes = NamedSlotTextNodesTemplate.bind({});

const AccordionItemWrapper = {
	components: { VAccordionItem },
	template: `<VAccordionItem heading="I forward my slots">
		<slot></slot>
		<template #icon><slot name="icon"></slot></template>
	</VAccordionItem>`,
};

const SlotForwardingTemplate = () => ({
	components: { VAccordion, AccordionItemWrapper },
	template: `<VAccordion>
		<AccordionItemWrapper>
			Forwarded default slot
			<template #icon><button>Forwarded name slot el</button> Text node</template>
    </AccordionItemWrapper>
  </VAccordion>`,
});

export const SlotForwarding = SlotForwardingTemplate.bind({});

const AccordionItemWrapperAllSlots = {
	components: { VAccordionItem },
	template: `<VAccordionItem heading="I forward all my slots automatically">
		<template v-for="(_, name) in $slots" v-slot:[name]><slot :name="name" /></template>
	</VAccordionItem>`,
};

const AllSlotForwardingTemplate = () => ({
	components: {
		VAccordion,
		AccordionItemWrapperAllSlots,
	},
	template: `<VAccordion>
		<AccordionItemWrapperAllSlots>
			Forwarded default slot
			<template #icon><button>Forwarded name slot el</button> Text node</template>
    </AccordionItemWrapperAllSlots>
  </VAccordion>`,
});

export const AllSlotForwarding = AllSlotForwardingTemplate.bind({});
