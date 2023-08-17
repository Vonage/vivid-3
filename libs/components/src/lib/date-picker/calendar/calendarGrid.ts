import { addDays } from 'date-fns';
import type { DatePickerLocale } from '../locale';
import { type DateStr, formatDateStr } from './dateStr';

import { type Month } from './month';

export interface Weekday {
	name: string;
	shortName: string;
}

const getWeekdays = (locale: DatePickerLocale) => {
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

const buildDateGrid = (
	{ month, year }: Month,
	getDay: (date: Date) => number
) => {
	const grid: CalendarGridDate[][] = [];

	const firstDay = new Date(year, month, 1);
	const lastDay = new Date(year, month + 1, 0);
	const daysInMonth = lastDay.getDate();
	const firstDayInWeek = getDay(firstDay);

	let week: CalendarGridDate[] = [];

	// Fill in the days before the first day of the month
	for (let i = 0; i < firstDayInWeek; i++) {
		week.push(gridDate(addDays(firstDay, i - firstDayInWeek), true));
	}

	// Fill up days of the month
	for (let i = 1; i <= daysInMonth; i++) {
		week.push(gridDate(new Date(year, month, i), false));
		if (week.length === 7) {
			grid.push(week);
			week = [];
		}
	}

	// Fill in the days after the last day of the month
	const daysInLastWeek = week.length;
	for (let i = daysInLastWeek; i < 7; i++) {
		week.push(gridDate(addDays(lastDay, i - daysInLastWeek + 1), true));
	}

	if (week.length > 0) {
		grid.push(week);
	}

	return grid;
};

export const buildCalendarGrid = (
	month: Month,
	locale: DatePickerLocale
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
