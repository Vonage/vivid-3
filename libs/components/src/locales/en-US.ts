import * as videoPlayerLocale from 'video.js/dist/lang/en.json';
import type { Locale } from '../shared/localization/Locale';

/* eslint-disable max-len */
const enUS: Locale = {
	lang: 'en-US',
	common: {
		useCommaAsDecimalSeparator: false,
	},
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
		changeDateLabel: /* istanbul ignore next */ (date: string) =>
			`Change date, ${date}`,
		chooseDatesLabel: 'Choose dates',
		changeDatesLabel: /* istanbul ignore next */ (range: string) =>
			`Change dates, ${range}`,
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
	timePicker: {
		defaultTo12HourClock: true,
		chooseTimeLabel: 'Choose time',
		changeTimeLabel: /* istanbul ignore next */ (time: string) =>
			`Change time, ${time}`,
		hoursLabel: 'hours',
		minutesLabel: 'minutes',
		secondsLabel: 'seconds',
		meridiesLabel: 'AM/PM',
		clearLabel: 'Clear',
		okLabel: 'OK',
		invalidTimeError: 'Please enter a valid time.',
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
		skipForwardButton: 'Skip Forward',
		skipBackwardButton: 'Skip Backward',
	},
	alert: {
		dismissButtonLabel: 'Close',
	},
	dialog: {
		dismissButtonLabel: 'Close',
	},
	banner: {
		dismissButtonLabel: 'Close',
	},
	numberField: {
		incrementButtonLabel: 'Increment',
		decrementButtonLabel: 'Decrement',
	},
	splitButton: {
		showMoreActionsLabel: 'Show more actions',
	},
	videoPlayer: videoPlayerLocale,
	rangeSlider: {
		startThumbLabel: 'min',
		endThumbLabel: 'max',
	},
	dialPad: {
		inputLabel: 'Phone number',
		deleteButtonLabel: 'Delete',
		callButtonLabel: 'Call',
		endCallButtonLabel: 'End call',
		digitOneLabel: '1',
		digitTwoLabel: '2 ABC',
		digitThreeLabel: '3 DEF',
		digitFourLabel: '4 GHI',
		digitFiveLabel: '5 JKL',
		digitSixLabel: '6 MNO',
		digitSevenLabel: '7 PQRS',
		digitEightLabel: '8 TUV',
		digitNineLabel: '9 WXYZ',
		digitAsteriskLabel: '*',
		digitZeroLabel: '0',
		digitHashtagLabel: '#',
	},
<<<<<<< HEAD
	tab: {
		dismissButtonLabel: 'Press the DELETE key to close this tab',
=======
	searchableSelect: {
		clearButtonLabel: 'Clear',
		noOptionsMessage: 'No options',
		noMatchesMessage: 'No options found',
		removeTagButtonLabel: /* istanbul ignore next */ (label: string) =>
			`Remove ${label}`,
>>>>>>> main
	},
};

export default enUS;
