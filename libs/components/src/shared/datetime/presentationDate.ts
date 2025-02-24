import { format, parse } from 'date-fns';
import type { CalendarPickerLocale } from '../picker-field/mixins/calendar-picker.locale';
import { type DateStr, formatDateStr, parseDateStr } from './dateStr';

/// Format to presentation date, which is the locale specific format (e.g. DD/MM/YYYY for en-GB)
export const formatPresentationDate = (
	dateStr: DateStr,
	locale: CalendarPickerLocale
): string => {
	const date = parseDateStr(dateStr);
	return format(date, locale.dateFormat);
};

/**
 * Parse a presentation date, which is the locale specific format (e.g. DD/MM/YYYY for en-GB).
 * Accepts partial dates, e.g. 1/1/2021 will be parsed as 01/01/2021.
 * Will throw if the date is can't be parsed
 */
export const parsePresentationDate = (
	presentationDate: string,
	locale: CalendarPickerLocale
): DateStr => {
	const date = parse(presentationDate, locale.dateFormat, new Date());
	return formatDateStr(date);
};
