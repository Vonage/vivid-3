import { Observable, observable, volatile } from '@microsoft/fast-element';
import {
	compareDateStr,
	type DateStr,
} from '../../shared/date-picker/calendar/dateStr';
import {
	type ErrorText,
	errorText,
	type FormElement,
	formElements,
} from '../../shared/patterns';
import type { Value } from '../value/value';
import { monthOfDate } from '../../shared/date-picker/calendar/month';
import {
	formatPresentationDateRange,
	formatRange,
	parsePresentationDateRange,
} from '../../shared/date-picker/calendar/presentationDateRange';
import { DatePickerBase } from '../../shared/date-picker/date-picker-base';
import { formatPresentationDate } from '../../shared/date-picker/calendar/presentationDate';
import type { DateRange } from '../../shared/date-picker/calendar/dateRange';

function isDefined<T>(value: T | null | undefined): value is T {
	return !!value;
}

/**
 * Base class for date-range-picker
 *
 * @public
 */
@errorText
@formElements
export class DateRangePicker extends DatePickerBase {
	/**
	 * @internal
	 */
	@observable _defaultSlottedContent: Value[] = [];
	/**
	 * @internal
	 */
	_defaultSlottedContentChanged() {
		this._startValueEl = this._defaultSlottedContent.find(
			(field) => field.key === 'start'
		);
		this._endValueEl = this._defaultSlottedContent.find(
			(field) => field.key === 'end'
		);
	}

	/**
	 * @internal
	 */
	@observable _startValueEl?: Value;
	/**
	 * @internal
	 */
	_startValueElChanged(
		oldValue?: Value,
		newValue?: Value
	) {
		this.#valueElChanged(oldValue, newValue);
	}

	/**
	 * @internal
	 */
	@observable _endValueEl?: Value;

	/**
	 * @internal
	 */
	_endValueElChanged(
		oldValue?: Value,
		newValue?: Value
	) {
		this.#valueElChanged(oldValue, newValue);
	}

	#valueElChanged(
		oldValue?: Value,
		newValue?: Value
	) {
		if (oldValue) {
			const notifier = Observable.getNotifier(oldValue);
			notifier.unsubscribe(this.#valueElsSubscriber, 'value');
		}
		if (newValue) {
			const notifier = Observable.getNotifier(newValue);
			notifier.subscribe(this.#valueElsSubscriber, 'value');
			this.#valueElsSubscriber.handleChange();
		}
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._startValueEl = undefined;
		this._endValueEl = undefined;
	}

	#valueElsSubscriber = {
		handleChange: () => {
			this.#updateValues(
				this._startValueEl?.value ?? this._startValue,
				this._endValueEl?.value ?? this._endValue
			);
		},
	};

	/**
	 * @internal
	 */
	@observable _startValue: string = '';

	/**
	 * @internal
	 */
	@observable _endValue: string = '';

	#updateInProgress = false;

	#updateValues(startValue: string, endValue: string) {
		if (this.#updateInProgress) {
			return;
		}

		this._startValue = startValue;
		this._endValue = endValue;

		this.#updateInProgress = true;
		if (this._startValueEl?.value !== startValue) {
			this._startValueEl?.updateValue(startValue);
		}
		if (this._endValueEl?.value !== endValue) {
			this._endValueEl?.updateValue(endValue);
		}
		this.#updateInProgress = false;

		this.#handleChangedValues();
	}

	#handleChangedValues() {
		if (this._startValue && this._endValue) {
			if (compareDateStr(this._startValue, this._endValue) > 0) {
				this.#updateValues(this._endValue, this._startValue);
				return;
			}

			this._presentationValue = formatPresentationDateRange(
				{
					start: this._startValue,
					end: this._endValue,
				},
				this.locale.datePicker
			);
			// Set a dummy value for required validation
			this.value = this._presentationValue;
			// Ensure we are switched to the month of the new selected date
			this._selectedMonth = monthOfDate(this._startValue);
		} else {
			this.value = '';
			this._presentationValue = '';
		}
	}

	#getVisibleRange(): Partial<DateRange> {
		const candidates = [this._startValue, this._endValue].filter(isDefined);

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
		return date === this._startValue || date === this._endValue;
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
	override _onDateClick(date: DateStr) {
		if (this._startValue && this._endValue) {
			this.#updateValues(date, '');
		} else if (this._startValue) {
			this.#updateValues(this._startValue, date);
			this._closePopup();
		} else if (this._endValue) {
			this.#updateValues(date, this._endValue);
			this._closePopup();
		} else {
			this.#updateValues(date, '');
		}
	}

	/**
	 * @internal
	 */
	override get _textFieldPlaceholder() {
		return formatRange(this.locale.datePicker.dateFormatPlaceholder, this.locale.datePicker.dateFormatPlaceholder);
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
			this.#updateValues('', '');
			return;
		}

		try {
			const {start, end} = parsePresentationDateRange(
				this._presentationValue,
				this.locale.datePicker
			);
			this.#updateValues(start, end);
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

		if (
			this.min &&
			this._startValue &&
			compareDateStr(this._startValue, this.min) < 0
		) {
			return this.locale.datePicker.startDateAfterMinDateError(
				formatPresentationDate(this.min, this.locale.datePicker)
			);
		}

		if (
			this.max &&
			this._endValue &&
			compareDateStr(this._endValue, this.max) > 0
		) {
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
		this.#updateValues('', '');
		super._onClearClick();
	}

	override formResetCallback() {
		this.#updateValues(
			this._startValueEl?.initialValue ?? '',
			this._endValueEl?.initialValue ?? ''
		);
		this.dirtyValue = false;
	}

	/**
	 * @internal
	 */
	@volatile
	get _calendarButtonLabel() {
		if (this._startValue && this._endValue) {
			return this.locale.datePicker.changeDatesLabel(
				formatPresentationDateRange(
					{
						start: this._startValue,
						end: this._endValue,
					},
					this.locale.datePicker
				)
			);
		} else {
			return this.locale.datePicker.chooseDatesLabel;
		}
	}
}

export interface DateRangePicker
	extends
	ErrorText,
	FormElement {}
