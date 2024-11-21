import { volatile } from '@microsoft/fast-element';
import {
	type ErrorText,
	errorText,
	type FormElement,
	formElements,
} from '../../shared/patterns';
import { DatePickerBase } from '../../shared/date-picker/date-picker-base';
import {
	type DateStr,
	isValidDateStr,
} from '../../shared/date-picker/calendar/dateStr';
import {
	formatPresentationDate,
	parsePresentationDate,
} from '../../shared/date-picker/calendar/presentationDate';

/**
 * Single date picker component.
 *
 * @public
 * @component date-picker
 * @slot helper-text - Describes how to use the date-picker. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} input - Emitted when the date is changed by the user.
 * @event {CustomEvent<undefined>} change - Emitted when the date is changed by the user.
 * @vueModel modelValue value input `(event.target as HTMLInputElement).value`
 */
@errorText
@formElements
export class DatePicker extends DatePickerBase {
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

			this._adjustSelectedMonthToEnsureVisibilityOf(this.value);
		}
		this._updatePresentationValue();
	}

	protected override _updatePresentationValue() {
		if (this.value) {
			this._presentationValue = formatPresentationDate(
				this.value,
				this.locale.datePicker
			);
		} else {
			this._presentationValue = '';
		}
	}

	#updateValueDueToUserInteraction(newValue: DateStr) {
		this.value = newValue;
		this.$emit('change');
		this.$emit('input');
	}

	constructor() {
		super();
		this.proxy.type = 'date';
	}

	/**
	 * @internal
	 */
	@volatile
	get _calendarButtonLabel() {
		if (this.value) {
			return this.locale.datePicker.changeDateLabel(
				formatPresentationDate(this.value, this.locale.datePicker)
			);
		} else {
			return this.locale.datePicker.chooseDateLabel;
		}
	}

	/**
	 * @internal
	 */
	get _textFieldPlaceholder(): string {
		return this.locale.datePicker.dateFormatPlaceholder;
	}

	/**
	 * @internal
	 */
	override _textFieldSize = '20';

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
	 * Handle selecting a date from the calendar.
	 * @internal
	 */
	_onDateClick(date: DateStr) {
		this.#updateValueDueToUserInteraction(date);
		this._closePopup();
	}

	/**
	 * @internal
	 */
	override _isDateSelected(date: DateStr) {
		return date === this.value;
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
	protected override _getSelectedDates(): DateStr[] {
		const dates = [];
		if (this.value) {
			dates.push(this.value);
		}
		return dates;
	}

	/**
	 * @internal
	 */
	protected override _getCustomValidationError(): string | null {
		if (this._isPresentationValueInvalid()) {
			return this.locale.datePicker.invalidDateError;
		}

		return null;
	}

	/**
	 * @internal
	 */
	private _isPresentationValueInvalid() {
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
	override _onClearClick() {
		this.#updateValueDueToUserInteraction('');
		super._onClearClick();
	}
}

export interface DatePicker extends ErrorText, FormElement {}
