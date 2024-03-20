import { VCalendar, VCard, VLayout } from '@vonage/vivid-vue';
import { argTypes, Template } from './generated/VCalendar';

export default {
	title: 'Wrappers/Calendar',
	component: VCalendar,
	argTypes,
};

export const Basic = Template.bind({});

export const DateTime = Template.bind({});
DateTime.args = {
	datetime: '2022-01-01',
};

export const StartDay = Template.bind({});
StartDay.args = {
	startDay: 'sunday',
};

const LocaleTemplate = () => ({
	components: { VCalendar, VLayout, VCard },
	template: `<v-calendar locales="he-IL" startDay="sunday" style="direction: rtl"/>`,
});
export const Locale = LocaleTemplate.bind({});

export const Hour12 = Template.bind({});
Hour12.args = {
	hour12: true,
};
