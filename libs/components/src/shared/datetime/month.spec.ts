import {
	addMonths,
	areMonthsEqual,
	compareMonths,
	getCurrentMonth,
	monthOfDate,
	monthToStr,
} from './month';

describe('getCurrentMonth', () => {
	beforeAll(() => {
		const mockedDate = new Date(2023, 7, 4);

		vi.useFakeTimers();
		vi.setSystemTime(mockedDate);
	});

	afterAll(() => {
		vi.useRealTimers();
	});

	it('should return the current month', () => {
		expect(getCurrentMonth()).toEqual({
			month: 7,
			year: 2023,
		});
	});
});

describe('monthOfDate', () => {
	it('should return the month for a given date', () => {
		expect(monthOfDate('2020-02-20')).toEqual({
			month: 1,
			year: 2020,
		});
	});
});

describe('addMonths', () => {
	it('should add a month', () => {
		expect(
			addMonths(
				{
					month: 7,
					year: 2023,
				},
				1
			)
		).toEqual({
			month: 8,
			year: 2023,
		});
	});

	it('should wrap around to the next year', () => {
		expect(
			addMonths(
				{
					month: 10,
					year: 2023,
				},
				2
			)
		).toEqual({
			month: 0,
			year: 2024,
		});
	});

	it('should subtract a month', () => {
		expect(
			addMonths(
				{
					month: 7,
					year: 2023,
				},
				-1
			)
		).toEqual({
			month: 6,
			year: 2023,
		});
	});

	it('should wrap around to the previous year when subtracting', () => {
		expect(
			addMonths(
				{
					month: 1,
					year: 2023,
				},
				-2
			)
		).toEqual({
			month: 11,
			year: 2022,
		});
	});
});

describe('compareMonths', () => {
	it('should return 0 if months are equal', () => {
		expect(
			compareMonths(
				{
					month: 7,
					year: 2023,
				},
				{
					month: 7,
					year: 2023,
				}
			)
		).toEqual(0);
	});

	it('should return 1 if first month is later', () => {
		expect(
			compareMonths(
				{
					month: 7,
					year: 2023,
				},
				{
					month: 6,
					year: 2023,
				}
			)
		).toEqual(1);
	});

	it('should return -1 if first month is earlier', () => {
		expect(
			compareMonths(
				{
					month: 6,
					year: 2023,
				},
				{
					month: 7,
					year: 2023,
				}
			)
		).toEqual(-1);
	});

	it('should return 1 if first month is later in the year', () => {
		expect(
			compareMonths(
				{
					month: 7,
					year: 2023,
				},
				{
					month: 7,
					year: 2022,
				}
			)
		).toEqual(1);
	});

	it('should return -1 if first month is earlier in the year', () => {
		expect(
			compareMonths(
				{
					month: 7,
					year: 2022,
				},
				{
					month: 7,
					year: 2023,
				}
			)
		).toEqual(-1);
	});
});

describe('areMonthsEqual', () => {
	it('should returns true if months are equal', () => {
		expect(
			areMonthsEqual(
				{
					month: 7,
					year: 2023,
				},
				{
					month: 7,
					year: 2023,
				}
			)
		).toEqual(true);
	});

	it('should returns false if months are not equal', () => {
		expect(
			areMonthsEqual(
				{
					month: 7,
					year: 2023,
				},
				{
					month: 8,
					year: 2023,
				}
			)
		).toEqual(false);
	});

	it('should returns false if years are not equal', () => {
		expect(
			areMonthsEqual(
				{
					month: 7,
					year: 2023,
				},
				{
					month: 7,
					year: 2024,
				}
			)
		).toEqual(false);
	});
});

describe('monthToStr', () => {
	it('should convert a month to a string', () => {
		expect(
			monthToStr({
				month: 7,
				year: 2023,
			})
		).toEqual('2023-08');
	});
});
