import { attr, observable, volatile } from '@microsoft/fast-element';
import {
	compareDateStr,
	type DateStr,
	isValidDateStr,
} from '../../shared/date-picker/calendar/dateStr';
import {
	type ErrorText,
	errorText,
	type FormElement,
	formElements,
} from '../../shared/patterns';
import {
	formatPresentationDateRange,
	formatRange,
	parsePresentationDateRange,
} from '../../shared/date-picker/calendar/presentationDateRange';
import { DatePickerBase } from '../../shared/date-picker/date-picker-base';
import { formatPresentationDate } from '../../shared/date-picker/calendar/presentationDate';
import type { DateRange } from '../../shared/date-picker/calendar/dateRange';

const isFormAssociatedTryingToSetFormValue = (
	value: File | string | FormData | null
) => typeof value === 'string';

function isDefined<T>(value: T | null | undefined): value is T {
	return !!value;
}

/**
 * @public
 * @component date-range-picker
 * @slot helper-text - Describes how to use the date-range-picker. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} input:start - Event emitted when the start value changes
 * @event {CustomEvent<undefined>} input:end - Event emitted when the end value changes
 * @event {CustomEvent<undefined>} input - Emitted when either the start or end value changes
 * @event {CustomEvent<undefined>} change - Emitted when either the start or end value changes
 * @vueModel start start input:start `(event.target as any).start`
 * @vueModel end end input:end `(event.target as any).end`
 */
@errorText
@formElements
export class DateRangePicker extends DatePickerBase {
	/**
	 * The initial start value. This value sets the `start` property
	 * only when the `start` property has not been explicitly set.
	 *
	 * @remarks
	 * HTML Attribute: start
	 */
	@attr({ mode: 'fromView', attribute: 'start' }) initialStart = '';

	/**
	 * @internal
	 */
	initialStartChanged() {
		if (!this.dirtyValue) {
			this.start = this.initialStart;
			this.dirtyValue = false;
		}
	}

	/**
	 * The initial end value. This value sets the `end` property
	 * only when the `end` property has not been explicitly set.
	 *
	 * @remarks
	 * HTML Attribute: end
	 */
	@attr({ mode: 'fromView', attribute: 'end' }) initialEnd = '';

	/**
	 * @internal
	 */
	initialEndChanged() {
		if (!this.dirtyValue) {
			this.end = this.initialEnd;
			this.dirtyValue = false;
		}
	}

	#isInternalValueUpdate = false;

	/**
	 * The start value of the date range.
	 */
	@observable start = '';

	/**
	 * @internal
	 */
	startChanged() {
		if (this.start && !isValidDateStr(this.start)) {
			this.start = '';
			return;
		}
		this.currentStart = this.start;
		this.dirtyValue = true;
		if (!this.#isInternalValueUpdate) {
			this.#handleChangedValues();
		}
	}

	/**
	 * The end value of the date range.
	 */
	@observable end = '';

	/**
	 * @internal
	 */
	endChanged() {
		if (this.end && !isValidDateStr(this.end)) {
			this.end = '';
			return;
		}
		this.currentEnd = this.end;
		this.dirtyValue = true;
		if (!this.#isInternalValueUpdate) {
			this.#handleChangedValues();
		}
	}

	/**
	 * The current start value of the element. This property serves as a mechanism
	 * to set the `start` property through both property assignment and the
	 * .setAttribute() method. This is useful for setting the field's value
	 * in UI libraries that bind data through the .setAttribute() API
	 * and don't support IDL attribute binding.
	 *
	 * @remarks
	 * HTML Attribute: current-start
	 */
	@attr({ attribute: 'current-start' }) currentStart!: string;

	/**
	 * @internal
	 */
	currentStartChanged() {
		this.start = this.currentStart;
	}

	/**
	 * The current end value of the element. This property serves as a mechanism
	 * to set the `end` property through both property assignment and the
	 * .setAttribute() method. This is useful for setting the field's value
	 * in UI libraries that bind data through the .setAttribute() API
	 * and don't support IDL attribute binding.
	 *
	 * @remarks
	 * HTML Attribute: current-end
	 */
	@attr({ attribute: 'current-end' }) currentEnd!: string;

	/**
	 * @internal
	 */
	currentEndChanged() {
		this.end = this.currentEnd;
	}

	#updateValues(range: Partial<DateRange>) {
		this.#isInternalValueUpdate = true;
		if (range.start !== undefined) {
			this.start = range.start;
			this.$emit('input:start');
		}
		if (range.end !== undefined) {
			this.end = range.end;
			this.$emit('input:end');
		}
		this.#isInternalValueUpdate = false;

		this.$emit('input');
		this.$emit('change');

