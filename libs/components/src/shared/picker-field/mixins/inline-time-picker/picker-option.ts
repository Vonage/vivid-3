import {
	formatTimePart,
	hoursAs12hClock,
	parseTimeStr,
	type TimeStr,
} from '../../../datetime/time';

export interface PickerOption {
	value: string; // e.g. '13'
	label: string; // e.g. '01' if 12h clock, '13' if 24h clock
}

const fallsIntoMeridiem = (meridiem: string, hour: number) =>
	(meridiem === 'AM' && hour < 12) || (meridiem === 'PM' && hour >= 12);

export const getHoursOptions = (
	min?: TimeStr,
	max?: TimeStr,
	forMeridiem?: string
): PickerOption[] => {
	const result = [];
	const minHour = min ? parseTimeStr(min).hours : 0;
	const maxHour = max ? parseTimeStr(max).hours : 23;
	for (let i = minHour; i <= maxHour; i++) {
		if (forMeridiem && !fallsIntoMeridiem(forMeridiem, i)) {
			continue;
		}

		result.push({
			value: formatTimePart(i),
			label: formatTimePart(forMeridiem ? hoursAs12hClock(i) : i),
		});
	}

	return result;
};

export const getMinutesOptions = (
	step: number | null,
	value?: TimeStr,
	min?: TimeStr,
	max?: TimeStr
): PickerOption[] => {
	const result = [];
	let minMinute = 0;
	let maxMinute = 59;
	if (min) {
		const { hourStr: minHourStr, minutes: minMinutes } = parseTimeStr(min);
		if (value && parseTimeStr(value).hourStr === minHourStr) {
			minMinute = minMinutes;
		}
	}
	if (max) {
		const { hourStr: maxHourStr, minutes: maxMinutes } = parseTimeStr(max);
		if (value && parseTimeStr(value).hourStr === maxHourStr) {
			maxMinute = maxMinutes;
		}
	}
	for (let i = minMinute; i <= maxMinute; i += Math.max(1, step ?? 1)) {
		const minutes = formatTimePart(i);
		result.push({
			value: minutes,
			label: minutes,
		});
	}
	return result;
};

export const getSecondsOptions = (
	step: number,
	value?: TimeStr,
	min?: TimeStr,
	max?: TimeStr
): PickerOption[] => {
	const result = [];
	let minSecond = 0;
	let maxSecond = 59;
	if (min) {
		const minTime = parseTimeStr(min);
		if (
			value &&
			(parseTimeStr(value).hourStr === minTime.hourStr &&
				parseTimeStr(value).minuteStr) === minTime.minuteStr
		) {
			minSecond = minTime.seconds;
		}
	}
	if (max) {
		const maxTime = parseTimeStr(max);
		if (
			value &&
			(parseTimeStr(value).hourStr === maxTime.hourStr &&
				parseTimeStr(value).minuteStr) === maxTime.minuteStr
		) {
			maxSecond = maxTime.seconds;
		}
	}
	for (let i = minSecond; i <= maxSecond; i += Math.max(1, step)) {
		const seconds = formatTimePart(i);
		result.push({
			value: seconds,
			label: seconds,
		});
	}
	return result;
};

export const getMeridiesOptions = (
	min?: TimeStr,
	max?: TimeStr
): PickerOption[] => {
	const result = [];
	const hideAM = min ? parseTimeStr(min).meridiem === 'PM' : false;
	if (!hideAM) {
		result.push({
			value: 'AM',
			label: 'AM',
		});
	}
	const hidePM = max ? parseTimeStr(max).meridiem === 'AM' : false;
	if (!hidePM) {
		result.push({
			value: 'PM',
			label: 'PM',
		});
	}
	return result;
};
