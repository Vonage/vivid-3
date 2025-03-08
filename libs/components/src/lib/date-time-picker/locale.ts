export interface DateTimePickerLocale {
	chooseDateTimeLabel: string;
	changeDateTimeLabel: (dateTime: string) => string;
	invalidDateTimeError: string;
	dateBeforeMinDateError: (minDate: string) => string;
	dateAfterMaxDateError: (maxDate: string) => string;
	timeBeforeMinTimeError: (minTime: string) => string;
	timeAfterMaxTimeError: (maxTime: string) => string;
}
