import type { DatePickerLocale } from '../locale.ts';
import { buildCalendarGrid } from './calendarGrid.ts';

const enUsLocale = {
	weekdays: {
		name: [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday',
		],
		shorthand: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
	},
	firstDayOfWeek: 0,
} as DatePickerLocale;

const enGbLocale = { ...enUsLocale, firstDayOfWeek: 1 };

describe('buildCalendarGrid', () => {
	it('should return weekdays with sunday first for US locale', function () {
		const expectedOutput = [
			{
				'name': 'Sunday',
				'shortName': 'Sun',
			},
			{
				'name': 'Monday',
				'shortName': 'Mon',
			},
			{
				'name': 'Tuesday',
				'shortName': 'Tue',
			},
			{
				'name': 'Wednesday',
				'shortName': 'Wed',
			},
			{
				'name': 'Thursday',
				'shortName': 'Thu',
			},
			{
				'name': 'Friday',
				'shortName': 'Fri',
			},
			{
				'name': 'Saturday',
				'shortName': 'Sat',
			},
		];
		const grid = buildCalendarGrid({ month: 7, year: 2023 }, enUsLocale);
		expect(grid.weekdays).toEqual(expectedOutput);
	});

	it('should return weekdays with monday first for GB locale', function () {
		const expectedOutput = [
			{
				'name': 'Monday',
				'shortName': 'Mon',
			},
			{
				'name': 'Tuesday',
				'shortName': 'Tue',
			},
			{
				'name': 'Wednesday',
				'shortName': 'Wed',
			},
			{
				'name': 'Thursday',
				'shortName': 'Thu',
			},
			{
				'name': 'Friday',
				'shortName': 'Fri',
			},
			{
				'name': 'Saturday',
				'shortName': 'Sat',
			},
			{
				'name': 'Sunday',
				'shortName': 'Sun',
			},
		];
		const grid = buildCalendarGrid({ month: 7, year: 2023 }, enGbLocale);
		expect(grid.weekdays).toEqual(expectedOutput);
	});

	it('should return the first week of the month', function () {
		const monthWithFirstDayOnSunday = { year: 2023, month: 9};
		const grid = buildCalendarGrid(monthWithFirstDayOnSunday, enUsLocale);
		const isFirstWeekInMonth = grid.grid[0]
			.every((day, index) => !day.isOutsideMonth && day.label === (index + 1).toString());
		expect(isFirstWeekInMonth).toBe(true);
	});

	it('should return the first week of the month starting on tuesday with two days from the previous month', function () {
		const expectedOutput = [
			{ label: '30', isOutsideMonth: true, date: '2023-07-30' },
			{ label: '31', isOutsideMonth: true, date: '2023-07-31' },
			{ label: '1', isOutsideMonth: false, date: '2023-08-01' },
			{ label: '2', isOutsideMonth: false, date: '2023-08-02' },
			{ label: '3', isOutsideMonth: false, date: '2023-08-03' },
			{ label: '4', isOutsideMonth: false, date: '2023-08-04' },
			{ label: '5', isOutsideMonth: false, date: '2023-08-05' },
		];
		const monthWithFirstDayOnTuesday = { year: 2023, month: 7};
		const grid = buildCalendarGrid(monthWithFirstDayOnTuesday, enUsLocale);
		expect(grid.grid[0]).toEqual(expectedOutput);
	});

	it('should return the last week of the month sunday to saturday', function () {
		const monthWithLastDayOnSaturday = { year: 2023, month: 8};
		const grid = buildCalendarGrid(monthWithLastDayOnSaturday, enUsLocale);
		const isLastWeekInMonth = grid.grid[4]
			.every((day, index) => !day.isOutsideMonth && day.label === (index + 30 - 6).toString());
		expect(isLastWeekInMonth).toBe(true);
	});

	it('should return the last week of the month padded with next month first days', function () {
		const expectedOutput = [
			{ label: '29', isOutsideMonth: false, date: '2023-10-29' },
			{ label: '30', isOutsideMonth: false, date: '2023-10-30' },
			{ label: '31', isOutsideMonth: false, date: '2023-10-31' },
			{ label: '1', isOutsideMonth: true, date: '2023-11-01' },
			{ label: '2', isOutsideMonth: true, date: '2023-11-02' },
			{ label: '3', isOutsideMonth: true, date: '2023-11-03' },
			{ label: '4', isOutsideMonth: true, date: '2023-11-04' },
		];
		const monthWithLastDayOnSaturday = { year: 2023, month: 9};
		const grid = buildCalendarGrid(monthWithLastDayOnSaturday, enUsLocale);
		expect(grid.grid[4]).toEqual(expectedOutput);
	});

	it('should include a cell for dates within the month', () => {
		const grid = buildCalendarGrid({ month: 7, year: 2023 }, enUsLocale);
		const thirdDayOfFirstWeek = grid.grid[0][2];
		expect(thirdDayOfFirstWeek.date).toBe('2023-08-01');
		expect(thirdDayOfFirstWeek.label).toBe('1');
		expect(thirdDayOfFirstWeek.isOutsideMonth).toBe(false);
	});

	it('should include a cell for dates in the week before the first of the month', () => {
		const grid = buildCalendarGrid({ month: 7, year: 2023 }, enUsLocale);
		const firstDayOfFirstWeek = grid.grid[0][0];
		expect(firstDayOfFirstWeek.date).toBe('2023-07-30');
		expect(firstDayOfFirstWeek.label).toBe('30');
		expect(firstDayOfFirstWeek.isOutsideMonth).toBe(true);
	});

	it('should include a cell for dates in the week after the last of the month', () => {
		const grid = buildCalendarGrid({ month: 7, year: 2023 }, enUsLocale);
		const lastDayOfLastWeek = grid.grid[4][6];
		expect(lastDayOfLastWeek.date).toBe('2023-09-02');
		expect(lastDayOfLastWeek.label).toBe('2');
		expect(lastDayOfLastWeek.isOutsideMonth).toBe(true);
	});

	it('should return grid for US locale', function () {
		const grid = buildCalendarGrid({ month: 7, year: 2022 }, enUsLocale);
		expect(grid.grid).toMatchSnapshot();
	});

	it('should return grid for GB locale', function () {
		const grid = buildCalendarGrid({ month: 7, year: 2024 }, enGbLocale);
		expect(grid.grid).toMatchSnapshot();
	});
});
