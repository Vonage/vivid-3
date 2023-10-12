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

export const compareMonths = (a: Month, b: Month): number =>
	a.year === b.year ? a.month - b.month : a.year - b.year;

export const areMonthsEqual = (a: Month, b: Month): boolean =>
	compareMonths(a, b) === 0;

/// Convert a month to a string representation e.g. 2023-08
export const monthToStr = ({ month, year }: Month): string =>
	`${year.toString().padStart(4, '0')}-${(month + 1)
		.toString()
		.padStart(2, '0')}`;
