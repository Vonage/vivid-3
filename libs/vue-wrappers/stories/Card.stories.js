import { VButton, VCard, VIcon, VLayout } from '@vonage/vivid-vue';
import { argTypes, Template } from './generated/VCard';

export default {
	title: 'Wrappers/Card',
	component: VCard,
	argTypes,
	args: {
		headline: 'Vivid Card Component',
	},
};

export const Headline = Template.bind({});

export const SubTitle = Template.bind({});
SubTitle.args = { subtitle: 'extra text to the card headline' };

export const Elevation = Template.bind({});
Elevation.args = {
	elevation: '12',
	subtitle: 'extra text to the card headline',
	icon: 'chat-line',
	text: 'the card can contain multiple lines of text',
};

export const Icon = Template.bind({});
Icon.args = {
	subtitle: 'extra text to the card headline',
	icon: 'chat-line',
};

export const Text = Template.bind({});
Text.args = {
	subtitle: 'extra text to the card headline',
	text: 'the card can contain multiple lines of text',
};

const GraphicSlotTemplate = () => ({
	components: { VCard, VIcon },
	template: `<v-card headline="Vivid Card Component" subtitle="extra text to the card headline">
  <template #graphic>
  <v-icon name="android-mono" style="font-size: 44px;" ></v-icon>
  </template>
</v-card>`,
});

export const GraphicSlot = GraphicSlotTemplate.bind({});

const MediaSlotTemplate = () => ({
	components: { VCard },
	template: `<v-card headline="Card with Media" text="here is the card text" style="max-inline-size: 300px">
  <template #media>
  <img src="https://doodleipsum.com/300x150/flat?bg=EB765D&amp;i=7d5ed3bc0c215d1359b2a63d03cf1540" alt="Sitting on Floor"style="width: 100%; height: 150px; object-fit: cover;"/>
  </template>
</v-card>`,
});

export const MediaSlot = MediaSlotTemplate.bind({});

const MetaSlotTemplate = () => ({
	components: { VCard, VButton },
	template: `<v-card headline="Vivid Card Component" subtitle="extra text to the card headline">
  <template #meta>
  <v-button icon="more-vertical-solid" appearance="ghost"></v-button>
  </template>
</v-card>`,
});

export const MetaSlot = MetaSlotTemplate.bind({});

const FooterSlotTemplate = () => ({
	components: { VCard, VButton },
	template: `<v-card headline="All Options on Deck" subtitle="subtitle" icon="chat-line" text="here is the card text">
  <template #media>
  <div style="height: 150px; width: 100%; background-color: rebeccapurple;"></div>
  </template>
  <template #meta>
  <v-button icon="more-vertical-solid" appearance="ghost"></v-button>
  </template>
  <template #footer>
  <v-button icon="arrow-bold-right-line" shape="pill" label="Action" appearance="outlined"></v-button>
  </template>
</v-card>`,
});

export const FooterSlot = FooterSlotTemplate.bind({});

const MainSlotTemplate = () => ({
	components: { VCard, VLayout },
	template: `<v-card>
  <template #main>
  <v-layout gutters="small">
    assign custom template using "main" slot
  </v-layout>
  </template>
</v-card>`,
});

export const MainSlot = MainSlotTemplate.bind({});

const TrimHeadlineTemplate = () => ({
	components: { VCard, VLayout },
	template: `<v-card
  headline="Vivid Card Component with long headline to trim"
  subtitle="here is the card text"
  style="--headline-line-clamp: 1;max-inline-size: 42ch;"
>
</v-card>`,
});

export const TrimHeadline = TrimHeadlineTemplate.bind({});

const TrimSubTitleTemplate = () => ({
	components: { VCard, VLayout },
	template: `<v-card
  headline="Vivid Card Component"
  subtitle="extra text to the card headline that is set to be trimmed after 2 lines so the card will not be too long"
  style=" --subtitle-line-clamp: 2;max-inline-size: 42ch;"
>
</v-card>`,
});

export const TrimSubTitle = TrimSubTitleTemplate.bind({});
