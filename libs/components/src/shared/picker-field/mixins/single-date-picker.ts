import type { DateStr } from '../../datetime/dateStr';
import type { AbstractConstructor } from '../../utils/mixins';
import { type CalendarPickerElement } from './calendar-picker';
import { type SingleValuePickerElement } from './single-value-picker';

/**
 * Mixin for pickers that use a calendar to pick a single date.
 */
export const SingleDatePickerMixin = <
	T extends AbstractConstructor<
		CalendarPickerElement & SingleValuePickerElement
	>
>(
	Base: T
) => {
	abstract class SingleDatePicker extends Base {
		/**
		 * @internal
		 */
		abstract _dateValue(): DateStr | '';

		/**
		 * Returns current value with updated date.
		 * @internal
		 */
		abstract _withUpdatedDate(dateStr: DateStr): string;

		/**
		 * @internal
		 */
		override valueChanged(previous: string, next: string) {
			super.valueChanged(previous, next);
			if (this.value) {
				this._adjustSelectedMonthToEnsureVisibilityOf(this._dateValue());
			}
		}

		/**
		 * @internal
		 */
		override _onDateClick(date: DateStr) {
			this._updateValueDueToUserInteraction(this._withUpdatedDate(date));
		}

		/**
		 * @internal
		 */
		override _isDateSelected(date: DateStr) {
			return date === this._dateValue();
		}

		/**
		 * @internal
		 */
		override _isDateAriaSelected(date: DateStr) {
			return this._isDateSelected(date);
		}

		/**
		 * @internal
		 */
		override _getSelectedDates(): DateStr[] {
			const dates = [];
			if (this.value) {
				dates.push(this._dateValue());
			}
			return dates;
		}
	}

	return SingleDatePicker;
};
