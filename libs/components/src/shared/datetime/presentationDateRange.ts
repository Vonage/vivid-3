import type { CalendarPickerLocale } from '../picker-field/mixins/calendar-picker.locale';
import type { DateRange } from './dateRange';
import {
	formatPresentationDate,
	parsePresentationDate,
} from './presentationDate';

export const formatRange = (from: string, to: string): string => {
	return `${from} – ${to}`;
};

export const formatPresentationDateRange = (
	dateRange: DateRange,
	locale: CalendarPickerLocale
): string => {
	return formatRange(
		formatPresentationDate(dateRange.start, locale),
		formatPresentationDate(dateRange.end, locale)
	);
};

/**
 * Parse a presentation date range, which combines two presentation dates with a dash.
 * Will throw if the range can't be parsed
 */
export const parsePresentationDateRange = (
	presentationDateRange: string,
	locale: CalendarPickerLocale
): DateRange => {
	const fragments = presentationDateRange.trim().split(/[\s—–-]+/);
	if (fragments.length !== 2) {
		throw new Error(`Invalid date range: ${presentationDateRange}`);
	}

	const [start, end] = fragments.map((fragment) =>
		parsePresentationDate(fragment, locale)
	);
	return { start, end };
};
