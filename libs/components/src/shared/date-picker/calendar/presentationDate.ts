import { format, parse } from 'date-fns';
import type { DatePickerLocale } from '../locale';
import { type DateStr, formatDateStr, parseDateStr } from './dateStr';

/// Format to presentation date, which is the locale specific format (e.g. DD/MM/YYYY for en-GB)
export const formatPresentationDate = (
	dateStr: DateStr,
	locale: DatePickerLocale
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
	locale: DatePickerLocale
): DateStr => {
	const date = parse(presentationDate, locale.dateFormat, new Date());
	return formatDateStr(date);
};
