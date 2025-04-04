import type { CalendarPickerLocale } from '../calendar-picker.locale';
import { buildCalendarGrid } from './calendarGrid';

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
} as CalendarPickerLocale;

const enGbLocale = { ...enUsLocale, firstDayOfWeek: 1 };

describe('buildCalendarGrid', () => {
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

	describe('for the example month August 2023 with en-US locale', () => {
		const grid = buildCalendarGrid({ month: 7, year: 2023 }, enUsLocale);

		it('should start the week on Sunday', () => {
			expect(grid.weekdays[0].name).toBe('Sunday');
			expect(grid.weekdays[0].shortName).toBe('Sun');
		});

		it('should end the week on Saturday', () => {
			expect(grid.weekdays[6].name).toBe('Saturday');
			expect(grid.weekdays[6].shortName).toBe('Sat');
		});

		it('should have 5 weeks', () => {
			expect(grid.grid.length).toBe(5);
		});

		it('should have the first day as Sunday, 30th of July', () => {
			const firstDay = grid.grid[0][0];
			expect(firstDay.label).toBe('30');
		});

		it('should have the first of August as Tuesday', () => {
			const firstTuesday = grid.grid[0][2];
			expect(firstTuesday.label).toBe('1');
		});

		it('should have the last day of August as Thursday', () => {
			const lastThursday = grid.grid[4][4];
			expect(lastThursday.label).toBe('31');
		});

		it('should have the last day as Saturday, 2nd of September', () => {
			const lastDay = grid.grid[4][6];
			expect(lastDay.label).toBe('2');
		});
	});

	describe('for the example month August 2023 with en-GB locale', () => {
		const grid = buildCalendarGrid({ month: 7, year: 2023 }, enGbLocale);

		it('should start the week on Monday', () => {
			expect(grid.weekdays[0].name).toBe('Monday');
			expect(grid.weekdays[0].shortName).toBe('Mon');
		});

		it('should end the week on Sunday', () => {
			expect(grid.weekdays[6].name).toBe('Sunday');
			expect(grid.weekdays[6].shortName).toBe('Sun');
		});

		it('should have 5 weeks', () => {
			expect(grid.grid.length).toBe(5);
		});

		it('should have the first day as Monday, 31st of July', () => {
			const firstDay = grid.grid[0][0];
			expect(firstDay.label).toBe('31');
		});

		it('should have the first of August as Tuesday', () => {
			const firstTuesday = grid.grid[0][1];
			expect(firstTuesday.label).toBe('1');
		});

		it('should have the last day of August as Thursday', () => {
			const lastThursday = grid.grid[4][3];
			expect(lastThursday.label).toBe('31');
		});

		it('should have the last day as Sunday, 3rd of September', () => {
			const lastDay = grid.grid[4][6];
			expect(lastDay.label).toBe('3');
		});
	});
});
