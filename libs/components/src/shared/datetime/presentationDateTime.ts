import type { CalendarPickerLocale } from '../picker-field/mixins/calendar-picker.locale';
import {
	formatPresentationTime,
	parsePresentationTime,
} from './presentationTime';
import {
	formatPresentationDate,
	parsePresentationDate,
} from './presentationDate';
import type { DateTimeStr } from './dateTimeStr';

export const formatPresentationDateTime = (
	dateTimeStr: DateTimeStr,
	locale: CalendarPickerLocale,
	includeSeconds: boolean,
	use12HourClock: boolean
): string => {
	const [dateStr, timeStr] = dateTimeStr.split('T');
	return `${formatPresentationDate(dateStr, locale)} ${formatPresentationTime(
		timeStr,
		includeSeconds,
		use12HourClock
	)}`;
};

/**
 * Attempts to parse user input as date time.
 * Throws if input can't be parsed.
 */
export const parsePresentationDateTime = (
	presentationDateTime: string,
	locale: CalendarPickerLocale,
	use12HourClock: boolean
): DateTimeStr => {
	const [datePart, ...timeParts] = presentationDateTime.split(' ');
	const dateStr = parsePresentationDate(datePart, locale);
	const timeStr = parsePresentationTime(timeParts.join(' '), use12HourClock);
	return `${dateStr}T${timeStr}`;
};
