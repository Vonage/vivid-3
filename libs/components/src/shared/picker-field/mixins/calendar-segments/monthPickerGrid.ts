import type { CalendarPickerLocale } from '../calendar-picker.locale';
import { type Month } from '../../../datetime/month';

export interface MonthPickerGridCell {
	month: Month;
	label: string;
	monthName: string;
}

export type MonthPickerGrid = MonthPickerGridCell[][];

export const MonthsPerRow = 4;

export const buildMonthPickerGrid = (
	year: number,
	locale: CalendarPickerLocale
): MonthPickerGrid => {
	const grid: MonthPickerGridCell[][] = [];

	let row: MonthPickerGridCell[] = [];
	for (let i = 0; i < 12; i++) {
		const month = { month: i, year };

		row.push({
			label: locale.months.shorthand[i],
			monthName: locale.months.name[i],
			month,
		});

		if (row.length === MonthsPerRow) {
			grid.push(row);
			row = [];
		}
	}
	return grid;
};
