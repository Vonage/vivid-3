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
	it('should include a cell for dates within the month', () => {
		const grid = buildCalendarGrid({ month: 7, year: 2023 }, enUsLocale);
		expect(grid.grid[0][2].date).toBe('2023-08-01');
		expect(grid.grid[0][2].label).toBe('1');
		expect(grid.grid[0][2].isOutsideMonth).toBe(false);
	});

	it('should include a cell for dates in the week before the first of the month', () => {
		const grid = buildCalendarGrid({ month: 7, year: 2023 }, enUsLocale);
		expect(grid.grid[0][0].date).toBe('2023-07-30');
		expect(grid.grid[0][0].label).toBe('30');
		expect(grid.grid[0][0].isOutsideMonth).toBe(true);
	});

	it('should include a cell for dates in the week after the last of the month', () => {
		const grid = buildCalendarGrid({ month: 7, year: 2023 }, enUsLocale);
		expect(grid.grid[4][6].date).toBe('2023-09-02');
		expect(grid.grid[4][6].label).toBe('2');
		expect(grid.grid[4][6].isOutsideMonth).toBe(true);
	});

	describe('for August 2023 with en-US locale', () => {
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
			expect(grid.grid[0][0].label).toBe('30');
		});

		it('should have the first of August as Tuesday', () => {
			expect(grid.grid[0][2].label).toBe('1');
		});

		it('should have the last day of August as Thursday', () => {
			expect(grid.grid[4][4].label).toBe('31');
		});

		it('should have the last day as Saturday, 2nd of September', () => {
			expect(grid.grid[4][6].label).toBe('2');
		});
	});

	describe('for August 2023 with en-GB locale', () => {
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
			expect(grid.grid[0][0].label).toBe('31');
		});

		it('should have the first of August as Tuesday', () => {
			expect(grid.grid[0][1].label).toBe('1');
		});

		it('should have the last day of August as Thursday', () => {
			expect(grid.grid[4][3].label).toBe('31');
		});

		it('should have the last day as Sunday, 3rd of September', () => {
			expect(grid.grid[4][6].label).toBe('3');
		});
	});
});
