import { type DateStr, parseDateStr } from './dateStr';

export const yearOfDate = (dateStr: DateStr): number => {
	const date = parseDateStr(dateStr);
	return date.getFullYear();
};
