import {
	attr,
	type BindingObserver,
	defaultExecutionContext,
	DOM,
	Observable,
	observable,
	type ValueConverter,
	volatile,
} from '@microsoft/fast-element';
import type { TextField } from '../../../lib/text-field/text-field';
import type { Button } from '../../../lib/button/button';
import { FormElementHelperText, Localized, TrappedFocus } from '../../patterns';
import { applyMixinsWithObservables } from '../../utils/applyMixinsWithObservables';
import { handleEscapeKeyAndStopPropogation } from '../../dialog';
import {
	addDays,
	compareDateStr,
	currentDateStr,
	type DateStr,
	isValidDateStr,
} from '../../date-picker/calendar/dateStr';
import {
	addMonths,
	compareMonths,
	getCurrentMonth,
	type Month,
	monthOfDate,
	monthToStr,
} from '../../date-picker/calendar/month';
import { buildCalendarGrid } from '../../date-picker/calendar/calendarGrid';
import {
	buildMonthPickerGrid,
	MonthsPerRow,
} from '../../date-picker/calendar/monthPickerGrid';
import { yearOfDate } from '../../date-picker/calendar/year';
import { FormAssociatedDatePickerBase } from '../../date-picker/date-picker-base.form-associated';
import type {
	CalendarSegment,
	MonthPickerSegment,
	Segment,
} from '../../date-picker/calendar/segment';

