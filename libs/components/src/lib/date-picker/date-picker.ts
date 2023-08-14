import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr, observable, volatile } from '@microsoft/fast-element';
import type { TextField } from '../text-field/text-field';
import { Localized } from '../../shared/patterns';
import {
	addDays,
	currentDateStr,
	type DateStr,
	formatDateStr,
	isValidDateStr,
} from './calendar/dateStr';
import {
	addMonths,
	areMonthsEqual,
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

/**
 * Base class for date-picker
 *
 * @public
 */
export class DatePicker extends FoundationElement {
	// --- Attributes ---
	/**
	 * The label text of the date-picker.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;

	/**
	 * The helper-text text of the date-picker.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: helper-text
	 */
	@attr({ attribute: 'helper-text' }) helperText?: string;

	/**
	 * The error-text text of the date-picker.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: error-text
	 */
	@attr({ attribute: 'error-text' }) errorText?: string;

	/**
	 * The currently selected date of the date-picker.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr value?: string;
	/**
	 * @internal
	 */
	valueChanged() {
		this.internalValidationError = null;
		const validatedValue = this.selectedDate;
		if (validatedValue !== null) {
			this.presentationValue = formatPresentationDate(
				validatedValue,
				this.locale.datePicker
			);
			// Ensure we are switched to the month of the new selected date
			this.selectedMonth = monthOfDate(validatedValue);
		} else {
			this.presentationValue = '';
		}
	}

	#updateValueDueToUserInteraction(newValue: DateStr | undefined) {
		this.value = newValue;
		this.$emit('change');
		this.$emit('input');
	}

	/**
	 * Whether the date-picker is disabled.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	@attr({ mode: 'boolean' }) disabled = false;

	/**
	 * Whether the date-picker is readonly.
	 * @public
	 * @remarks
	 * HTML Attribute: readonly
	 */
	@attr({ attribute: 'readonly', mode: 'boolean' }) readOnly = false;

	// --- Refs ---
	/**
	 * @internal
	 */
	textFieldEl!: TextField;
	/**
	 * @internal
	 */
	dialogEl!: HTMLElement;
	/**
	 * @internal
	 */
	firstFocusableEl!: HTMLElement;
	/**
	 * @internal
	 */
	lastFocusableEl!: HTMLElement;

	// --- Common state and getters ---

	/**
	 * Validated and safe to use date value.
	 * @internal
	 */
	get selectedDate(): DateStr | null {
		if (this.value && isValidDateStr(this.value)) {
			return this.value;
		}
		return null;
	}

	/**
	 * The month the calendar is currently showing.
	 * @internal
	 */
	@observable selectedMonth = getCurrentMonth();

	/**
	 * Today's date.
	 * @internal
	 */
	currentDate = currentDateStr();

	/**
	 * Today's month.
	 * @internal
	 */
	currentMonth = getCurrentMonth();

	// --- Callbacks ---

	override connectedCallback() {
		super.connectedCallback();

		document.addEventListener('click', this.#dismissOnClickOutside);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();

		document.removeEventListener('click', this.#dismissOnClickOutside);
	}

	// --- Popup ---

	/**
	 * Whether the date-picker popup is open.
	 * @internal
	 */
	@observable popupOpen = false;

	#dismissOnClickOutside = (event: MouseEvent) => {
		if (!this.popupOpen) {
			return;
		}

		const path = event.composedPath();
		if (!path.includes(this)) {
			this.#closePopup(false);
		}
	};

	/// Used to stop the popup from immediately opening when closing popup and returning focus to text field
	#isClosingPopup = false;

	#closePopup(restoreFocusToTextField = true) {
		this.popupOpen = false;
		this.monthPickerYear = null;

		if (restoreFocusToTextField) {
			this.#isClosingPopup = true;
			this.textFieldEl.focus();
			this.#isClosingPopup = false;
		}
	}

	/**
	 * On keydown anywhere in the date picker.
	 * @internal
	 */
	onBaseKeyDown(event: KeyboardEvent) {
		// Close dialog on Escape
		if (event.key === 'Escape') {
			this.#closePopup();
			return false;
		}

		// Trap focus inside the dialog
		if (event.key === 'Tab') {
			if (event.shiftKey) {
				// Shift + tab
				if (this.shadowRoot!.activeElement === this.firstFocusableEl) {
					this.lastFocusableEl.focus();
					return false;
				}
			} else {
				// Tab
				if (this.shadowRoot!.activeElement === this.lastFocusableEl) {
					this.firstFocusableEl.focus();
					return false;
				}

				// When tabbing from the text field into the dialog, focus the day
				if (
					this.shadowRoot!.activeElement === this.textFieldEl &&
					this.popupOpen
				) {
					(
						this.dialogEl.querySelector(
							`[data-date="${this.tabbableDate}"]`
						) as HTMLButtonElement | null
					)?.focus();
					return false;
				}
			}
		}

		// Otherwise, don't prevent default
		return true;
	}

	/// --- Text field ---

	/**
	 * Stores the value of the text field.
	 * @internal
	 */
	@observable presentationValue = '';

	/**
	 * @internal
	 */
	@observable private internalValidationError: string | null = null;

	/**
	 * @internal
	 */
	@volatile
	get textFieldErrorText() {
		return this.errorText || this.internalValidationError || '';
	}

	/**
	 * @internal
	 */
	onTextFieldInput(event: Event) {
		const textField = event.currentTarget as TextField;
		this.presentationValue = textField.value;
		this.internalValidationError = null;
	}

	/**
	 * @internal
	 */
	onTextFieldChange() {
		if (this.presentationValue === '') {
			this.#updateValueDueToUserInteraction(undefined);
			return;
		}

		try {
			this.#updateValueDueToUserInteraction(
				parsePresentationDate(this.presentationValue, this.locale.datePicker)
			);
		} catch (_) {
			this.internalValidationError = this.locale.datePicker.invalidDateError;
			return;
		}
	}

	/**
	 * @internal
	 */
	onTextFieldFocus() {
		if (!this.readOnly && !this.#isClosingPopup) {
			this.popupOpen = true;
		}
	}

	/// --- Dialog header ---

	/**
	 * @internal
	 */
	onTitleActionClick() {
		if (this.inMonthPicker) {
			this.monthPickerYear = null;
		} else {
			this.monthPickerYear = this.selectedMonth.year;
		}
	}

	/**
	 * @internal
	 */
	onPrevYearClick() {
		if (this.inMonthPicker) {
			this.monthPickerYear = this.monthPickerYear! - 1;
		} else {
			this.selectedMonth = {
				year: this.selectedMonth.year - 1,
				month: this.selectedMonth.month,
			};
		}
	}

	/**
	 * @internal
	 */
	onNextYearClick() {
		if (this.inMonthPicker) {
			this.monthPickerYear = this.monthPickerYear! + 1;
		} else {
			this.selectedMonth = {
				year: this.selectedMonth.year + 1,
				month: this.selectedMonth.month,
			};
		}
	}

	/**
	 * @internal
	 */
	onPrevMonthClick() {
		this.selectedMonth = addMonths(this.selectedMonth, -1);
	}

	/**
	 * @internal
	 */
	onNextMonthClick() {
		this.selectedMonth = addMonths(this.selectedMonth, 1);
	}

	/// --- Calendar ---

	/**
	 * The calendar grid used to render the calendar.
	 * @internal
	 */
	get calendarGrid() {
		return buildCalendarGrid(this.selectedMonth, this.locale.datePicker);
	}

	/// The last date that had focus, used to implement tab roving
	@observable
	private lastFocussedDate: DateStr | null = null;

	/**
	 * Handle selecting a date from the calendar.
	 * @internal
	 */
	onDateClick(date: DateStr) {
		this.#updateValueDueToUserInteraction(date);
		this.#closePopup();
	}

	/**
	 * Handle keydown on a date in the calendar.
	 * @internal
	 */
	onDateKeydown(date: DateStr, event: KeyboardEvent) {
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

		if (newDate) {
			const newMonth = monthOfDate(newDate);

			// Change month if we moved to a different month
			if (!areMonthsEqual(newMonth, this.selectedMonth)) {
				this.selectedMonth = newMonth;
			}

			// Move focus to new date
			// In case month has changed, we need to wait for the DOM to update
			setTimeout(() => {
				(
					this.dialogEl.querySelector(
						`[data-date="${newDate}"]`
					) as HTMLButtonElement | null
				)?.focus();
			}, 1);

			return false;
		}

		return true; // Don't prevent default
	}

	/**
	 * @internal
	 */
	onDateFocus(date: DateStr) {
		this.lastFocussedDate = date;
	}

	/**
	 * Only one date should be in the tab order at a time (tab roving).
	 * @internal
	 */
	@volatile
	get tabbableDate(): DateStr {
		const candidates = [
			this.lastFocussedDate,
			this.selectedDate,
			currentDateStr(),
		];

		// Find valid candidate or default to the first day of the current month
		return (
			candidates.find(
				(date) =>
					date !== null && areMonthsEqual(monthOfDate(date), this.selectedMonth)
			) ??
			formatDateStr(
				new Date(this.selectedMonth.year, this.selectedMonth.month, 1)
			)
		);
	}

	/// --- Month picker ---

	/**
	 * The year the month picker is currently showing.
	 * If null, the month picker is not showing.
	 * @internal
	 */
	@observable monthPickerYear: number | null = null;

	/**
	 * @internal
	 */
	get inMonthPicker() {
		return this.monthPickerYear !== null;
	}

	/**
	 * The months grid used to render the month picker.
	 * @internal
	 */
	get monthPickerGrid() {
		if (this.monthPickerYear === null) {
			throw new Error('Not in month picker');
		}
		return buildMonthPickerGrid(this.monthPickerYear, this.locale.datePicker);
	}

	/// The month that had focus last, used to implement tab roving
	@observable
	private lastFocussedMonth: Month | null = null;

	/**
	 * Handle month selected in the month picker.
	 * @internal
	 */
	onMonthClick(month: Month) {
		this.selectedMonth = month;
		this.monthPickerYear = null;
	}

	/**
	 * Handle keydown on a month in the month picker.
	 * @internal
	 */
	onMonthKeydown(month: Month, event: KeyboardEvent) {
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

		if (newMonth) {
			// Change year if we moved to a different year
			if (newMonth.year !== this.monthPickerYear) {
				this.monthPickerYear = newMonth.year;
			}

			// Move focus to new month
			// In case year has changed, we need to wait for the DOM to update
			setTimeout(() => {
				(
					this.dialogEl.querySelector(
						`[data-month="${monthToStr(newMonth!)}"]`
					) as HTMLButtonElement | null
				)?.focus();
			}, 1);

			return false;
		}

		return true; // Don't prevent default
	}

	/**
	 * @internal
	 */
	onMonthFocus(month: Month) {
		this.lastFocussedMonth = month;
	}

	/**
	 * Only one month should be in the tab order at a time (tab roving).
	 * @internal
	 */
	@volatile
	get tabbableMonth(): Month {
		const year = this.monthPickerYear ?? this.selectedMonth.year;

		const candidates = [
			this.lastFocussedMonth,
			this.selectedMonth,
			getCurrentMonth(),
		];

		// Find valid candidate, otherwise chose the first month of the year
		return (
			candidates.find((month) => month && month.year === year) ?? {
				month: 0,
				year,
			}
		);
	}

	// --- Dialog footer ---

	/**
	 * @internal
	 */
	onOkClick() {
		this.#closePopup();
	}

	/**
	 * @internal
	 */
	onClearClick() {
		this.#updateValueDueToUserInteraction(undefined);
		this.#closePopup();
	}
}

export interface DatePicker extends Localized {}
applyMixins(DatePicker, Localized);
