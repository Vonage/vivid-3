import { attr, type ValueConverter } from '@microsoft/fast-element';
import { type DateStr, isValidDateStr } from '../../datetime/dateStr';
import type { AbstractConstructor } from '../../utils/mixins';
import type { CalendarPickerElement } from './calendar-picker';

/// Converter ensures that the value is always a valid time string or empty string
export const ValidDateFilter: ValueConverter = {
	fromView: (value: string) => {
		if (value && isValidDateStr(value)) {
			return value;
		}
		return '';
	},
	toView(value: string) {
		return value;
	},
};

/**
 * Mixin for calendar pickers where min/max is a date.
 */
export const MinMaxCalendarPicker = <
	T extends AbstractConstructor<CalendarPickerElement>
>(
	SuperClass: T
) => {
	abstract class MinMaxDatePickerElement extends SuperClass {
		/**
		 * The earliest accepted date.
		 *
		 * @public
		 * @remarks
		 * HTML Attribute: min
		 */
		@attr({ converter: ValidDateFilter })
		min: string;

		/**
		 * @internal
		 */
		minChanged(_: string, newMin: string) {
			if (this.proxy instanceof HTMLInputElement) {
				this.proxy.min = newMin;
				this.validate();
			}
		}

		/**
		 * @internal
		 */
		get _resolvedMinDate(): DateStr | '' {
			return this.min;
		}

		/**
		 * The latest accepted date.
		 *
		 * @public
		 * @remarks
		 * HTML Attribute: max
		 */
		@attr({ converter: ValidDateFilter })
		max: string;

		/**
		 * @internal
		 */
		maxChanged(_: string, newMax: string) {
			if (this.proxy instanceof HTMLInputElement) {
				this.proxy.max = newMax;
				this.validate();
			}
		}

		/**
		 * The latest accepted date.
		 * @internal
		 */
		get _resolvedMaxDate(): DateStr | '' {
			return this.max;
		}

		constructor(...args: any[]) {
			super(...args);
			this.min = '';
			this.max = '';
		}
	}

	return MinMaxDatePickerElement;
};
