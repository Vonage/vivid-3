import { volatile } from '@microsoft/fast-element';
import { type DateStr, isValidDateStr } from '../../shared/datetime/dateStr';
import {
	formatPresentationDate,
	parsePresentationDate,
} from '../../shared/datetime/presentationDate';
import { PickerField } from '../../shared/picker-field/picker-field';
import { SingleValuePicker } from '../../shared/picker-field/mixins/single-value-picker';
import { CalendarPicker } from '../../shared/picker-field/mixins/calendar-picker';
import { MinMaxCalendarPicker } from '../../shared/picker-field/mixins/min-max-calendar-picker';
import { SingleDatePickerMixin } from '../../shared/picker-field/mixins/single-date-picker';

/**
 * Single date picker component.
 *
 * @public
 * @component date-picker
 * @slot helper-text - Describes how to use the date-picker. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} input - Emitted when the date is changed by the user.
 * @event {CustomEvent<undefined>} change - Emitted when the date is changed by the user.
 * @vueModel modelValue value input `event.currentTarget.value`
 */
export class DatePicker extends SingleDatePickerMixin(
	SingleValuePicker(MinMaxCalendarPicker(CalendarPicker(PickerField)))
) {
	/**
	 * @internal
	 */
	override _isValidValue = isValidDateStr;

	/**
	 * @internal
	 */
	override _toPresentationValue(value: DateStr) {
		return formatPresentationDate(value, this.locale.calendarPicker);
	}

	/**
	 * @internal
	 */
	override _parsePresentationValue(presentationValue: string) {
		return parsePresentationDate(presentationValue, this.locale.calendarPicker);
	}

	/**
	 * @internal
	 */
	override _dateValue(): DateStr | '' {
		return this.value;
	}

	/**
	 * @internal
	 */
	override _withUpdatedDate(dateStr: DateStr): DateStr | '' {
		return dateStr;
	}

	constructor() {
		super();
		this.proxy.type = 'date';
	}

	/**
	 * @internal
	 */
	@volatile
	get _pickerButtonLabel() {
		if (this.value) {
			return this.locale.calendarPicker.changeDateLabel(
				this._toPresentationValue(this.value)
			);
		} else {
			return this.locale.calendarPicker.chooseDateLabel;
		}
	}

	/**
	 * @internal
	 */
	get _dialogLabel() {
		return this.locale.calendarPicker.chooseDateLabel;
	}

	/**
	 * @internal
	 */
	get _textFieldPlaceholder(): string {
		return this.locale.calendarPicker.dateFormatPlaceholder;
	}

	/**
	 * @internal
	 */
	override _textFieldSize = '20';

	/**
	 * Handle selecting a date from the calendar.
	 * @internal
	 */
	override _onDateClick(date: DateStr) {
		super._onDateClick(date);
		this._closePopup();
	}

	/**
	 * @internal
	 */
	override _getCustomValidationError(): string | null {
		if (this._isPresentationValueInvalid()) {
			return this.locale.calendarPicker.invalidDateError;
		}

		return null;
	}

	/**
	 * @internal
	 */
	override _focusableElsWithinDialog() {
		return this._dialogEl.querySelectorAll(
			'button, .vwc-button'
		) as NodeListOf<HTMLElement>;
	}

	/**
	 * @internal
	 */
	override get _pickerButtonIcon() {
		return 'calendar-line';
	}
}
