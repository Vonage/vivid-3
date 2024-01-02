import { VAccordion, VAccordionItem } from '@vonage/vivid-vue';
import { argTypes } from './generated/VAccordion';

export default {
  title: 'Wrappers/Accordion',
  component: VAccordion,
  argTypes,
};

const Template = () => ({
  components: { VAccordion, VAccordionItem },
  template: `<v-accordion>
  <v-accordion-item heading="Accordion item 1" expanded>
    This is the first item's accordion body.
  </v-accordion-item>
  <v-accordion-item heading="Accordion item 2">
    This is the second item's accordion body.
  </v-accordion-item>
  <v-accordion-item heading="Accordion item 3">
    This is the third item's accordion body.
  </v-accordion-item>
  <v-accordion-item heading="Accordion item 4">
    This is the fourth item's accordion body.
  </v-accordion-item>
</v-accordion>`,
});

export const ExpandMode = Template.bind({});
ExpandMode.args = {
  expandMode: 'multi',
};
