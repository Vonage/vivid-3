import { applyMixins } from '@microsoft/fast-foundation';
import {
	attr,
	DOM,
	observable,
	type ValueConverter,
	volatile,
} from '@microsoft/fast-element';
import type { TextField } from '../text-field/text-field';
import type { Button } from '../button/button';
import {
	type ErrorText,
	errorText,
	type FormElement,
	FormElementHelperText,
	formElements,
	Localized,
} from '../../shared/patterns';
import {
	addDays,
	compareDateStr,
	currentDateStr,
	type DateStr,
	isValidDateStr,
} from './calendar/dateStr';
import {
	addMonths,
	areMonthsEqual,
	compareMonths,
	getCurrentMonth,
	type Month,
	monthOfDate,
	monthToStr,
} from './calendar/month';
import { buildCalendarGrid } from './calendar/calendarGrid';
import {
	formatPresentationDate,
	parsePresentationDate,
} from './calendar/presentationDate';
import { buildMonthPickerGrid, MonthsPerRow } from './calendar/monthPickerGrid';
import { yearOfDate } from './calendar/year';
import { FormAssociatedDatePicker } from './date-picker.form-associated';

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
 * @public
 */
@errorText
@formElements
export class DatePicker extends FormAssociatedDatePicker {
	// --- Attributes ---

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
	@attr({ attribute: 'value', converter: ValidDateFilter })
	override initialValue!: string;

	/**
	 * The current value of the date-picker.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: current-value
	 */
	@attr({ attribute: 'current-value', converter: ValidDateFilter })
	override currentValue!: string;

	/**
	 * @internal
	 */
	override valueChanged(previous: string, next: string) {
		super.valueChanged(previous, next);
		if (this.value) {
			if (!isValidDateStr(this.value)) {
				this.value = '';
				return;
			}

			this._presentationValue = formatPresentationDate(
				this.value,
				this.locale.datePicker
			);
			// Ensure we are switched to the month of the new selected date
			this._selectedMonth = monthOfDate(this.value);
		} else {
			this._presentationValue = '';
		}
	}

