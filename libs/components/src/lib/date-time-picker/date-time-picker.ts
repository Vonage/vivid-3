import { attr, type ValueConverter } from '@microsoft/fast-element';
import {
	errorText,
	type ErrorText,
	type FormElement,
	formElements,
} from '../../shared/patterns';
import {
	type DateTimeStr,
	extractDatePart,
	extractTimePart,
	isValidDateTimeStr,
} from '../../shared/datetime/dateTimeStr';
import { PickerField } from '../../shared/picker-field/picker-field';
import {
	formatPresentationDateTime,
	parsePresentationDateTime,
} from '../../shared/datetime/presentationDateTime';
import {
	compareDateStr,
	currentDateStr,
	type DateStr,
} from '../../shared/datetime/dateStr';
import { compareTimeStr, type TimeStr } from '../../shared/datetime/time';
import { SingleValuePicker } from '../../shared/picker-field/mixins/single-value-picker';
import { CalendarPicker } from '../../shared/picker-field/mixins/calendar-picker';
import { TimeSelectionPicker } from '../../shared/picker-field/mixins/time-selection-picker';
import { SingleDatePickerMixin } from '../../shared/picker-field/mixins/single-date-picker';
import { ValidTimeFilter } from '../time-picker/time-picker';
import { ValidDateFilter } from '../../shared/picker-field/mixins/min-max-calendar-picker';
import { formatPresentationDate } from '../../shared/datetime/presentationDate';
import { formatPresentationTime } from '../../shared/datetime/presentationTime';

/// Converter ensures that the value is always a valid date time string or empty string
const ValidDateTimeFilter: ValueConverter = {
	fromView: (value: string) => {
		if (value && isValidDateTimeStr(value)) {
			return value;
		}
		return '';
	},
	toView(value: string) {
		return value;
	},
};

/**
 * Single date picker component.
 *
 * @public
 * @component date-time-picker
 * @slot helper-text - Describes how to use the date-picker. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} input - Emitted when the date is changed by the user.
 * @event {CustomEvent<undefined>} change - Emitted when the date is changed by the user.
 * @vueModel modelValue value input `(event.target as HTMLInputElement).value`
 */
