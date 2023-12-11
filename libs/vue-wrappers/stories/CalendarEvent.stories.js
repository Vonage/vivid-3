import { VCalendar, VCalendarEvent } from '@vonage/vivid-vue';
import { argTypes } from './generated/VCalendarEvent';

export default {
  title: 'Wrappers/CalendarEvent',
  component: VCalendarEvent,
  argTypes,
};

const BasicTemplate = () => ({
  components: { VCalendar, VCalendarEvent },
  template: `<v-calendar datetime="2021-01-01">
    <v-calendar-event
      slot="day-0"
      start="0"
      duration="1"
      connotation="information"
      heading="Pool party"
      description="2pm"
    />
    <v-calendar-event
      slot="day-0"
      start="14"
      duration="2.25"
      connotation="accent"
      appearance="subtle"
      heading="Summer time"
      description="All Day"
    />
    <v-calendar-event
      slot="day-2"
      start="4"
      duration="4"
      connotation="announcement"
      heading="Team meeting"
      description="11am - 13pm"
    />
    <v-calendar-event
      slot="day-3"
      start="16"
      duration="8"
      connotation="success"
      heading="Main event"
      description="12:30pm"
      overlap-count="2"
    />
    <v-calendar-event
      slot="day-3"
      start="17"
      duration="7"
      connotation="information"
      heading="Roadmap discussion"
      description="All Day"
    />
    <v-calendar-event
      slot="day-3"
      start="18.5"
      duration="7.5"
      connotation="accent"
      appearance="subtle"
      heading="Summer time"
      description="15:30pm"
      overlap-count="1"
    />
    <v-calendar-event slot="day-6" start="12" duration="4" connotation="cta" heading="Team social" description="14pm" />
    <v-calendar-event
      slot="day-6"
      start="20"
      duration="5"
      connotation="success"
      heading="Summer time"
      description="18pm"
    />
  </v-calendar>`,
});

export const Basic = BasicTemplate.bind({});

const HeadingTemplate = () => ({
  components: { VCalendar, VCalendarEvent },
  template: `<v-calendar>
  <v-calendar-event heading="Summer pool party" slot="day-0"/>
</v-calendar>`,
});

export const Heading = HeadingTemplate.bind({});

const DescriptionTemplate = () => ({
  components: { VCalendar, VCalendarEvent },
  template: `<v-calendar>
  <v-calendar-event description="A party in which guests swim in a swimming pool" slot="day-0"/>
</v-calendar>`,
});

export const Description = DescriptionTemplate.bind({});

const AppearanceTemplate = () => ({
  components: { VCalendar, VCalendarEvent },
  template: `<v-calendar>
  <v-calendar-event appearance="filled" heading="filled" slot="day-0"/>
  <v-calendar-event appearance="subtle" heading="subtle" slot="day-1" />
</v-calendar>`,
});

export const Appearance = AppearanceTemplate.bind({});

const ConnotationTemplate = () => ({
  components: { VCalendar, VCalendarEvent },
  template: `<v-calendar>
  <v-calendar-event connotation="accent" appearance="filled" heading="accent" slot="day-0"/>
  <v-calendar-event connotation="cta" appearance="filled" heading="cta" slot="day-1"/>
  <v-calendar-event connotation="success" appearance="filled" heading="success" slot="day-2"/>
  <v-calendar-event connotation="alert" appearance="filled" heading="alert" slot="day-3"/>
  <v-calendar-event connotation="warning" appearance="filled" heading="warning" slot="day-4"/>
  <v-calendar-event connotation="information" appearance="filled" heading="information" slot="day-5"/>
  <v-calendar-event connotation="announcement" appearance="filled" heading="announcement" slot="day-6"/>
</v-calendar>`,
});

export const Connotation = ConnotationTemplate.bind({});

const SubtleCalendarEventTemplate = () => ({
  components: { VCalendar, VCalendarEvent },
  template: `<v-calendar>
  <v-calendar-event connotation="accent" appearance="subtle" heading="accent" slot="day-0"/>
  <v-calendar-event connotation="cta" appearance="subtle" heading="cta" slot="day-1"/>
  <v-calendar-event connotation="success" appearance="subtle" heading="success" slot="day-2"/>
  <v-calendar-event connotation="alert" appearance="subtle" heading="alert" slot="day-3"/>
  <v-calendar-event connotation="warning" appearance="subtle" heading="warning" slot="day-4"/>
  <v-calendar-event connotation="information" appearance="subtle" heading="information" slot="day-5"/>
  <v-calendar-event connotation="announcement" appearance="subtle" heading="announcement" slot="day-6"/>
</v-calendar>`,
});

export const SubtleCalendarEventTemplateWithConnotation = SubtleCalendarEventTemplate.bind({});
