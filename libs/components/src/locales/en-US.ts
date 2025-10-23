import * as videoPlayerLocale from 'video.js/dist/lang/en.json';
import type { Locale } from '../shared/localization/Locale';

/* eslint-disable max-len */
const enUS: Locale = {
	lang: 'en-US',
	common: {
		useCommaAsDecimalSeparator: false,
	},
	pickerField: {
		clearLabel: 'Clear',
		okLabel: 'OK',
	},
	calendarPicker: {
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
		todayLabel: 'today',
		selectedLabel: 'selected',
		currentLabel: 'current',
		changeMonthLabel: /* istanbul ignore next */ (month: string) =>
			`Change month, ${month} selected`,
		showCalendarForMonthLabel: /* istanbul ignore next */ (month: string) =>
			`Show calendar for ${month}`,
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
		invalidTimeError: 'Please enter a valid time.',
	},
	dateTimePicker: {
		chooseDateTimeLabel: 'Choose date and time',
		changeDateTimeLabel: /* istanbul ignore next */ (dateTime: string) =>
			`Change date and time, ${dateTime}`,
		invalidDateTimeError: 'Please enter a valid date and time.',
		dateBeforeMinDateError: /* istanbul ignore next */ (minDate: string) =>
			`Date must be ${minDate} or later.`,
		dateAfterMaxDateError: /* istanbul ignore next */ (maxDate: string) =>
			`Date must be ${maxDate} or earlier.`,
		timeBeforeMinTimeError: /* istanbul ignore next */ (minTime: string) =>
			`Time must be ${minTime} or later.`,
		timeAfterMaxTimeError: /* istanbul ignore next */ (maxTime: string) =>
			`Time must be ${maxTime} or earlier.`,
	},
	filePicker: {
		invalidFileTypeError: "You can't select files of this type.",
		maxFilesExceededError: "You can't select any more files.",
		fileTooBigError:
			'File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.',
		removeFileLabel: 'Remove file',
		invalidFilesError:
			'One or more selected files are invalid. Please, upload only valid file types under the size limit.',
		uploadFilesLabel: 'Upload files',
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
		incrementButtonLabel: /* istanbul ignore next */ (step: number) =>
			step === 1 ? 'Increase value' : `Increase value by ${step}`,
		decrementButtonLabel: /* istanbul ignore next */ (step: number) =>
			step === 1 ? 'Decrease value' : `Decrease value by ${step}`,
		updatedValueAnnouncement: /* istanbul ignore next */ (value: string) =>
			`Updated value: ${value}`,
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
		deleteButtonLabel: 'Delete last digit',
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
		errorLabel: 'Error:',
	},
	tab: {
		dismissButtonLabel: 'Press the DELETE key to close this tab',
	},
	searchableSelect: {
		clearButtonLabel: 'Clear selection',
		noOptionsMessage: 'No options',
		noMatchesMessage: 'No options found',
		selectAllLabel: 'Select All',
		deselectAllLabel: 'Deselect All',
		selectedAllMessage: 'All options selected',
		deselectedAllMessage: 'All options deselected',
		loadingOptionsMessage: 'Loading...',
		removeTagButtonLabel: /* istanbul ignore next */ (label: string) =>
			`Remove ${label}`,
		optionSelectedMessage: /* istanbul ignore next */ (name: string) =>
			`Option ${name} selected.`,
		optionDeselectedMessage: /* istanbul ignore next */ (name: string) =>
			`Option ${name} deselected.`,
		optionFocusedMessage: /* istanbul ignore next */ (
			name: string,
			position: number,
			total: number,
			selected: boolean
		) =>
			`Option ${name} focused, ${
				selected ? 'selected, ' : ''
			}${position} of ${total}.`,
		maxSelectedMessage: /* istanbul ignore next */ (
			total: number,
			limit: number
		) => `${total} of ${limit} selected.`,
	},
	richTextEditor: {
		paragraphStyles: 'Paragraph styles',
		textSize: 'Text size',
		bold: 'Bold',
		italic: 'Italic',
		underline: 'Underline',
		strikethrough: 'Strikethrough',
		monospace: 'Monospace',
		undo: 'Undo',
		redo: 'Redo',
		bulletList: 'Bullet list',
		numberedList: 'Numbered list',
		alignment: 'Alignment',
		alignments: {
			left: 'Left',
			center: 'Center',
			right: 'Right',
		},
		hyperlink: 'Hyperlink',
		linkText: 'Text',
		linkUrl: 'URL',
		linkTextPlaceholder: 'Type text to convert into link',
		linkUrlPlaceholder: 'Insert link URL',
		cancel: 'Cancel',
		apply: 'Apply',
		close: 'Close',
		edit: 'Edit',
		delete: 'Delete',
		clickHere: 'Click here',
	},
	button: {
		pendingLabel: 'Loading...',
	},
	feedbackMessage: {
		errorIconText: 'Error:',
		successIconText: 'Success:',
	},
	connotationAnnoncement: {
		accentIcon: 'Accent:',
		alertIcon: 'Alert:',
		informationIcon: 'Information:',
		successIcon: 'Success:',
		warningIcon: 'Warning:',
		announcementIcon: 'Announcement:',
		ctaIcon: 'Call to action:',
	},
	charCount: {
		charactersLimitMessage: /* istanbul ignore next */ (limit: number) =>
			`You can enter up to ${limit} characters`,
		charactersRemainingMessage: /* istanbul ignore next */ (total: number) =>
			`You have ${total} characters remaining`,
	},
	dataGrid: {
		cell: {
			selected: 'Selected',
			button: '(button)',
			sortStatus: {
				ascending: 'Sorted ascending.',
				descending: 'Sorted descending.',
				none: 'Not sorted.',
				other: 'Custom sort applied.',
			},
			sortInstruction: {
				ascending: 'Click to sort descending.',
				descending: 'Click to un-sort.',
				none: 'Click to sort ascending.',
				other: 'Click to reset sorting.',
			},
		},
	},
	pagination: {
		previousPageLabel: 'Go to previous page',
		nextPageLabel: 'Go to next page',
		goToPageLabel: /* istanbul ignore next */ (index: number | string) =>
			`Go to page ${index}`,
	},
	tag: {
		remove: /* istanbul ignore next */ (label: string) => `Remove ${label}`,
	},
	toggletip: {
		anchorLabel: /* istanbul ignore next */ (ariaLabel?: string) =>
			ariaLabel
				? `Show more information about ${ariaLabel}`
				: `Show more information`,
	},
	baseColorPicker: {
		colorSwatchLabel: /* istanbul ignore next */ (
			value: string,
			label?: string,
			selected?: boolean
		) => {
			let swatchLabel = label
				? `Select ${label}, hex: ${value}`
				: `Select ${value}`;
			if (selected) swatchLabel += `, selected.`;
			return swatchLabel;
		},
	},
	simpleColorPicker: {
		colorPaletteLabel: 'Color palette',
	},
	colorPicker: {
		popupLabel: 'Color Picker',
		swatchesLabel: 'Saved colors',
		pickerButtonLabel: 'Color Picker',
		hexInputLabel: 'HEX color code',
		saveButtonLabel: 'Save current color',
		closeButtonLabel: 'Close Color Picker',
		copyButtonLabel: 'Copy color to clipboard',
		copyErrorText: 'Copy failed. Clipboard access was blocked. Try again.',
		copySuccessMessage: /* istanbul ignore next */ (value: string): string =>
			`Color ${value} copied to clipboard.`,
		selectionSuccessMessage: /* istanbul ignore next */ (
			value: string
		): string => `Color ${value} selected.`,
		maxSwatchesMessage: /* istanbul ignore next */ (total, limit): string =>
			`${total} of ${limit} colors saved.`,
	},
};
export default enUS;
