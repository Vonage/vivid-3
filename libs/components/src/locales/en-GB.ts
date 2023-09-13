import type { Locale } from '../shared/localization/Locale';

const enGB: Locale = {
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
		firstDayOfWeek: 1,
		dateFormat: 'dd/MM/yyyy',
		dateFormatPlaceholder: 'DD/MM/YYYY',
		chooseDateLabel: 'Choose date',
		prevYearLabel: 'Previous year',
		prevMonthLabel: 'Previous month',
		nextMonthLabel: 'Next month',
		nextYearLabel: 'Next year',
		clearLabel: 'Clear',
		okLabel: 'OK',
		invalidDateError: 'Please enter a valid date.',
	},
	filePicker: {
		invalidFileTypeError: "You can't select files of this type.",
		maxFilesExceededError: "You can't select any more files.",
		fileTooBigError:
			'File is too big ({{filesize}}MiB). Max filesize: {{maxFilesize}}MiB.',
		removeFileLabel: 'Remove file',
	},
};

export default enGB;
