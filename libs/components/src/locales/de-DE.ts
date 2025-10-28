import * as videoPlayerLocale from 'video.js/dist/lang/de.json';
import type { Locale } from '../shared/localization/Locale';

/* eslint-disable max-len */
const deDE: Locale = {
	lang: 'de-DE',
	common: {
		useCommaAsDecimalSeparator: true,
	},
	pickerField: {
		clearLabel: 'Löschen',
		okLabel: 'OK',
	},
	calendarPicker: {
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
		todayLabel: 'heute',
		selectedLabel: 'ausgewählt',
		currentLabel: 'aktuell',
		changeMonthLabel: /* istanbul ignore next */ (month: string) =>
			`Monat ändern, ${month} ausgewählt`,
		showCalendarForMonthLabel: /* istanbul ignore next */ (month: string) =>
			`Kalender für ${month} anzeigen`,
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
		invalidTimeError: 'Bitte geben Sie eine gültige Zeit ein.',
	},
	dateTimePicker: {
		chooseDateTimeLabel: 'Datum und Uhrzeit auswählen',
		changeDateTimeLabel: /* istanbul ignore next */ (dateTime: string) =>
			`Datum und Uhrzeit ändern, ${dateTime}`,
		invalidDateTimeError:
			'Bitte geben Sie ein gültiges Datum und eine gültige Uhrzeit ein.',
		dateBeforeMinDateError: /* istanbul ignore next */ (minDate: string) =>
			`Das Datum muss ${minDate} oder später sein.`,
		dateAfterMaxDateError: /* istanbul ignore next */ (maxDate: string) =>
			`Das Datum muss ${maxDate} oder früher sein.`,
		timeBeforeMinTimeError: /* istanbul ignore next */ (minTime: string) =>
			`Die Uhrzeit muss ${minTime} oder später sein.`,
		timeAfterMaxTimeError: /* istanbul ignore next */ (maxTime: string) =>
			`Die Uhrzeit muss ${maxTime} oder früher sein.`,
	},
	filePicker: {
		invalidFileTypeError: 'Sie können keine Dateien dieses Typs auswählen.',
		maxFilesExceededError: 'Sie können keine weiteren Dateien auswählen.',
		fileTooBigError:
			'Die Datei ist zu groß ({{filesize}}MiB). Maximale Dateigröße: {{maxFilesize}}MiB.',
		removeFileLabel: 'Datei entfernen',
		invalidFilesError:
			'Eine oder mehrere ausgewählte Dateien sind ungültig. Bitte laden Sie nur gültige Dateitypen innerhalb der Größenbeschränkung hoch.',
		uploadFilesLabel: 'Dateien hochladen',
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
		incrementButtonLabel: /* istanbul ignore next */ (step: number) =>
			step === 1 ? 'Wert erhöhen' : `Wert um ${step} erhöhen`,
		decrementButtonLabel: /* istanbul ignore next */ (step: number) =>
			step === 1 ? 'Wert verringern' : `Wert um ${step} verringern`,
		updatedValueAnnouncement: /* istanbul ignore next */ (value: string) =>
			`Aktualisierter Wert: ${value}`,
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
		deleteButtonLabel: 'Letzte Ziffer löschen',
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
		errorLabel: 'Fehler:',
	},
	tab: {
		dismissButtonLabel:
			'Drücken Sie die ENTF-Taste, um diese Registerkarte zu schließen',
	},
	searchableSelect: {
		clearButtonLabel: 'Auswahl löschen',
		noOptionsMessage: 'Keine Optionen',
		noMatchesMessage: 'Keine Optionen gefunden',
		selectAllLabel: 'Alles auswählen',
		deselectAllLabel: 'Auswahl aufheben',
		selectedAllMessage: 'Alle Optionen ausgewählt',
		deselectedAllMessage: 'Alle Optionen abgewählt',
		loadingOptionsMessage: 'Laden...',
		removeTagButtonLabel: /* istanbul ignore next */ (label: string) =>
			`${label} entfernen`,
		optionSelectedMessage: /* istanbul ignore next */ (name: string) =>
			`Option ${name} ausgewählt.`,
		optionDeselectedMessage: /* istanbul ignore next */ (name: string) =>
			`Option ${name} entfernt.`,
		optionFocusedMessage: /* istanbul ignore next */ (
			name: string,
			position: number,
			total: number,
			selected: boolean
		) =>
			`Option ${name} fokussiert, ${
				selected ? 'ausgewählt, ' : ''
			}${position} von ${total}.`,
		maxSelectedMessage: /* istanbul ignore next */ (
			total: number,
			limit: number
		) => `${total} von ${limit} ausgewählt.`,
	},
	richTextEditor: {
		textBlockType: 'Textblocktyp',
		textSize: 'Textgröße',
		bold: 'Fett',
		italics: 'Kursiv',
		underline: 'Unterstrichen',
		strikethrough: 'Durchgestrichen',
		monospace: 'Monospace',
		dragAndDropFilesHere: 'Dateien hierher ziehen & ablegen',
	},
	button: {
		pendingLabel: 'Laden...',
	},
	feedbackMessage: {
		errorIconText: 'Fehler:',
		successIconText: 'Erfolg:',
	},
	connotationAnnoncement: {
		accentIcon: 'Akzent:',
		alertIcon: 'Alarm:',
		informationIcon: 'Information:',
		successIcon: 'Erfolg:',
		warningIcon: 'Warnung:',
		announcementIcon: 'Bekanntmachung:',
		ctaIcon: 'Aufruf zum Handeln:',
	},
	charCount: {
		charactersLimitMessage: /* istanbul ignore next */ (limit: number) =>
			`Sie können bis zu ${limit} Zeichen eingeben`,
		charactersRemainingMessage: /* istanbul ignore next */ (total: number) =>
			`Du hast noch ${total} Zeichen übrig`,
	},
	dataGrid: {
		cell: {
			selected: 'Ausgewählt',
			button: '(Schaltfläche)',
		},
	},
	pagination: {
		previousPageLabel: 'Zur vorherigen Seite',
		nextPageLabel: 'Zur nächsten Seite',
		goToPageLabel: /* istanbul ignore next */ (index: number | string) =>
			`Weiter zu Seite ${index}`,
	},
	tag: {
		remove: /* istanbul ignore next */ (label: string) => `Entfernen ${label}`,
	},
	toggletip: {
		anchorLabel: /* istanbul ignore next */ (ariaLabel?: string) =>
			ariaLabel
				? `Weitere Informationen zu ${ariaLabel} anzeigen`
				: `Weitere Informationen anzeigen`,
	},
	baseColorPicker: {
		colorSwatchLabel: /* istanbul ignore next */ (
			value: string,
			label?: string,
			selected?: boolean
		) => {
			let swatchLabel = label
				? `${label} auswählen, Hex: ${value}`
				: `${value} auswählen`;
			if (selected) swatchLabel += `, ausgewählt.`;
			return swatchLabel;
		},
	},
	simpleColorPicker: {
		colorPaletteLabel: 'Farbpalette',
	},
	colorPicker: {
		popupLabel: 'Farbwähler',
		swatchesLabel: 'Gespeicherte Farben:',
		pickerButtonLabel: 'Farbwähler',
		hexInputLabel: 'HEX-Farbcode',
		saveButtonLabel: 'Aktuelle Farbe speichern',
		closeButtonLabel: 'Farbwähler schließen',
		copyButtonLabel: 'Farbe in die Zwischenablage kopieren',
		copyErrorText:
			'Kopieren fehlgeschlagen. Zugriff auf die Zwischenablage wurde blockiert. Versuchen Sie es erneut.',
	},
};

export default deDE;
