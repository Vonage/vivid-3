/**
 * @param d
 */
export function assertIsString(d: unknown): asserts d is string {
	if (!(typeof d == 'string')) throw new Error(`Not a string: ${d}`);
}

/**
 * @param d
 */
export function assertIsValidDateStringRepresentation(d: unknown): asserts d is Date {
	assertIsString(d);
	if (Number.isNaN(Date.parse(d))) throw new Error(`Not a valid date string representation: ${d}`);
}

/**
 * Returns a valid date string from date object e.g. 2020-01-01
 *
 * @remarks
 * This method returns valid date string to be used as html time tag datetime value
 * @param date - js date object
 * @returns a date as a string value in ISO format.
 */
export function getValidDateString(date: Date): string {
	const twoDigit = (num: number) => `0${num}`.slice(-2);
	return `${date.getFullYear()}-${twoDigit(date.getMonth() + 1)}-${twoDigit(date.getDate())}`;
}

/**
 * @param date
 */
export function getFirstDateOfTheWeek(date: Date = new Date()): Date {
	if (typeof date === 'string') {
		date = new Date(date);
	}
	return new Date(date.setDate(date.getDate() - date.getDay()));
}
