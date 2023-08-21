import {
	addDays,
	currentDateStr,
	formatDateStr,
	isValidDateStr,
	parseDateStr,
} from './dateStr.ts';

describe('formatDateStr', () => {
	it('should format a date string', () => {
		expect(formatDateStr(new Date(2021, 0, 21))).toEqual('2021-01-21');
	});
});

describe('currentDateStr', () => {
	beforeAll(() => {
		const mockedDate = new Date(2021, 0, 21);

		jest.useFakeTimers();
		jest.setSystemTime(mockedDate);
	});

	afterAll(() => {
		jest.useRealTimers();
	});

	it('should return the current date', () => {
		expect(currentDateStr()).toEqual('2021-01-21');
	});
});

describe('parseDateStr', () => {
	it('should parse a date string', () => {
		const date = parseDateStr('2021-01-21');
		expect(date).toBeInstanceOf(Date);
		expect(date.getFullYear()).toEqual(2021);
		expect(date.getMonth()).toEqual(0);
		expect(date.getDate()).toEqual(21);
	});
});

describe('addDays', () => {
	it('should add days', () => {
		expect(addDays('2021-01-21', 1)).toEqual('2021-01-22');
	});

	it('should wrap around to the next month', () => {
		expect(addDays('2021-01-31', 1)).toEqual('2021-02-01');
	});

	it('should wrap around to the next year', () => {
		expect(addDays('2021-12-31', 1)).toEqual('2022-01-01');
	});

	it('should subtract days', () => {
		expect(addDays('2021-01-21', -1)).toEqual('2021-01-20');
	});

	it('should wrap around to the previous month', () => {
		expect(addDays('2021-03-01', -1)).toEqual('2021-02-28');
	});

	it('should wrap around to the previous year', () => {
		expect(addDays('2022-01-01', -1)).toEqual('2021-12-31');
	});
});

describe('isValidDateStr', () => {
	it('should return true for a valid date string', () => {
		expect(isValidDateStr('2021-01-21')).toEqual(true);
	});

	it('should return false for an non-conforming dates', () => {
		expect(isValidDateStr('')).toEqual(false);
		expect(isValidDateStr('x')).toEqual(false);
		expect(isValidDateStr('2012-01')).toEqual(false);
		expect(isValidDateStr('x-01-01')).toEqual(false);
	});

	it('should return false for an invalid dates', () => {
		expect(isValidDateStr('2021-01-32')).toEqual(false);
		expect(isValidDateStr('2021-13-01')).toEqual(false);
		expect(isValidDateStr('2021-12-32')).toEqual(false);
		expect(isValidDateStr('2021-02-29')).toEqual(false);
	});
});
