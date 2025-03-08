import { isValidTimeStr, type TimeStr } from './time';
import { type DateStr, isValidDateStr } from './dateStr';

/// Format: YYYY-MM-DDThh:mm:ss
export type DateTimeStr = string;

export const extractDatePart = (dateTimeStr: DateTimeStr | ''): DateStr | '' =>
	dateTimeStr.split('T')[0] || '';

export const extractTimePart = (dateTimeStr: DateTimeStr | ''): TimeStr | '' =>
	dateTimeStr.split('T')[1] || '';

export const isValidDateTimeStr = (string: string): boolean => {
	const [dateStr = '', timeStr = ''] = string.split('T');

	return isValidDateStr(dateStr) && isValidTimeStr(timeStr);
};
