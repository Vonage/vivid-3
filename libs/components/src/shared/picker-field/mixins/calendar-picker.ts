import { observable, Updates, volatile } from '@microsoft/fast-element';
import { PickerField } from '../picker-field';
import {
	addDays,
	compareDateStr,
	currentDateStr,
	type DateStr,
} from '../../datetime/dateStr';
import {
	addMonths,
	compareMonths,
	getCurrentMonth,
	type Month,
	monthOfDate,
	monthToStr,
} from '../../datetime/month';
import { yearOfDate } from '../../datetime/year';
import type { AbstractConstructor, MixinType } from '../../utils/mixins';
import type {
	CalendarSegment,
	MonthPickerSegment,
	Segment,
} from './calendar-segments/segment';
import {
	buildMonthPickerGrid,
	MonthsPerRow,
} from './calendar-segments/monthPickerGrid';
import { buildCalendarGrid } from './calendar-segments/calendarGrid';

/**
 * Mixin for pickers that show a calendar. Subclasses need to override the
 * abstract methods to control the calendar.
 */
export const CalendarPicker = <T extends AbstractConstructor<PickerField>>(
	Base: T
) => {
	abstract class CalendarPickerElement extends Base {
		// --- Common state and getters ---

		/**
		 * The month the calendar is currently showing.
		 * @internal
		 */
		@observable _selectedMonth = getCurrentMonth();

		/**
		 * @internal
		 */
		_adjustSelectedMonthToEnsureVisibilityOf(date: DateStr) {
			const month = monthOfDate(date);
			const firstDisplayedMonth = this._selectedMonth;
			const lastDisplayedMonth = addMonths(
				this._selectedMonth,
				this._numCalendars - 1
			);
			if (compareMonths(month, firstDisplayedMonth) < 0) {
				this._selectedMonth = month;
				return true;
			} else if (compareMonths(month, lastDisplayedMonth) > 0) {
				this._selectedMonth = addMonths(month, 1 - this._numCalendars);
				return true;
			}
			return false;
		}

		/**
		 * Today's date.
		 * @internal
		 */
		_currentDate = currentDateStr();

		/**
		 * Today's month.
		 * @internal
		 */
		_currentMonth = getCurrentMonth();

		/**
		 * The earliest date that can be selected.
		 * @internal
		 */
		abstract get _resolvedMinDate(): DateStr | '';

		/**
		 * The latest date that can be selected.
		 * @internal
		 */
		abstract get _resolvedMaxDate(): DateStr | '';

		/**
		 * @internal
		 */
		_isDateInValidRange(date: DateStr) {
			return (
				(!this._resolvedMinDate ||
					compareDateStr(date, this._resolvedMinDate) >= 0) &&
				(!this._resolvedMaxDate ||
					compareDateStr(date, this._resolvedMaxDate) <= 0)
			);
		}

		#isMonthAfterValidRange(month: Month) {
			return (
				this._resolvedMaxDate &&
				compareMonths(month, monthOfDate(this._resolvedMaxDate)) > 0
			);
		}

		#isMonthBeforeValidRange(month: Month) {
			return (
				this._resolvedMinDate &&
				compareMonths(month, monthOfDate(this._resolvedMinDate)) < 0
			);
		}

		/**
		 * @internal
		 */
		_isMonthInValidRange(month: Month) {
			return !(
				this.#isMonthBeforeValidRange(month) ||
				this.#isMonthAfterValidRange(month)
			);
		}

		// --- Core ---

		constructor(...args: any[]) {
			super(...args);
			this.value = '';
		}

		/**
		 * @internal
		 */
		override _closePopup(restoreFocusToTextField = true) {
			super._closePopup(restoreFocusToTextField);
			this._monthPickerYear = null;
		}

		/**
		 * @internal
		 */
		override _onPickerButtonClick() {
			super._onPickerButtonClick();

			if (this._popupOpen) {
				Updates.process();

				const tabbableDate = this._tabbableDate;
				if (tabbableDate)
					(
						this.shadowRoot!.querySelector(
							`[data-date="${tabbableDate}"]`
						) as HTMLButtonElement
					).focus();
			}
		}

		// --- Calendar header ---

		/**
		 * @internal
		 */
		_onTitleActionClick() {
			if (this._inMonthPicker) {
				this._monthPickerYear = null;
			} else {
				this._monthPickerYear = this._selectedMonth.year;
			}
		}

		/**
		 * @internal
		 */
		@volatile
		get _isPrevYearDisabled() {
			const currentYear = this._inMonthPicker
				? this._monthPickerYear!
				: this._selectedMonth.year;
			const prevYear = currentYear - 1;

			return (
				this._resolvedMinDate && prevYear < yearOfDate(this._resolvedMinDate)
			);
		}

		/**
		 * @internal
		 */
		_onPrevYearClick() {
			if (this._inMonthPicker) {
				this._monthPickerYear = this._monthPickerYear! - 1;
			} else {
				this._selectedMonth = {
					year: this._selectedMonth.year - 1,
					month: this._selectedMonth.month,
				};
			}
		}

		/**
		 * @internal
		 */
		@volatile
		get _isNextYearDisabled() {
			const currentYear = this._inMonthPicker
				? this._monthPickerYear!
				: this._selectedMonth.year;
			const nextYear = currentYear + 1;

			return (
				this._resolvedMaxDate && nextYear > yearOfDate(this._resolvedMaxDate)
			);
		}

		/**
		 * @internal
		 */
		_onNextYearClick() {
			if (this._inMonthPicker) {
				this._monthPickerYear = this._monthPickerYear! + 1;
			} else {
				this._selectedMonth = {
					year: this._selectedMonth.year + 1,
					month: this._selectedMonth.month,
				};
			}
		}

		/**
		 * @internal
		 */
		get _isPrevMonthDisabled() {
			return this.#isMonthBeforeValidRange(addMonths(this._selectedMonth, -1));
		}

		/**
		 * @internal
		 */
		_onPrevMonthClick() {
			this._selectedMonth = addMonths(this._selectedMonth, -1);
		}

		/**
		 * @internal
		 */
		get _isNextMonthDisabled() {
			return this.#isMonthAfterValidRange(addMonths(this._selectedMonth, 1));
		}

		/**
		 * @internal
		 */
		_onNextMonthClick() {
			this._selectedMonth = addMonths(this._selectedMonth, 1);
		}

		// --- Calendar segments ---

		/**
		 * The number of calendars to show in the picker.
		 * @internal
		 */
		@observable _numCalendars = 1;

		/**
		 * @internal
		 */
		get _segments(): Segment[] {
			const segments: Segment[] = [];

			if (this._inMonthPicker) {
				segments.push({
					id: 0,
					type: 'month-picker',
					title: `${this._monthPickerYear}`,
					titleClickable: true,
					titleAriaLabel: this.locale.calendarPicker.showCalendarForMonthLabel(
						`${
							this.locale.calendarPicker.months.name[this._selectedMonth.month]
						} ${this._selectedMonth.year}`
					),
					prevYearButton: true,
					nextYearButton: true,
					months: buildMonthPickerGrid(
						this._monthPickerYear!,
						this.locale.calendarPicker
					),
				});
			} else {
				for (let i = 0; i < this._numCalendars; i++) {
					const month = addMonths(this._selectedMonth, i);
					const isSingle = this._numCalendars === 1;
					const isFirst = i === 0;
					const isLast = i === this._numCalendars - 1;
					segments.push({
						id: i,
						type: 'calendar',
						title: `${this.locale.calendarPicker.months.name[month.month]} ${
							month.year
						}`,
						titleClickable: isSingle,
						titleAriaLabel: this.locale.calendarPicker.changeMonthLabel(
							`${this.locale.calendarPicker.months.name[month.month]} ${
								month.year
							}`
						),
						prevYearButton: isFirst && isSingle,
						prevMonthButton: isFirst,
						nextMonthButton: isLast,
						nextYearButton: isLast && isSingle,
						calendar: buildCalendarGrid(month, this.locale.calendarPicker),
					});
				}
			}

			return segments;
		}

		// --- Date picker ---

		/**
		 * @internal
		 */
		_hideDatesOutsideMonth = false;

		/**
		 * The last date that had focus, used to implement tab roving
		 * @internal
		 */
		@observable
		_lastFocussedDate: DateStr | null = null;

		/**
		 * @internal
		 */
		_isDateSelected(_: DateStr) {
			return false;
		}

		/**
		 * @internal
		 */
		abstract _isDateAriaSelected(date: DateStr): boolean;

		/**
		 * @internal
		 * @private
		 */
		_isDateInSelectedRange(_: DateStr) {
			return false;
		}

		/**
		 * @internal
		 */
		_isDateRangeStart(_: DateStr) {
			return false;
		}

		/**
		 * @internal
		 */
		_isDateRangeEnd(_: DateStr) {
			return false;
		}

		/**
		 * @internal
		 */
		abstract _getSelectedDates(): DateStr[];

		/**
		 * @internal
		 */
		_onDateMouseEnter(_: DateStr) {}

		/**
		 * @internal
		 */
		_onDateMouseLeave(_: DateStr) {}

		/**
		 * @internal
		 */
		abstract _onDateClick(date: DateStr): void;

		/**
		 * Handle keydown on a date in the calendar.
		 * @internal
		 */
		_onDateKeydown(date: DateStr, event: KeyboardEvent) {
			let newDate: DateStr | null = null;

			if (event.key === 'ArrowUp') {
				newDate = addDays(date, -7);
			} else if (event.key === 'ArrowDown') {
				newDate = addDays(date, 7);
			} else if (event.key === 'ArrowLeft') {
				newDate = addDays(date, -1);
			} else if (event.key === 'ArrowRight') {
				newDate = addDays(date, 1);
			}

			if (newDate && this._isDateInValidRange(newDate)) {
				if (this._adjustSelectedMonthToEnsureVisibilityOf(newDate)) {
					// Update DOM immediately so that we can focus the new date
					Updates.process();
				}

				// Move focus to new date
				(
					this._dialogEl.querySelector(
						`[data-date="${newDate}"]`
					) as HTMLButtonElement
				).focus();

				return false;
			}

			return true; // Don't prevent default
		}

		/**
		 * @internal
		 */
		_onDateFocus(date: DateStr) {
			this._lastFocussedDate = date;
		}

		/**
		 * Only one date should be in the tab order at a time (tab roving).
		 * @internal
		 */
		@volatile
		get _tabbableDate(): DateStr | null {
			const datesInSegments = this._segments
				.filter(
					(segment): segment is CalendarSegment => segment.type === 'calendar'
				)
				.flatMap((segment) => segment.calendar.grid.flat().map((d) => d.date));

			const candidates = [
				this._lastFocussedDate,
				...this._getSelectedDates(),
				currentDateStr(),
				...datesInSegments,
			];

			const firstVisibleMonth = this._selectedMonth;
			const lastVisibleMonth = addMonths(
				this._selectedMonth,
				this._numCalendars - 1
			);

			// Find valid candidate
			return (
				candidates.find(
					(date) =>
						date &&
						compareMonths(monthOfDate(date), firstVisibleMonth) >= 0 &&
						compareMonths(monthOfDate(date), lastVisibleMonth) <= 0 &&
						this._isDateInValidRange(date)
				) ?? null
			);
		}

		// --- Month picker ---

		/**
		 * The year the month picker is currently showing.
		 * If null, the month picker is not showing.
		 * @internal
		 */
		@observable _monthPickerYear: number | null = null;

		/**
		 * @internal
		 */
		get _inMonthPicker() {
			return this._monthPickerYear !== null;
		}

		/**
		 * The month that had focus last, used to implement tab roving
		 * @internal
		 */
		@observable
		_lastFocussedMonth: Month | null = null;

		/**
		 * Handle month selected in the month picker.
		 * @internal
		 */
		_onMonthClick(month: Month) {
			this._selectedMonth = month;
			this._monthPickerYear = null;
		}

		/**
		 * Handle keydown on a month in the month picker.
		 * @internal
		 */
		_onMonthKeydown(month: Month, event: KeyboardEvent) {
			let newMonth: Month | null = null;

			if (event.key === 'ArrowUp') {
				newMonth = addMonths(month, -MonthsPerRow);
			} else if (event.key === 'ArrowDown') {
				newMonth = addMonths(month, MonthsPerRow);
			} else if (event.key === 'ArrowLeft') {
				newMonth = addMonths(month, -1);
			} else if (event.key === 'ArrowRight') {
				newMonth = addMonths(month, 1);
			}

			if (newMonth && this._isMonthInValidRange(newMonth)) {
				// Change year if we moved to a different year
				if (newMonth.year !== this._monthPickerYear) {
					this._monthPickerYear = newMonth.year;
					// Update DOM immediately so that we can focus the new month
					Updates.process();
				}

				// Move focus to new month
				(
					this._dialogEl.querySelector(
						`[data-month="${monthToStr(newMonth!)}"]`
					) as HTMLButtonElement
				).focus();

				return false;
			}

			return true; // Don't prevent default
		}

		/**
		 * @internal
		 */
		_onMonthFocus(month: Month) {
			this._lastFocussedMonth = month;
		}

		/**
		 * Only one month should be in the tab order at a time (tab roving).
		 * @internal
		 */
		@volatile
		get _tabbableMonth(): Month | null {
			const monthsInSegments = this._segments
				.filter(
					(segments): segments is MonthPickerSegment =>
						segments.type === 'month-picker'
				)
				.flatMap((segment) => segment.months.flat().map((c) => c.month));

			const candidates = [
				this._lastFocussedMonth,
				this._selectedMonth,
				getCurrentMonth(),
				...monthsInSegments,
			];

			// Find valid candidate
			return (
				candidates.find(
					(month) =>
						month &&
						month.year === this._monthPickerYear &&
						this._isMonthInValidRange(month)
				) ?? null
			);
		}
	}

	return CalendarPickerElement;
};

export type CalendarPickerElement = MixinType<typeof CalendarPicker>;
