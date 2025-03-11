import type { CalendarPickerLocale } from '../picker-field/mixins/calendar-picker.locale';
import {
	formatPresentationDateTime,
	parsePresentationDateTime,
} from './presentationDateTime';

const enUsLocale = {
	dateFormat: 'MM/dd/yyyy',
} as CalendarPickerLocale;

const enGbLocale = {
	dateFormat: 'dd/MM/yyyy',
} as CalendarPickerLocale;

const zhCnLocale = {
	dateFormat: 'yyyy年MM月dd日',
} as CalendarPickerLocale;

describe('formatPresentationDateTime', () => {
	it('should format the date in the date format of the given locale', () => {
		expect(
			formatPresentationDateTime(
				'2023-08-01T12:34:56',
				enUsLocale,
				false,
				false
			)
		).toBe('08/01/2023 12:34');
		expect(
			formatPresentationDateTime(
				'2023-08-01T12:34:56',
				enGbLocale,
				false,
				false
			)
		).toBe('01/08/2023 12:34');
		expect(
			formatPresentationDateTime(
				'2023-08-01T12:34:56',
				zhCnLocale,
				false,
				false
			)
		).toBe('2023年08月01日 12:34');
	});

	it('should include seconds when includeSeconds is true', () => {
		expect(
			formatPresentationDateTime('2023-08-01T12:34:56', enUsLocale, true, false)
		).toBe('08/01/2023 12:34:56');
	});

	it('should format with a 12 hour clock when use12HourClock is true', () => {
		expect(
			formatPresentationDateTime('2023-08-01T12:34:56', enUsLocale, false, true)
		).toBe('08/01/2023 12:34 PM');
	});
});

describe('parsePresentationDateTime', () => {
	it('should parse the date time in the given locale', () => {
		expect(
			parsePresentationDateTime('08/01/2023 12:34:56', enUsLocale, false)
		).toBe('2023-08-01T12:34:56');
		expect(
			parsePresentationDateTime('01/08/2023 12:34:56', enGbLocale, false)
		).toBe('2023-08-01T12:34:56');
		expect(
			parsePresentationDateTime('2023年08月01日 12:34:56', zhCnLocale, false)
		).toBe('2023-08-01T12:34:56');
	});

	it('should parse time as a 12 hour clock when use12HourClock is true', () => {
		expect(
			parsePresentationDateTime('08/01/2023 12:34:56', enUsLocale, true)
		).toBe('2023-08-01T00:34:56');
		expect(
			parsePresentationDateTime('08/01/2023 12:34:56 PM', enUsLocale, true)
		).toBe('2023-08-01T12:34:56');
	});
});
