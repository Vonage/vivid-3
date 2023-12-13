import { VNote } from '@vonage/vivid-vue';
import { argTypes } from './generated/VNote';

export default {
  title: 'Wrappers/Note',
  component: VNote,
  argTypes,
};

const NoteTemplate = () => ({
  components: { VNote },
  template: `<VNote connotation="success" icon="check-circle" headline="Pascal's theological argument">
    Pascal argues that a rational person should live as though God exists and seek to believe in God. If God does not actually exist, such a person will have only a finite loss (some pleasures, luxury, etc.), whereas if God does exist, he stands to receive infinite gains (as represented by eternity in Heaven) and avoid infinite losses (eternity in Hell).
  </VNote>`,
});
export const Note = NoteTemplate.bind({});

const HeadlineTemplate = () => ({
  components: { VNote },
  template: `<VNote headline="Headline Text" />`,
});
export const Headline = HeadlineTemplate.bind({});

const IconTemplate = () => ({
  components: { VNote },
  template: `<VNote icon="home" />`,
});
export const Icon = IconTemplate.bind({});

const ConnotationTemplate = () => ({
  components: { VNote },
  template: `<div>
    <VNote connotation="alert" icon="error-solid" headline="alert note" />
    <VNote connotation="success" icon="check-circle-solid" headline="success note" />
    <VNote connotation="warning" icon="warning-solid" headline="warning note" />
    <VNote connotation="information" icon="info-solid" headline="information note" />
    <VNote connotation="accent" icon="megaphone-solid" headline="accent note" />
  </div>`,
});
export const Connotation = ConnotationTemplate.bind({});

const DefaultTemplate = () => ({
  components: { VNote },
  template: `<VNote icon="home" headline="Note Headline" connotation="information">
    <p>This is the text that explains about something important!</p>
  </VNote>`,
});
export const Default = DefaultTemplate.bind({});
