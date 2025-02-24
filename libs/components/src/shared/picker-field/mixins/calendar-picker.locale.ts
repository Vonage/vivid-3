export interface CalendarPickerLocale {
	months: {
		name: string[];
		shorthand: string[];
	};
	weekdays: {
		name: string[];
		shorthand: string[];
	};
	firstDayOfWeek: number;
	dateFormat: string;
	dateFormatPlaceholder: string;
	chooseDateLabel: string;
	changeDateLabel: (date: string) => string;
	chooseDatesLabel: string;
	changeDatesLabel: (range: string) => string;
	prevYearLabel: string;
	prevMonthLabel: string;
	nextMonthLabel: string;
	nextYearLabel: string;
	invalidDateError: string;
	invalidDateRangeError: string;
	startDateAfterMinDateError: (minDate: string) => string;
	endDateBeforeMaxDateError: (maxDate: string) => string;
}
