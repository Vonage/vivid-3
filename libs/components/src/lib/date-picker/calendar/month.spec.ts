import {
	addMonths,
	areMonthsEqual,
	getCurrentMonth,
	monthOfDate,
	monthToStr,
} from './month';

describe('getCurrentMonth', () => {
	beforeAll(() => {
		const mockedDate = new Date(2023, 7, 4);

		jest.useFakeTimers();
		jest.setSystemTime(mockedDate);
	});

	afterAll(() => {
		jest.useRealTimers();
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
		).toEqual('2023-8');
	});
});
