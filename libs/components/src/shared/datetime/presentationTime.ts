import type { TimeStr } from './time';
import { formatTimePart, hoursAs12hClock, parseTimeStr } from './time';

/**
 * Time as it is presented to the user.
 */
type PresentationTime = string;

export const formatPresentationTime = (
	timeStr: TimeStr,
	includeSeconds: boolean,
	use12HourClock: boolean
): PresentationTime => {
	const time = parseTimeStr(timeStr);

	const hoursStr = formatTimePart(
		use12HourClock ? hoursAs12hClock(time.hours) : time.hours
	);

	let result = `${hoursStr}:${time.minuteStr}`;
	if (includeSeconds) {
		result += `:${time.secondStr}`;
	}
	if (use12HourClock) {
		result += ` ${time.meridiem}`;
	}

	return result;
};

const isDigit = (char: string): boolean => char >= '0' && char <= '9';

export const parsePresentationTime = (
	input: string,
	use12HourClock: boolean
): TimeStr => {
	const cleanedInput = input.toLowerCase();

	const numerals: number[] = [];
	let meridiem: 'AM' | 'PM' | undefined;
	for (let i = 0; i < cleanedInput.length; i++) {
		const char = cleanedInput[i];
		if (char === 'a' && cleanedInput[i + 1] === 'm') {
			i++;
			meridiem = 'AM';
		}
		if (char === 'p' && cleanedInput[i + 1] === 'm') {
			i++;
			meridiem = 'PM';
		}

		if (isDigit(char)) {
			let numeral = char;
			while (isDigit(cleanedInput[i + 1])) {
				i++;
				numeral += cleanedInput[i];
			}
			numerals.push(Number.parseInt(numeral, 10));
		}
	}

	if (numerals.length === 0 || numerals.length > 3) {
		throw new Error('Invalid time format');
	}

	if (meridiem && (numerals[0] < 1 || numerals[0] > 12)) {
		throw new Error('Invalid time format');
	}

	if (meridiem || use12HourClock) {
		if (numerals[0] === 12) {
			numerals[0] = 0;
		}
	}

	if (meridiem === 'PM') {
		numerals[0] = numerals[0] + 12;
	}

	const [hours, minutes = 0, seconds = 0] = numerals;

	if (hours > 23 || minutes > 59 || seconds > 59) {
		throw new Error('Invalid value');
	}

	return [hours, minutes, seconds].map(formatTimePart).join(':');
};
