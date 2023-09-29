export interface DatePickerLocale {
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
	prevYearLabel: string;
	prevMonthLabel: string;
	nextMonthLabel: string;
	nextYearLabel: string;
	clearLabel: string;
	okLabel: string;
	invalidDateError: string;
}
