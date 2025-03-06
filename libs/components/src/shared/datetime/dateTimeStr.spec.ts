import {
	extractDatePart,
	extractTimePart,
	isValidDateTimeStr,
} from './dateTimeStr';

describe('extractDatePart', () => {
	it('should return the date part of a date time string', () => {
		expect(extractDatePart('2021-01-21T12:34:56')).toBe('2021-01-21');
	});

	it('should return empty string when input is empty string', () => {
		expect(extractDatePart('')).toBe('');
	});
});

describe('extractTimePart', () => {
	it('should return the time part of a date time string', () => {
		expect(extractTimePart('2021-01-21T12:34:56')).toBe('12:34:56');
	});

	it('should return empty string when input is empty string', () => {
		expect(extractTimePart('')).toBe('');
	});
});

describe('isValidDateTimeStr', () => {
	it('should return true for a valid date time string', () => {
		expect(isValidDateTimeStr('2021-01-21T12:34:56')).toBe(true);
	});

	it('should return false for strings not containing T', () => {
		expect(isValidDateTimeStr('2021-01-2112:34:56')).toBe(false);
		expect(isValidDateTimeStr('')).toBe(false);
		expect(isValidDateTimeStr('x')).toBe(false);
	});

	it('should return false when the date part is invalid', () => {
		expect(isValidDateTimeStr('T12:34:56')).toBe(false);
		expect(isValidDateTimeStr('xT12:34:56')).toBe(false);
	});

	it('should return false when the time part is invalid', () => {
		expect(isValidDateTimeStr('2021-01-21T')).toBe(false);
		expect(isValidDateTimeStr('2021-01-21Tx')).toBe(false);
	});
});
