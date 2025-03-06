import type { CalendarGrid } from './calendarGrid';
import type { MonthPickerGrid } from './monthPickerGrid';

type BaseSegment = {
	id: number;
	title: string;
	titleClickable: boolean;
	prevYearButton?: boolean;
	prevMonthButton?: boolean;
	nextMonthButton?: boolean;
	nextYearButton?: boolean;
};

export type CalendarSegment = BaseSegment & {
	type: 'calendar';
	calendar: CalendarGrid;
};

export type MonthPickerSegment = BaseSegment & {
	type: 'month-picker';
	months: MonthPickerGrid;
};

export type Segment = CalendarSegment | MonthPickerSegment;
