import { VAccordion, VAccordionItem } from '@vonage/vivid-vue';
import { argTypes } from './generated/VAccordionItem';

export default {
	title: 'Wrappers/AccordionItem',
	component: VAccordionItem,
	argTypes,
};

const Template = () => ({
	components: { VAccordion, VAccordionItem },
	template: `<v-accordion>
  <v-accordion-item heading="Accordion Item Header">
    This is the first item's accordion body.
  </v-accordion-item>
</v-accordion>`,
});

export const Heading = Template.bind({});

const HeadingLevelTemplate = () => ({
	components: { VAccordion, VAccordionItem },
	template: `<v-accordion>
  <v-accordion-item heading="my heading" heading-level="3">
    This is the first item's accordion body.
  </v-accordion-item>
</v-accordion>`,
});

export const HeadingLevel = HeadingLevelTemplate.bind({});

const ExpandedTemplate = () => ({
	components: { VAccordion, VAccordionItem },
	template: `<v-accordion>
  <v-accordion-item heading="Click to toggle accordion item" expanded>
    This is the first item's accordion body.
  </v-accordion-item>
</v-accordion>`,
});

export const Expanded = ExpandedTemplate.bind({});

const NoIndicatorTemplate = () => ({
	components: { VAccordion, VAccordionItem },
	template: `<v-accordion>
  <v-accordion-item heading="Accordion item without indicator" no-indicator>
    This is the first item's accordion body.
  </v-accordion-item>
</v-accordion>`,
});

export const NoIndicator = NoIndicatorTemplate.bind({});

const MetaTemplate = () => ({
	components: { VAccordion, VAccordionItem },
	template: `<v-accordion>
  <v-accordion-item heading="Accordion item with metadata" meta="meta-data">
    This is the first item's accordion body.
  </v-accordion-item>
</v-accordion>`,
});

export const Meta = MetaTemplate.bind({});

const IconTemplate = () => ({
	components: { VAccordion, VAccordionItem },
	template: `<v-accordion>
  <v-accordion-item heading="Accordion item with icon" icon="chat-solid">
    This is the first item's accordion body.
  </v-accordion-item>
</v-accordion>`,
});

export const Icon = IconTemplate.bind({});

const IconTrailingTemplate = () => ({
	components: { VAccordion, VAccordionItem },
	template: `<v-accordion>
  <v-accordion-item heading="Accordion item with icon-trailing" icon="chat-solid" icon-trailing>
    This is the first item's accordion body.
  </v-accordion-item>
</v-accordion>`,
});

export const IconTrailing = IconTrailingTemplate.bind({});

const SizeTemplate = () => ({
	components: { VAccordion, VAccordionItem },
	template: `<v-accordion>
  <v-accordion-item heading="normal accordion item" meta="meta-data" icon="chat-solid">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
    </v-accordion-item>
  </v-accordion>
  <hr>
  <v-accordion>
  <v-accordion-item heading="condensed accordion item" size="condensed" meta="meta-data" icon="chat-solid">
    Lorem Ipsum is simply dummy text of the printing and typesetting industry.
  </v-accordion-item>
  </v-accordion>`,
});

export const Size = SizeTemplate.bind({});
