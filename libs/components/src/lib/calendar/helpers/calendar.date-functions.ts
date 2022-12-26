/**
 *
 * Returns a valid date string from date object e.g. 2020-01-01
 *
 * 
 * This method returns valid date string to be used as html time tag datetime value
 * 
 * @param Date - js date object
 * @returns string - a date as a string value in ISO format.
 */
export function getValidDateString(date: Date): string {
	const twoDigit = (num: number) => `0${num}`.slice(-2);
	return `${date.getFullYear()}-${twoDigit(date.getMonth() + 1)}-${twoDigit(date.getDate())}`;
}

const weekdaysMap = new Map([
	['sunday', 0],
	['monday', 1],
]);

/**
 * @param Date - date
 * @param string - start day
 * @returns Date - new date
 */
export function getFirstDateOfTheWeek(date: Date = new Date(), startDay: 'sunday' | 'monday'): Date {
	date = new Date(date);

	let num = weekdaysMap.get(startDay);
	num ??= 1;
	const day = date.getDate() - ((date.getDay() + 7 - num) % 7);

	return new Date(date.setDate(day));
}