		this.#handleChangedValues();
	}

	#handleChangedValues() {
		if (this.start && this.end) {
			if (compareDateStr(this.start, this.end) > 0) {
				this.#updateValues({ start: this.end, end: this.start });
				return;
			}

			// Set a dummy value for required validation
			this.value = formatRange(this.start, this.end);
		} else {
			this.value = '';
		}

		this._updatePresentationValue();

		const dateToEnsureVisibilityOf = this.start || this.end;
		if (dateToEnsureVisibilityOf) {
			this._adjustSelectedMonthToEnsureVisibilityOf(dateToEnsureVisibilityOf);
		}

		this.#updateFormValue();
	}

	/**
	 * @internal
	 */
	protected override _updatePresentationValue() {
		if (this.start && this.end) {
			this._presentationValue = formatPresentationDateRange(
				{
					start: this.start,
					end: this.end,
				},
				this.locale.datePicker
			);
		} else {
			this._presentationValue = '';
		}
	}

	/**
	 * @internal
	 */
	override nameChanged(previous: string, next: string) {
		super.nameChanged!(previous, next);
		this.#updateFormValue();
	}

	#updateFormValue() {
		if (!this.name || !this.start || !this.end) {
			this.setFormValue(null);
		} else {
			const formData = new FormData();
			formData.append(this.name, this.start);
			formData.append(this.name, this.end);
			this.setFormValue(formData);
		}
	}

	override setFormValue = (
		value: File | string | FormData | null,
		state?: File | string | FormData | null
	) => {
		if (isFormAssociatedTryingToSetFormValue(value)) {
			return;
		}

		super.setFormValue(value, state);
	};

	override connectedCallback() {
		super.connectedCallback();
		if (!this.start) {
			this.start = this.initialStart;
		}
		if (!this.end) {
			this.end = this.initialEnd;
		}
	}

	/**
	 * @internal
	 */
	@observable override _numCalendars = 2;
	/**
	 * @internal
	 */
	override _hideDatesOutsideMonth = true;

	#getVisibleRange(): Partial<DateRange> {
		const candidates = [this.start, this.end].filter(isDefined);

		const isPartialRange = candidates.length === 1;
		if (this._hoverDate && isPartialRange) {
			candidates.push(this._hoverDate);
		}

		const [start, end] = candidates.sort(compareDateStr);
		return { start, end };
	}

	/**
	 * @internal
	 */
	override _isDateAriaSelected(date: DateStr) {
		return date === this.start || date === this.end;
	}

	/**
	 * @internal
	 */
	override _isDateInSelectedRange(date: DateStr) {
		const { start, end } = this.#getVisibleRange();

		if (start && end) {
			return compareDateStr(date, start) >= 0 && compareDateStr(date, end) <= 0;
		}
		return false;
	}

	/**
	 * @internal
	 */
	override _isDateRangeStart(date: DateStr) {
		return date === this.#getVisibleRange().start;
	}

	/**
	 * @internal
	 */
	override _isDateRangeEnd(date: DateStr) {
		return date === this.#getVisibleRange().end;
	}

	/**
	 * @internal
	 */
	protected override _getSelectedDates(): DateStr[] {
		const dates = [];
		if (this.start) {
			dates.push(this.start);
		}
		if (this.end) {
			dates.push(this.end);
		}
		return dates;
	}

	/**
	 * @internal
	 */
	override _onDateClick(date: DateStr) {
		if (this.start && this.end) {
			this.#updateValues({ start: date, end: '' });
		} else if (this.start) {
			this.#updateValues({ end: date });
			this._closePopup();
		} else if (this.end) {
			this.#updateValues({ start: date });
			this._closePopup();
		} else {
			this.#updateValues({ start: date });
		}
	}

	/**
	 * @internal
	 */
	override get _textFieldPlaceholder() {
		return formatRange(
			this.locale.datePicker.dateFormatPlaceholder,
			this.locale.datePicker.dateFormatPlaceholder
		);
	}

	/**
	 * @internal
	 */
	override _textFieldSize = '30';

	/**
	 * @internal
	 */
	override _onTextFieldChange() {
		if (this._presentationValue === '') {
			this.#updateValues({ start: '', end: '' });
			return;
		}

		try {
			const { start, end } = parsePresentationDateRange(
				this._presentationValue,
				this.locale.datePicker
			);
			this.#updateValues({ start, end });
		} catch (_) {
			return;
		}
	}

	/**
	 * @internal
	 */
	@observable _hoverDate?: DateStr;

	/**
	 * @internal
	 */
	override _onDateMouseEnter(date: DateStr) {
		this._hoverDate = date;
	}

	/**
	 * @internal
	 */
	override _onDateMouseLeave() {
		this._hoverDate = undefined;
	}

	/**
	 * @internal
	 */
	protected override _getCustomValidationError(): string | null {
		if (this._isPresentationValueInvalid()) {
			return this.locale.datePicker.invalidDateRangeError;
		}

		if (this.min && this.start && compareDateStr(this.start, this.min) < 0) {
			return this.locale.datePicker.startDateAfterMinDateError(
				formatPresentationDate(this.min, this.locale.datePicker)
			);
		}

		if (this.max && this.end && compareDateStr(this.end, this.max) > 0) {
			return this.locale.datePicker.endDateBeforeMaxDateError(
				formatPresentationDate(this.max, this.locale.datePicker)
			);
		}

		return null;
	}

	/**
	 * @internal
	 */
	_isPresentationValueInvalid() {
		if (this._presentationValue === '') {
			return false;
		}

		try {
			parsePresentationDateRange(
				this._presentationValue,
				this.locale.datePicker
			);
			return false;
		} catch (_) {
			return true;
		}
	}

	/**
	 * @internal
	 */
	override _onClearClick() {
		this.#updateValues({ start: '', end: '' });
		super._onClearClick();
	}

	/**
	 * @internal
	 */
	override formResetCallback() {
		this.#updateValues({ start: this.initialStart, end: this.initialEnd });
		super.formResetCallback();
	}

	/**
	 * @internal
	 */
	@volatile
	get _calendarButtonLabel() {
		if (this.start && this.end) {
			return this.locale.datePicker.changeDatesLabel(
				formatPresentationDateRange(
					{
						start: this.start,
						end: this.end,
					},
					this.locale.datePicker
				)
			);
		} else {
			return this.locale.datePicker.chooseDatesLabel;
		}
	}
}

export interface DateRangePicker extends ErrorText, FormElement {}
