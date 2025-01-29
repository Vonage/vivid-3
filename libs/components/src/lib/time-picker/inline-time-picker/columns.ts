import {
	getHoursOptions,
	getMeridiesOptions,
	getMinutesOptions,
	getSecondsOptions,
	type PickerOption,
} from '../time/picker';
import { formatTimePart, parseTimeStr } from '../time/time';
import type { InlineTimePicker } from './inline-time-picker';

export type Column = {
	id: string;
	getLabel: (x: InlineTimePicker) => string;
	getOptions: (x: InlineTimePicker) => PickerOption[];
	getSelectedOptionValue: (x: InlineTimePicker) => string | undefined;
	updatedValue: (x: InlineTimePicker, optionValue: string) => string;
};

export const HoursColumn: Column = {
	id: 'hours',
	getLabel: (x: InlineTimePicker) => x.locale.timePicker.hoursLabel,
	getOptions: (x: InlineTimePicker) =>
		getHoursOptions(
			x.min,
			x.max,
			x.clock === '12h'
				? MeridiesColumn.getSelectedOptionValue(x) ??
						MeridiesColumn.getOptions(x)[0].value
				: undefined
		),
	getSelectedOptionValue: (x: InlineTimePicker) =>
		x.value ? parseTimeStr(x.value).hourStr : undefined,
	updatedValue: (x: InlineTimePicker, optionValue: string) => {
		if (x.value) {
			const { minuteStr, secondStr } = parseTimeStr(x.value);
			return `${optionValue}:${minuteStr}:${secondStr}`;
		} else {
			return `${optionValue}:00:00`;
		}
	},
};

export const MinutesColumn: Column = {
	id: 'minutes',
	getLabel: (x: InlineTimePicker) => x.locale.timePicker.minutesLabel,
	getOptions: (x: InlineTimePicker) =>
		getMinutesOptions(x.minutesStep, x.value, x.min, x.max),
	getSelectedOptionValue: (x: InlineTimePicker) =>
		x.value ? parseTimeStr(x.value).minuteStr : undefined,
	updatedValue: (x: InlineTimePicker, optionValue: string) => {
		if (x.value) {
			const { hourStr, secondStr } = parseTimeStr(x.value);
			return `${hourStr}:${optionValue}:${secondStr}`;
		} else {
			return `00:${optionValue}:00`;
		}
	},
};

export const SecondsColumn: Column = {
	id: 'seconds',
	getLabel: (x: InlineTimePicker) => x.locale.timePicker.secondsLabel,
	getOptions: (x: InlineTimePicker) =>
		getSecondsOptions(x.secondsStep!, x.value, x.min, x.max),
	getSelectedOptionValue: (x: InlineTimePicker) =>
		x.value ? parseTimeStr(x.value).secondStr : undefined,
	updatedValue: (x: InlineTimePicker, optionValue: string) => {
		if (x.value) {
			const { hourStr, minuteStr } = parseTimeStr(x.value);
			return `${hourStr}:${minuteStr}:${optionValue}`;
		} else {
			return `00:00:${optionValue}`;
		}
	},
};

export const MeridiesColumn: Column = {
	id: 'meridies',
	getLabel: (x: InlineTimePicker) => x.locale.timePicker.meridiesLabel,
	getOptions: (x: InlineTimePicker) => getMeridiesOptions(x.min, x.max),
	getSelectedOptionValue: (x: InlineTimePicker) =>
		x.value ? parseTimeStr(x.value).meridiem : undefined,
	updatedValue: (x: InlineTimePicker, optionValue: string) => {
		if (x.value) {
			const { hours, minuteStr, secondStr } = parseTimeStr(x.value);
			let adjustedHours = hours;
			if (optionValue === 'AM' && hours >= 12) {
				adjustedHours -= 12;
			} else if (optionValue === 'PM' && hours < 12) {
				adjustedHours += 12;
			}
			return `${formatTimePart(adjustedHours)}:${minuteStr}:${secondStr}`;
		} else {
			if (optionValue === 'AM') {
				return '00:00:00';
			} else {
				return '12:00:00';
			}
		}
	},
};
