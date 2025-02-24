import { yearOfDate } from './year.ts';

describe('yearOfDate', () => {
	it('should return the year of the given date', () => {
		expect(yearOfDate('2023-07-01')).toEqual(2023);
	});
});
