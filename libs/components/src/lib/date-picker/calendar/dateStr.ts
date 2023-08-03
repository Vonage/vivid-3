import { formatISO } from 'date-fns';

/// Date format: YYYY-MM-DD
export type DateStr = string;

export const formatDateStr = (date: Date): DateStr =>
	formatISO(date, { representation: 'date' });

export const currentDateStr = (now = new Date()): DateStr => formatDateStr(now);

export const parseDateStr = (dateStr: DateStr): Date => {
	const [year, month, day] = dateStr.split('-');
	return new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
};

export const addDays = (dateStr: DateStr, days: number): DateStr => {
	const date = parseDateStr(dateStr);
	const resultDate = new Date(date);
	resultDate.setDate(resultDate.getDate() + days);
	return formatDateStr(resultDate);
};

export const isValidDateStr = (string: string): boolean => {
	const components = string.split('-');
	if (components.length !== 3) {
		return false;
	}

	// Check that all components are numbers
	for (const component of components) {
		if (!/^\d+$/.test(component)) {
			return false;
		}
	}

	// Check that the date is valid
	const [yearStr, monthStr, dayStr] = components;
	const year = parseInt(yearStr);
	const month = parseInt(monthStr) - 1;
	const day = parseInt(dayStr);
	const date = new Date(year, month, day);
	return (
		date.getFullYear() === year &&
		date.getMonth() === month &&
		date.getDate() === day
	);
};
