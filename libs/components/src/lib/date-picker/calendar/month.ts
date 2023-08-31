import { type DateStr, parseDateStr } from './dateStr';

/// Number of month from 0-11
export type MonthNumber = number;

/// Represents a specific month
export type Month = {
	month: MonthNumber;
	year: number;
};

export const getCurrentMonth = (now = new Date()): Month => ({
	month: now.getMonth(),
	year: now.getFullYear(),
});

export const monthOfDate = (dateStr: DateStr): Month => {
	const date = parseDateStr(dateStr);
	return { month: date.getMonth(), year: date.getFullYear() };
};

export const addMonths = ({ month, year }: Month, months: number): Month => {
	const date = new Date(year, month);
	date.setMonth(date.getMonth() + months);
	return { month: date.getMonth(), year: date.getFullYear() };
};

export const areMonthsEqual = (a: Month, b: Month): boolean =>
	a.month === b.month && a.year === b.year;

/// Convert a month to a string representation e.g. 2023-8
export const monthToStr = ({ month, year }: Month): string =>
	`${year}-${month + 1}`;
