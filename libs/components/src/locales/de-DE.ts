import * as videoPlayerLocale from 'video.js/dist/lang/de.json';
import type { Locale } from '../shared/localization/Locale';

/* eslint-disable max-len */
const deDE: Locale = {
	lang: 'de-DE',
	common: {
		useCommaAsDecimalSeparator: true,
	},
	datePicker: {
		months: {
			name: [
				'Januar',
				'Februar',
				'März',
				'April',
				'Mai',
				'Juni',
				'Juli',
				'August',
				'September',
				'Oktober',
				'November',
				'Dezember',
			],
			shorthand: [
				'Jan',
				'Feb',
				'Mär',
				'Apr',
				'Mai',
				'Jun',
				'Jul',
				'Aug',
				'Sep',
				'Okt',
				'Nov',
				'Dez',
			],
		},
		weekdays: {
			name: [
				'Sonntag',
				'Montag',
				'Dienstag',
				'Mittwoch',
				'Donnerstag',
				'Freitag',
				'Samstag',
			],
			shorthand: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
		},
		firstDayOfWeek: 1,
		dateFormat: 'dd.MM.yyyy',
		dateFormatPlaceholder: 'DD.MM.YYYY',
		chooseDateLabel: 'Datum auswählen',
		changeDateLabel: /* istanbul ignore next */ (date: string) =>
			`Datum ändern, ${date}`,
		chooseDatesLabel: 'Daten auswählen',
		changeDatesLabel: /* istanbul ignore next */ (range: string) =>
			`Daten ändern, ${range}`,
		prevYearLabel: 'Vorheriges Jahr',
		prevMonthLabel: 'Vorheriger Monat',
		nextMonthLabel: 'Nächster Monat',
		nextYearLabel: 'Nächstes Jahr',
		clearLabel: 'Löschen',
		okLabel: 'OK',
		invalidDateError: 'Bitte geben Sie ein gültiges Datum ein.',
		invalidDateRangeError: 'Bitte geben Sie einen gültigen Datumsbereich ein.',
		startDateAfterMinDateError: /* istanbul ignore next */ (minDate: string) =>
			`Das Startdatum muss ${minDate} oder später sein.`,
		endDateBeforeMaxDateError: /* istanbul ignore next */ (maxDate: string) =>
			`Das Enddatum muss ${maxDate} oder früher sein.`,
	},
	timePicker: {
		defaultTo12HourClock: false,
		chooseTimeLabel: 'Zeit auswählen',
		changeTimeLabel: /* istanbul ignore next */ (time: string) =>
			`Zeit ändern, ${time}`,
		hoursLabel: 'Stunden',
		minutesLabel: 'Minuten',
		secondsLabel: 'Sekunden',
		meridiesLabel: 'AM/PM',
		clearLabel: 'Löschen',
		okLabel: 'OK',
		invalidTimeError: 'Bitte geben Sie eine gültige Zeit ein.',
	},
	filePicker: {
		invalidFileTypeError: 'Sie können keine Dateien dieses Typs auswählen.',
		maxFilesExceededError: 'Sie können keine weiteren Dateien auswählen.',
		fileTooBigError:
			'Die Datei ist zu groß ({{filesize}}MiB). Maximale Dateigröße: {{maxFilesize}}MiB.',
		removeFileLabel: 'Datei entfernen',
	},
	audioPlayer: {
		playButtonLabel: 'Abspielen',
		pauseButtonLabel: 'Pause',
		sliderLabel: 'Wiedergabebalken',
		skipForwardButton: 'Vorwärts springen',
		skipBackwardButton: 'Rückwärts springen',
	},
	alert: {
		dismissButtonLabel: 'Schließen',
	},
	dialog: {
		dismissButtonLabel: 'Schließen',
	},
	banner: {
		dismissButtonLabel: 'Schließen',
	},
	numberField: {
		incrementButtonLabel: 'Erhöhen',
		decrementButtonLabel: 'Verringern',
	},
	splitButton: {
		showMoreActionsLabel: 'Weitere Aktionen anzeigen',
	},
	videoPlayer: videoPlayerLocale,
	rangeSlider: {
		startThumbLabel: 'min',
		endThumbLabel: 'max',
	},
	dialPad: {
		inputLabel: 'Telefonnummer',
		deleteButtonLabel: 'Löschen',
		callButtonLabel: 'Anrufen',
		endCallButtonLabel: 'Anruf beenden',
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
	tab: {
		dismissButtonLabel: 'Drücken Sie die ENTF-Taste, um diese Registerkarte zu schließen',
	},
	searchableSelect: {
		clearButtonLabel: 'Löschen',
		noOptionsMessage: 'Keine Optionen',
		noMatchesMessage: 'Keine Optionen gefunden',
		removeTagButtonLabel: /* istanbul ignore next */ (label: string) =>
			`${label} entfernen`,
	},
};

export default deDE;
