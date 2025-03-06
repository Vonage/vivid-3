import {
	formatTimePart,
	hoursAs12hClock,
	isValidTimeStr,
	parseTimeStr,
} from './time.ts';

describe('isValidTimeStr', () => {
	it('should return true for a valid time string', () => {
		expect(isValidTimeStr('12:34:56')).toBe(true);
	});

	it('should return false if the string does not have 3 parts', () => {
		expect(isValidTimeStr('12:34')).toBe(false);
		expect(isValidTimeStr('12:34:56:56')).toBe(false);
	});

	it('should return false if the parts do not have 2 digits', () => {
		expect(isValidTimeStr('1:34:56')).toBe(false);
		expect(isValidTimeStr('111:34:56')).toBe(false);
	});

	it('should return false if the parts are not numbers', () => {
		expect(isValidTimeStr('aa:3a:56')).toBe(false);
		expect(isValidTimeStr('12:aa:56')).toBe(false);
		expect(isValidTimeStr('12:34:aa')).toBe(false);
	});

	it('should return false if the parts are out of range', () => {
		expect(isValidTimeStr('24:00:00')).toBe(false);
		expect(isValidTimeStr('-1:00:00')).toBe(false);
		expect(isValidTimeStr('00:60:00')).toBe(false);
		expect(isValidTimeStr('00:-1:00')).toBe(false);
		expect(isValidTimeStr('00:00:60')).toBe(false);
		expect(isValidTimeStr('00:00:-1')).toBe(false);
	});
});

describe('formatTimePart', () => {
	it('should pad numbers with a zero', () => {
		expect(formatTimePart(0)).toBe('00');
		expect(formatTimePart(1)).toBe('01');
		expect(formatTimePart(10)).toBe('10');
	});
});

describe('parseTimeStr', () => {
	it('should parse a valid time string', () => {
		expect(parseTimeStr('12:34:56')).toEqual({
			hourStr: '12',
			hours: 12,
			minuteStr: '34',
			minutes: 34,
			secondStr: '56',
			seconds: 56,
			meridiem: 'PM',
		});
	});
});

describe('hoursAs12hClock', () => {
	it('should return 12 AM for hour 0', () => {
		expect(hoursAs12hClock(0)).toBe(12);
	});
	it('should return 1 AM for hour 1', () => {
		expect(hoursAs12hClock(1)).toBe(1);
	});
	it('should return 12 PM for hour 12', () => {
		expect(hoursAs12hClock(12)).toBe(12);
	});
	it('should return 1 PM for hour 13', () => {
		expect(hoursAs12hClock(13)).toBe(1);
	});
});
