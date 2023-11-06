import type { Locale } from '../shared/localization/Locale';

const enUS: Locale = {
	datePicker: {
		months: {
			name: [
				'January',
				'February',
				'March',
				'April',
				'May',
				'June',
				'July',
				'August',
				'September',
				'October',
				'November',
				'December',
			],
			shorthand: [
				'Jan',
				'Feb',
				'Mar',
				'Apr',
				'May',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Oct',
				'Nov',
				'Dec',
			],
		},
		weekdays: {
			name: [
				'Sunday',
				'Monday',
				'Tuesday',
				'Wednesday',
				'Thursday',
				'Friday',
				'Saturday',
			],
			shorthand: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
		},
		firstDayOfWeek: 0,
		dateFormat: 'MM/dd/yyyy',
		dateFormatPlaceholder: 'MM/DD/YYYY',
		chooseDateLabel: 'Choose date',
		changeDateLabel: /* istanbul ignore next */ (date: string) => `Change date, ${date}`,
		chooseDatesLabel: 'Choose dates',
		changeDatesLabel: /* istanbul ignore next */ (range: string) => `Change dates, ${range}`,
		prevYearLabel: 'Previous year',
		prevMonthLabel: 'Previous month',
		nextMonthLabel: 'Next month',
		nextYearLabel: 'Next year',
		clearLabel: 'Clear',
		okLabel: 'OK',
		invalidDateError: 'Please enter a valid date.',
		invalidDateRangeError: 'Please enter a valid date range.',
		startDateAfterMinDateError: /* istanbul ignore next */ (minDate: string) =>
			`The start date must be ${minDate} or later.`,
		endDateBeforeMaxDateError: /* istanbul ignore next */ (maxDate: string) =>
			`The end date must be ${maxDate} or earlier.`,
	},
	filePicker: {
		invalidFileTypeError: "You can't select files of this type.",
		maxFilesExceededError: "You can't select any more files.",
		fileTooBigError:
			'File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.',
		removeFileLabel: 'Remove file',
	},
	audioPlayer: {
		playButtonLabel: 'Play',
		pauseButtonLabel: 'Pause',
		sliderLabel: 'Audio progress bar',
	},
	dialog: {
		dismissButtonLabel: 'Close',
	},
	numberField: {
		incrementButtonLabel: 'Increment',
		decrementButtonLabel: 'Decrement',
	},
	splitButton: {
		showMoreActionsLabel: 'Show more actions',
	}
};

export default enUS;
