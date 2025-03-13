import { addDays } from 'date-fns';
import type { CalendarPickerLocale } from '../calendar-picker.locale';
import { type DateStr, formatDateStr } from '../../../datetime/dateStr';

import { type Month } from '../../../datetime/month';

export interface Weekday {
	name: string;
	shortName: string;
}

const getWeekdays = (locale: CalendarPickerLocale) => {
	const firstDayOfWeek = locale.firstDayOfWeek;
	const localeWeekdayToNative = (day: number): number =>
		(day + firstDayOfWeek) % 7;

	const days = [];
	for (let i = 0; i < 7; i++) {
		days.push({
			name: locale.weekdays.name[localeWeekdayToNative(i)],
			shortName: locale.weekdays.shorthand[localeWeekdayToNative(i)],
		});
	}
	return days;
};

export interface CalendarGridDate {
	date: DateStr;
	label: string;
	isOutsideMonth: boolean;
}

const gridDate = (date: Date, isOutsideMonth: boolean): CalendarGridDate => ({
	date: formatDateStr(date),
	label: `${date.getDate()}`,
	isOutsideMonth,
});

export type CalendarGrid = {
	weekdays: Weekday[];
	grid: CalendarGridDate[][];
};

function isOutsideMonth(dayIndexInMonth: number, daysInMonth: number) {
	return dayIndexInMonth < 0 || dayIndexInMonth >= daysInMonth;
}

const buildDateGrid = (
	{ month, year }: Month,
	getDay: (date: Date) => number
) => {
	const grid: CalendarGridDate[][] = [];

	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const firstDayInWeek = getDay(firstDay);
	const daysInMonth = lastDay.getDate();
	const daysOutsideMonthInLastWeek = 7 - getDay(lastDay);
	const totalDaysInCalendar =
		daysInMonth + firstDayInWeek + daysOutsideMonthInLastWeek;
	let week: CalendarGridDate[] = [];

	for (let i = 0; i < totalDaysInCalendar; i++) {
		const dayIndexInMonth = i - firstDayInWeek;
		week.push(
			gridDate(
				addDays(firstDay, dayIndexInMonth),
				isOutsideMonth(dayIndexInMonth, daysInMonth)
			)
		);
		if (week.length === 7) {
			grid.push(week);
			week = [];
		}
	}

	return grid;
};

export const buildCalendarGrid = (
	month: Month,
	locale: CalendarPickerLocale
): CalendarGrid => {
	// Shift week days to start from firstDayOfWeek
	const { firstDayOfWeek } = locale;
	const getShiftedDay = (date: Date): number =>
		(date.getDay() - firstDayOfWeek + 7) % 7;

	return {
		weekdays: getWeekdays(locale),
		grid: buildDateGrid(month, getShiftedDay),
	};
};
