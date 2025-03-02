import { type DatePickerLocale } from '../locale.ts';
import {
	formatPresentationDateRange,
	formatRange,
	parsePresentationDateRange,
} from './presentationDateRange.ts';

const enUsLocale = {
	dateFormat: 'MM/dd/yyyy',
} as DatePickerLocale;

describe('formatRange', () => {
	it('should format a range', () => {
		expect(formatRange('from', 'to')).toBe('from – to');
	});
});

describe('presentationDateRange', () => {
	it('should format the range in the date format of the given locale', () => {
		expect(
			formatPresentationDateRange(
				{ start: '2023-08-01', end: '2023-08-02' },
				enUsLocale
			)
		).toBe('08/01/2023 – 08/02/2023');
	});
});

describe('parsePresentationDateRange', () => {
	it("should throw an error if the input string doesn't have a separator", () => {
		expect(() =>
			parsePresentationDateRange('08/01/202308/02/2023', enUsLocale)
		).toThrow();
	});

	it("should throw an error if one of the dates can't be parsed", () => {
		expect(() =>
			parsePresentationDateRange('x – 08/02/2023', enUsLocale)
		).toThrow();
		expect(() =>
			parsePresentationDateRange('08/01/2023 – x', enUsLocale)
		).toThrow();
	});

	it('should parse the range in the date format of the given locale', () => {
		expect(
			parsePresentationDateRange('08/01/2023 – 08/02/2023', enUsLocale)
		).toEqual({ start: '2023-08-01', end: '2023-08-02' });
	});

	it('should accept inputs formatted in a variety of ways', () => {
		const expected = { start: '2023-08-01', end: '2023-08-02' };
		expect(
			parsePresentationDateRange('08/01/2023–08/02/2023', enUsLocale)
		).toEqual(expected);
		expect(
			parsePresentationDateRange('08/01/2023-08/02/2023', enUsLocale)
		).toEqual(expected);
		expect(
			parsePresentationDateRange(' 08/01/2023  -  08/02/2023 ', enUsLocale)
		).toEqual(expected);
		expect(
			parsePresentationDateRange('08/01/2023 08/02/2023', enUsLocale)
		).toEqual(expected);
	});
});