	#updateValueDueToUserInteraction(newValue: DateStr) {
		this.value = newValue;
		this.$emit('change');
		this.$emit('input');
	}

	/**
	 * Whether the date-picker is readonly.
	 * @public
	 * @remarks
	 * HTML Attribute: readonly
	 */
	@attr({ attribute: 'readonly', mode: 'boolean' })
		readOnly: boolean = false;
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

	#getFocusableEls() {
		const focusableEls = this.shadowRoot!.querySelectorAll(`
			.dialog .button:not(:disabled),
			.dialog .vwc-button:not(:disabled)
		`);
		return {
			firstFocusableEl: focusableEls[0] as HTMLElement,
			lastFocusableEl: focusableEls[focusableEls.length - 1] as HTMLElement,
		};
	}

	// --- Common state and getters ---

	/**
	 * The month the calendar is currently showing.
	 * @internal
	 */
	@observable _selectedMonth = getCurrentMonth();

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
	}

	override disconnectedCallback() {
		super.disconnectedCallback();

		document.removeEventListener('click', this.#dismissOnClickOutside);
	}

	override validate() {
		// When error-text is present, validate() is skipped and the error-text is used instead

		// Otherwise, super.validate() will use validity of the proxy
		// We can use .setCustomValidity to force any custom error on it here
		if (this.proxy) {
			if (this.#isPresentationValueInvalid()) {
				this.proxy.setCustomValidity(this.locale.datePicker.invalidDateError);
			} else {
				this.proxy.setCustomValidity('');
			}
		}

		super.validate(this._textFieldEl?.shadowRoot?.querySelector('input') ?? undefined);
	}

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
		if (!elementsToIgnoreClicksOn.some(element => path.includes(element))) {
			this.#closePopup(false);
		}
	};

	/// Used to stop the popup from immediately opening when closing popup and returning focus to text field
	#isClosingPopup = false;

	#openPopupIfPossible() {
		if (!this.readOnly && !this.#isClosingPopup) {
			this._popupOpen = true;
		}
	}

	#closePopup(restoreFocusToTextField = true) {
		this._popupOpen = false;
		this._monthPickerYear = null;

		if (restoreFocusToTextField) {
			this.#isClosingPopup = true;
			this._textFieldEl.focus();
			this.#isClosingPopup = false;
		}
	}

	/**
	 * On keydown anywhere in the date picker.
	 * @internal
	 */
	_onBaseKeyDown(event: KeyboardEvent) {
		// Close dialog on Escape
		if (event.key === 'Escape') {
			this.#closePopup();
			return false;
		}

		// Trap focus inside the dialog
		if (event.key === 'Tab') {
			const { firstFocusableEl, lastFocusableEl } = this.#getFocusableEls();

			if (event.shiftKey) {
				// Shift + tab
				if (this.shadowRoot!.activeElement === firstFocusableEl) {
					lastFocusableEl.focus();
					return false;
				}
			} else {
				// Tab
				if (this.shadowRoot!.activeElement === lastFocusableEl) {
					firstFocusableEl.focus();
					return false;
				}
			}
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
	_presentationValueChanged() {
		this.dirtyValue = true;
		this.validate();
	}

	#isPresentationValueInvalid() {
		if (this._presentationValue === '') {
			return false;
		}

		try {
			parsePresentationDate(this._presentationValue, this.locale.datePicker);
			return false;
		} catch (_) {
			return true;
		}
	}

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
	_onTextFieldChange() {
		if (this._presentationValue === '') {
			this.#updateValueDueToUserInteraction('');
			return;
		}

		try {
			this.#updateValueDueToUserInteraction(
				parsePresentationDate(this._presentationValue, this.locale.datePicker)
			);
		} catch (_) {
			return;
		}
	}

	/**
	 * @internal
	 */
	_onTextFieldFocus() {
		this.$emit('focus', undefined, { bubbles: false });
	}

	/**
	 * @internal
	 */
	_onTextFieldBlur() {
		this.$emit('blur', undefined, { bubbles: false });
	}

	// --- Calendar button ---

	/**
	 * @internal
	 */
	@volatile
	get _calendarButtonLabel() {
		if (this.value) {
			return this.locale.datePicker.changeDateLabel(formatPresentationDate(this.value, this.locale.datePicker));
		} else {
			return this.locale.datePicker.chooseDateLabel;
		}
	}

	/**
	 * @internal
	 */
	_onCalendarButtonClick() {
		if (this._popupOpen) {
			this.#closePopup();
		} else {
			this.#openPopupIfPossible();

			DOM.processUpdates();

			const tabbableDate = this.shadowRoot!.querySelector(`[data-date="${this._tabbableDate}"]`) as HTMLButtonElement;
			tabbableDate.focus();
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
	 * The calendar grid used to render the calendar.
	 * @internal
	 */
	get _calendarGrid() {
		return buildCalendarGrid(this._selectedMonth, this.locale.datePicker);
	}

	/**
	 * The last date that had focus, used to implement tab roving
	 * @internal
	 */
	@observable
	private _lastFocussedDate: DateStr | null = null;

	/**
	 * Handle selecting a date from the calendar.
	 * @internal
	 */
	_onDateClick(date: DateStr) {
		this.#updateValueDueToUserInteraction(date);
		this.#closePopup();
	}

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
			const newMonth = monthOfDate(newDate);

			// Change month if we moved to a different month
			if (!areMonthsEqual(newMonth, this._selectedMonth)) {
				this._selectedMonth = newMonth;
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
		const datesInGrid = this._calendarGrid.grid.flat().map((date) => date.date);

		const candidates = [
			this._lastFocussedDate,
			this.value,
			currentDateStr(),
			...datesInGrid,
		];

		// Find valid candidate
		return (
			candidates.find(
				(date) =>
					date &&
					areMonthsEqual(monthOfDate(date), this._selectedMonth) &&
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
	 * The months grid used to render the month picker.
	 * @internal
	 */
	get _monthPickerGrid() {
		return buildMonthPickerGrid(
			this._monthPickerYear ?? this._currentMonth.year,
			this.locale.datePicker
		);
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
		const year = this._monthPickerYear ?? this._selectedMonth.year;

		const monthsInGrid = this._monthPickerGrid.flat().map((cell) => cell.month);

		const candidates = [
			this._lastFocussedMonth,
			this._selectedMonth,
			getCurrentMonth(),
			...monthsInGrid,
		];

		// Find valid candidate
		return (
			candidates.find(
				(month) =>
					month && month.year === year && this._isMonthInValidRange(month)
			) ?? null
		);
	}

	// --- Dialog footer ---

	/**
	 * @internal
	 */
	_onOkClick() {
		this.#closePopup();
	}

	/**
	 * @internal
	 */
	_onClearClick() {
		this.#updateValueDueToUserInteraction('');
		this.#closePopup();
	}
}

export interface DatePicker
	extends Localized,
	ErrorText,
	FormElement,
	FormElementHelperText {}
applyMixins(DatePicker, Localized, FormElementHelperText);
