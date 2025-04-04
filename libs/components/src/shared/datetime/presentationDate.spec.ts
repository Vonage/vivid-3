import type { CalendarPickerLocale } from '../picker-field/mixins/calendar-picker.locale';
import {
	formatPresentationDate,
	parsePresentationDate,
} from './presentationDate';

const enUsLocale = {
	dateFormat: 'MM/dd/yyyy',
} as CalendarPickerLocale;

const enGbLocale = {
	dateFormat: 'dd/MM/yyyy',
} as CalendarPickerLocale;

const zhCnLocale = {
	dateFormat: 'yyyy年MM月dd日',
} as CalendarPickerLocale;

describe('formatPresentationDate', () => {
	it('should format the date in the date format of the given locale', () => {
		expect(formatPresentationDate('2023-08-01', enUsLocale)).toBe('08/01/2023');
		expect(formatPresentationDate('2023-08-01', enGbLocale)).toBe('01/08/2023');
		expect(formatPresentationDate('2023-08-01', zhCnLocale)).toBe(
			'2023年08月01日'
		);
	});
});

describe('parsePresentationDate', () => {
	it('should parse the date in the date format of the given locale', () => {
		expect(parsePresentationDate('08/01/2023', enUsLocale)).toBe('2023-08-01');
		expect(parsePresentationDate('01/08/2023', enGbLocale)).toBe('2023-08-01');
		expect(parsePresentationDate('2023年08月01日', zhCnLocale)).toBe(
			'2023-08-01'
		);
	});

	it('should accept dates without leading zeros', () => {
		expect(parsePresentationDate('8/1/2023', enUsLocale)).toBe('2023-08-01');
		expect(parsePresentationDate('1/8/2023', enGbLocale)).toBe('2023-08-01');
		expect(parsePresentationDate('2023年8月1日', zhCnLocale)).toBe(
			'2023-08-01'
		);
	});

	it('should throw if the date is invalid', () => {
		expect(() => parsePresentationDate('x', enUsLocale)).toThrow();
		expect(() => parsePresentationDate('13/01/2023', enUsLocale)).toThrow();
		expect(() => parsePresentationDate('02/29/2023', enUsLocale)).toThrow();
	});
});
