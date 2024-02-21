export interface TimePickerLocale {
	defaultTo12HourClock: boolean;
	chooseTimeLabel: string;
	changeTimeLabel: (time: string) => string;
	hoursLabel: string;
	minutesLabel: string;
	secondsLabel: string;
	meridiesLabel: string;
	clearLabel: string;
	okLabel: string;
	invalidTimeError: string;
}