@errorText
@formElements
export class DateTimePicker extends TimeSelectionPicker(
	SingleDatePickerMixin(SingleValuePicker(CalendarPicker(PickerField)))
) {
	/**
	 * The earliest accepted date-time.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: min
	 */
	@attr({ converter: ValidDateTimeFilter })
	min: string;

	/**
	 * The earliest accepted time part of the date-time.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: min-time
	 */
	@attr({ converter: ValidTimeFilter, attribute: 'min-time' })
	minTime: string;

	/**
	 * The earliest accepted date part of the date-time.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: min-date
	 */
	@attr({ converter: ValidDateFilter, attribute: 'min-date' })
	minDate: string;

	/**
	 * The latest accepted date-time.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max
	 */
	@attr({ converter: ValidDateTimeFilter })
	max: string;

	/**
	 * The latest accepted time part of the date-time.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max-time
	 */
	@attr({ converter: ValidTimeFilter, attribute: 'max-time' })
	maxTime: string;

	/**
	 * The latest accepted time date of the date-time.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max-date
	 */
	@attr({ converter: ValidDateFilter, attribute: 'max-date' })
	maxDate: string;

	override get _resolvedMinDate() {
		return this.minDate || extractDatePart(this.min);
	}

	override get _resolvedMaxDate() {
		return this.maxDate || extractDatePart(this.max);
	}

	override get _resolvedMinTime() {
		return (
			this.minTime ||
			(this.min &&
				extractDatePart(this.min) === this._dateValue() &&
				extractTimePart(this.min)) ||
			''
		);
	}

	override get _resolvedMaxTime() {
		return (
			this.maxTime ||
			(this.max &&
				extractDatePart(this.max) === this._dateValue() &&
				extractTimePart(this.max)) ||
			''
		);
	}

	/**
	 * @internal
	 */
	override _isValidValue = isValidDateTimeStr;

	/**
	 * @internal
	 */
	override _toPresentationValue(value: DateTimeStr) {
		return formatPresentationDateTime(
			value,
			this.locale.calendarPicker,
			this._displaySeconds,
			this._use12hClock
		);
	}

	/**
	 * @internal
	 */
	override _parsePresentationValue(presentationValue: string) {
		return parsePresentationDateTime(
			presentationValue,
			this.locale.calendarPicker,
			this._use12hClock
		);
	}

	/**
	 * @internal
	 */
	override _dateValue() {
		return extractDatePart(this.value);
	}

	/**
	 * @internal
	 */
	override _withUpdatedDate(dateStr: DateStr) {
		return `${dateStr}T${extractTimePart(this.value) || '00:00:00'}`;
	}

	/**
	 * @internal
	 */
	override get _timeValue() {
		return extractTimePart(this.value);
	}

	/**
	 * @internal
	 */
	override _withUpdatedTime(timeStr: TimeStr) {
		return `${extractDatePart(this.value) || currentDateStr()}T${timeStr}`;
	}

	constructor() {
		super();
		this.proxy.type = 'datetime-local';
		this.proxy.step = '1';
		this.min = '';
		this.minDate = '';
		this.minTime = '';
		this.max = '';
		this.maxDate = '';
		this.maxTime = '';
	}

	/**
	 * @internal
	 */
	override _getCustomValidationError(): string | null {
		if (this._isPresentationValueInvalid()) {
			return this.locale.dateTimePicker.invalidDateTimeError;
		}

		if (
			this._dateValue() &&
			this._resolvedMinDate &&
			compareDateStr(this._dateValue(), this._resolvedMinDate) < 0
		) {
			return this.locale.dateTimePicker.dateBeforeMinDateError(
				formatPresentationDate(
					this._resolvedMinDate,
					this.locale.calendarPicker
				)
			);
		}

		if (
			this._dateValue() &&
			this._resolvedMaxDate &&
			compareDateStr(this._dateValue(), this._resolvedMaxDate) > 0
		) {
			return this.locale.dateTimePicker.dateAfterMaxDateError(
				formatPresentationDate(
					this._resolvedMaxDate,
					this.locale.calendarPicker
				)
			);
		}

		if (
			this._timeValue &&
			this._resolvedMinTime &&
			compareTimeStr(this._timeValue, this._resolvedMinTime) < 0
		) {
			return this.locale.dateTimePicker.timeBeforeMinTimeError(
				formatPresentationTime(
					this._resolvedMinTime,
					this._displaySeconds,
					this._use12hClock
				)
			);
		}

		if (
			this._timeValue &&
			this._resolvedMaxTime &&
			compareTimeStr(this._timeValue, this._resolvedMaxTime) > 0
		) {
			return this.locale.dateTimePicker.timeAfterMaxTimeError(
				formatPresentationTime(
					this._resolvedMaxTime,
					this._displaySeconds,
					this._use12hClock
				)
			);
		}

		return null;
	}

	/**
	 * @internal
	 */
	override get _textFieldPlaceholder() {
		return `${this.locale.calendarPicker.dateFormatPlaceholder} ${this._timePlaceholder}`;
	}

	/**
	 * @internal
	 */
	override _textFieldSize = '30';

	/**
	 * @internal
	 */
	override get _pickerButtonLabel(): string {
		if (this.value) {
			return this.locale.dateTimePicker.changeDateTimeLabel(
				this._toPresentationValue(this.value)
			);
		} else {
			return this.locale.dateTimePicker.chooseDateTimeLabel;
		}
	}

	/**
	 * @internal
	 */
	override _focusableElsWithinDialog() {
		return this._dialogEl.querySelectorAll(
			'#inline-time-picker, button, .vwc-button'
		) as NodeListOf<HTMLElement>;
	}

	/**
	 * @internal
	 */
	override get _pickerButtonIcon() {
		return 'calendar-clock-line';
	}

	/**
	 * @internal
	 */
	get _dialogLabel() {
		return this.locale.dateTimePicker.chooseDateTimeLabel;
	}
}

export interface DateTimePicker extends ErrorText, FormElement {}
