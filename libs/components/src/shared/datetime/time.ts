/**
 * Time string in 24-hour format: hh:mm:ss
 */
export type TimeStr = string;

export const isValidTimeStr = (timeStr: TimeStr): boolean => {
	const parts = timeStr.split(':');
	if (parts.length !== 3) {
		return false;
	}
	const [hours, minutes, seconds] = parts;
	if (hours.length !== 2 || minutes.length !== 2 || seconds.length !== 2) {
		return false;
	}
	const hoursNum = parseInt(hours, 10);
	const minutesNum = parseInt(minutes, 10);
	const secondsNum = parseInt(seconds, 10);
	if (isNaN(hoursNum) || isNaN(minutesNum) || isNaN(secondsNum)) {
		return false;
	}
	if (hoursNum < 0 || hoursNum > 23) {
		return false;
	}
	if (minutesNum < 0 || minutesNum > 59) {
		return false;
	}
	if (secondsNum < 0 || secondsNum > 59) {
		return false;
	}
	return true;
};

interface ParsedTimeStr {
	hourStr: string;
	hours: number;
	minuteStr: string;
	minutes: number;
	secondStr: string;
	seconds: number;
	meridiem: 'AM' | 'PM';
}

const parseTimePart = (partStr: string): number => Number.parseInt(partStr, 10);

export const formatTimePart = (part: number): string =>
	part.toString().padStart(2, '0');

export const parseTimeStr = (timeStr: TimeStr): ParsedTimeStr => {
	const [hoursStr, minutesStr, secondsStr] = timeStr.split(':');
	const hours = parseTimePart(hoursStr);
	const minutes = parseTimePart(minutesStr);
	const seconds = parseTimePart(secondsStr);
	return {
		hourStr: hoursStr,
		hours,
		minuteStr: minutesStr,
		minutes,
		secondStr: secondsStr,
		seconds,
		meridiem: hours < 12 ? 'AM' : 'PM',
	};
};

export const compareTimeStr = (a: TimeStr, b: TimeStr): number =>
	a > b ? 1 : a < b ? -1 : 0;

export const hoursAs12hClock = (hour: number) => hour % 12 || 12;
