import { attr, DOM, type ValueConverter } from '@microsoft/fast-element';
import { PickerField } from '../../shared/picker-field/picker-field';
import { SingleValuePicker } from '../../shared/picker-field/mixins/single-value-picker';
import { TimeSelectionPicker } from '../../shared/picker-field/mixins/time-selection-picker';
import {
	formatPresentationTime,
	parsePresentationTime,
} from '../../shared/datetime/presentationTime';
import { isValidTimeStr, type TimeStr } from '../../shared/datetime/time';

/// Converter ensures that the value is always a valid time string or empty string
export const ValidTimeFilter: ValueConverter = {
	fromView: (value: string) => {
		if (value && isValidTimeStr(value)) {
			return value;
		}
		return '';
	},
	toView(value: string) {
		return value;
	},
};

/**
 * @public
 * @component time-picker
 * @slot helper-text - Describes how to use the time-picker. Alternative to the `helper-text` attribute.
 * @event {CustomEvent<undefined>} input - Emitted when the time is changed by the user.
 * @event {CustomEvent<undefined>} change - Emitted when the time is changed by the user.
 * @vueModel modelValue value input `event.currentTarget.value`
 */
export class TimePicker extends TimeSelectionPicker(
	SingleValuePicker(PickerField)
) {
	/**
	 * @internal
	 */
	override _isValidValue = isValidTimeStr;

	/**
	 * @internal
	 */
	override _toPresentationValue(value: string): string {
		return formatPresentationTime(
			value,
			this._displaySeconds,
			this._use12hClock
		);
	}

	/**
	 * @internal
	 */
	override _parsePresentationValue(presentationValue: string): string {
		return parsePresentationTime(presentationValue, this._use12hClock);
	}

	/**
	 * @internal
	 */
	override get _timeValue(): string {
		return this.value;
	}

	/**
	 * @internal
	 */
	override _withUpdatedTime(timeStr: TimeStr) {
		return timeStr;
	}

	/**
	 * @internal
	 */
	override get _resolvedMinTime(): TimeStr | null {
		return this.min || null;
	}

	/**
	 * @internal
	 */
	override get _resolvedMaxTime(): TimeStr | null {
		return this.max || null;
	}

	// --- Attributes ---

	/**
	 * The earliest accepted time of the time-picker.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: min
	 */
	@attr({ converter: ValidTimeFilter })
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
	 * The latest accepted time of the time-picker.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: max
	 */
	@attr({ converter: ValidTimeFilter })
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

	// --- Core ---

	constructor() {
		super();
		this.min = '';
		this.max = '';
		this.proxy.type = 'time';
		this.proxy.step = '1';
	}

	// --- Text field ---

	/**
	 * @internal
	 */
	override get _textFieldPlaceholder() {
		return this._timePlaceholder;
	}

	// --- Picker button ---

	/**
	 * @internal
	 */
	override get _pickerButtonIcon() {
		return 'clock-line';
	}

	/**
	 * @internal
	 */
	override get _pickerButtonLabel() {
		if (this.value) {
			return this.locale.timePicker.changeTimeLabel(
				this._toPresentationValue(this.value)
			);
		}
		return this.locale.timePicker.chooseTimeLabel;
	}

	/**
	 * @internal
	 */
	override _onPickerButtonClick() {
		super._onPickerButtonClick();
		if (this._popupOpen) {
			DOM.processUpdates();
			this._focusableElsWithinDialog()[0]?.focus();
		}
	}

	// --- Dialog ---

	/**
	 * @internal
	 */
	get _dialogLabel() {
		return this.locale.timePicker.chooseTimeLabel;
	}

	/**
	 * @internal
	 */
	override _focusableElsWithinDialog() {
		return this._dialogEl.querySelectorAll(
			'#inline-time-picker, .vwc-button'
		) as NodeListOf<HTMLElement>;
	}

	// --- Validation ---

	/**
	 * @internal
	 */
	override _getCustomValidationError(): string | null {
		if (this._isPresentationValueInvalid()) {
			return this.locale.timePicker.invalidTimeError;
		}

		return null;
	}
}