/// Converter ensures that the value is always a valid date string or empty string
const ValidDateFilter: ValueConverter = {
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
 * Base class for date-picker
 *
 * @event {CustomEvent<undefined>} clear-click - Event emitted when the clear button is clicked.
 *
 * @public
 */
export abstract class CalendarPicker extends FormAssociatedDatePickerBase {
	// --- Attributes ---
	abstract label: string;

	/**
	 * The earliest accepted date of the date-picker.
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
	 * The latest accepted date of the date-picker.
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
	 * The initial value of the date-picker.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: value
	 */
	@attr({ attribute: 'value' })
	override initialValue!: string;

	/**
	 * The current value of the date-picker.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: current-value
	 */
	@attr({ attribute: 'current-value' })
	override currentValue!: string;

	/**
	 * Whether the date-picker is readonly.
	 * @public
	 * @remarks
	 * HTML Attribute: readonly
	 */
	@attr({ attribute: 'readonly', mode: 'boolean' })
	readOnly = false;

	/**
	 * @internal
	 */
	protected readOnlyChanged(): void {
		if (this.proxy instanceof HTMLInputElement) {
			this.proxy.readOnly = this.readOnly;
			this.validate();
		}
	}

	// --- Refs ---
	/**
	 * @internal
	 */
	_textFieldEl!: TextField;
	/**
	 * @internal
	 */
	_dialogEl!: HTMLElement;
	/**
	 * @internal
	 */
	_calendarButtonEl!: Button;

	// --- Common state and getters ---

	/**
	 * The month the calendar is currently showing.
	 * @internal
	 */
	@observable _selectedMonth = getCurrentMonth();

	protected _adjustSelectedMonthToEnsureVisibilityOf(date: DateStr) {
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
	 * @internal
	 */
	_isDateInValidRange(date: DateStr) {
		return (
			(!this.min || compareDateStr(date, this.min) >= 0) &&
			(!this.max || compareDateStr(date, this.max) <= 0)
		);
	}

	#isMonthAfterValidRange(month: Month) {
		return this.max && compareMonths(month, monthOfDate(this.max)) > 0;
	}

	#isMonthBeforeValidRange(month: Month) {
		return this.min && compareMonths(month, monthOfDate(this.min)) < 0;
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

	constructor() {
		super();
		this.value = '';
		this.min = '';
		this.max = '';
	}

	override connectedCallback() {
		super.connectedCallback();

		document.addEventListener('click', this.#dismissOnClickOutside);
		this.addEventListener('focusin', this.#onFocusIn);
		this.addEventListener('focusout', this.#onFocusOut);

		this.#localeChangeObserver = Observable.binding(
			() => this.locale,
			this.#localeChangeHandler
		);
		this.#localeChangeObserver.observe(this, defaultExecutionContext);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();

		document.removeEventListener('click', this.#dismissOnClickOutside);
		this.removeEventListener('focusin', this.#onFocusIn);
		this.removeEventListener('focusout', this.#onFocusOut);

		this.#localeChangeObserver.disconnect();
	}

	#onFocusIn = () => {
		this.$emit('focus', undefined, { bubbles: false });
	};

	#onFocusOut = () => {
		this.$emit('blur', undefined, { bubbles: false });
	};

	/**
	 * @internal
	 */
	abstract errorValidationMessage: string;

	/**
	 * @internal
	 */
	override validate() {
		// When error-text is present, validate() is skipped and the error-text is used instead

		// Otherwise, super.validate() will use validity of the proxy
		// We can use .setCustomValidity to force any custom error on it here
		if (this.proxy) {
			this.proxy.setCustomValidity(this._getCustomValidationError() ?? '');
		}

		super.validate(this._textFieldEl?.querySelector('input') ?? undefined);
	}

	protected abstract _getCustomValidationError(): string | null;

	// Reformat the presentation value when the locale changes
	#localeChangeHandler = {
		handleChange: () => {
			this._updatePresentationValue();
		},
	};

	#localeChangeObserver!: BindingObserver;

	// --- Popup ---

	/**
	 * Whether the date-picker popup is open.
	 * @internal
	 */
	@observable _popupOpen = false;

	#dismissOnClickOutside = (event: MouseEvent) => {
		if (!this._popupOpen) {
			return;
		}

		const path = event.composedPath();
		const elementsToIgnoreClicksOn = [this._dialogEl, this._calendarButtonEl];
		if (!elementsToIgnoreClicksOn.some((element) => path.includes(element))) {
			this._closePopup(false);
		}
	};

	#openPopupIfPossible() {
		if (!this.readOnly) {
			this._popupOpen = true;
		}
	}

	/**
	 * @internal
	 */
	protected _closePopup(restoreFocusToTextField = true) {
		this._popupOpen = false;
		this._monthPickerYear = null;

		if (restoreFocusToTextField) {
			this._textFieldEl.focus();
		}
	}

	/**
	 * On keydown anywhere in the date picker.
	 * @internal
	 */
	_onBaseKeyDown(event: KeyboardEvent) {
		// Close dialog on Escape
		if (this._popupOpen && handleEscapeKeyAndStopPropogation(event)) {
			this._closePopup();
			return false;
		}

		if (
			this._trappedFocus(
				event,
				() =>
					this.shadowRoot!.querySelectorAll(`
				.dialog .button:not(:disabled),
				.dialog .vwc-button:not(:disabled)
			`) as NodeListOf<HTMLElement>
			)
		) {
			return false;
		}

		// Otherwise, don't prevent default
		return true;
	}

	// --- Text field ---

	/**
	 * Stores the value of the text field.
	 * @internal
	 */
	@observable _presentationValue = '';
	/**
	 * @internal
	 */
	_presentationValueChanged() {
		this.dirtyValue = true;
		this.validate();
	}

	protected abstract _updatePresentationValue(): void;

	/**
	 * @internal
	 */
	abstract get _textFieldPlaceholder(): string;

	/**
	 * @internal
	 */
	abstract _textFieldSize: string;

	/**
	 * @internal
	 */
	_onTextFieldInput(event: Event) {
		const textField = event.currentTarget as TextField;
		this._presentationValue = textField.value;
	}

	/**
	 * @internal
	 */
	abstract _onTextFieldChange(): void;

	// --- Calendar button ---

	/**
	 * @internal
	 */
	abstract get _calendarButtonLabel(): string;

	/**
	 * @internal
	 */
	_onCalendarButtonClick() {
		if (this._popupOpen) {
			this._closePopup();
		} else {
			this.#openPopupIfPossible();

			DOM.processUpdates();

			const tabbableDate = this._tabbableDate;
			if (tabbableDate)
				(
					this.shadowRoot!.querySelector(
						`[data-date="${tabbableDate}"]`
					) as HTMLButtonElement
				).focus();
		}
	}

	// --- Dialog header ---

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

		return this.min && prevYear < yearOfDate(this.min);
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

		return this.max && nextYear > yearOfDate(this.max);
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

	// --- Calendar ---

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
				prevYearButton: true,
				nextYearButton: true,
				months: buildMonthPickerGrid(
					this._monthPickerYear!,
					this.locale.datePicker
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
					title: `${this.locale.datePicker.months.name[month.month]} ${
						month.year
					}`,
					titleClickable: isSingle,
					prevYearButton: isFirst && isSingle,
					prevMonthButton: isFirst,
					nextMonthButton: isLast,
					nextYearButton: isLast && isSingle,
					calendar: buildCalendarGrid(month, this.locale.datePicker),
				});
			}
		}

		return segments;
	}

	/**
	 * @internal
	 */
	_hideDatesOutsideMonth = false;

	/**
	 * The last date that had focus, used to implement tab roving
	 * @internal
	 */
	@observable
	private _lastFocussedDate: DateStr | null = null;

	/**
	 * @internal
	 */
	_isDateSelected(_: DateStr) {
		return false;
	}

	/**
	 * @internal
	 */
	abstract _isDateAriaSelected(date: DateStr): void;

	/**
	 * @internal
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

	protected abstract _getSelectedDates(): DateStr[];

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
				DOM.processUpdates();
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
	private _lastFocussedMonth: Month | null = null;

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
				DOM.processUpdates();
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

	// --- Dialog footer ---

	/**
	 * @internal
	 */
	_onOkClick() {
		this._closePopup();
	}

	/**
	 * @internal
	 */
	_onClearClick() {
		this._closePopup();
	}
}

export interface DatePickerBase
	extends Localized,
		FormElementHelperText,
		TrappedFocus {}
applyMixinsWithObservables(
	CalendarPicker,
	Localized,
	FormElementHelperText,
	TrappedFocus
);
