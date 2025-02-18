import {
	attr,
	type BindingObserver,
	defaultExecutionContext,
	DOM,
	nullableNumberConverter,
	Observable,
	observable,
	type ValueConverter,
	volatile,
} from '@microsoft/fast-element';
import {
	type ErrorText,
	errorText,
	type FormElement,
	FormElementHelperText,
	formElements,
	Localized,
	TrappedFocus,
} from '../../shared/patterns';
import type { TextField } from '../text-field/text-field';
import type { Button } from '../button/button';
import { applyMixinsWithObservables } from '../../shared/utils/applyMixinsWithObservables';
import { handleEscapeKeyAndStopPropogation } from '../../shared/dialog/index';
import { FormAssociatedTimePicker } from './time-picker.form-associated';
import {
	formatPresentationTime,
	parsePresentationTime,
} from './time/presentationTime';
import { isValidTimeStr, type TimeStr } from './time/time';
import type { InlineTimePicker } from './inline-time-picker/inline-time-picker';

/// Converter ensures that the value is always a valid time string or empty string
const ValidTimeFilter: ValueConverter = {
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
 * @vueModel modelValue value input `(event.target as HTMLInputElement).value`
 */
@errorText
@formElements
export class TimePicker extends FormAssociatedTimePicker {
	// --- Attributes ---

	/**
	 * Whether the time-picker is readonly.
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

	/**
	 * Distance between presented minute options.
	 * @public
	 * @remarks
	 * HTML Attribute: minutes-step
	 */
	@attr({ attribute: 'minutes-step', converter: nullableNumberConverter })
	minutesStep: number | null = null;

	/**
	 * Distance between presented seconds options. If null, seconds are not presented.
	 * @public
	 * @remarks
	 * HTML Attribute: seconds-step
	 */
	@attr({ attribute: 'seconds-step', converter: nullableNumberConverter })
	secondsStep: number | null = null;

	/**
	 * Forces the time-picker to use a 12h or 24h clock.
	 * @public
	 * @remarks
	 * HTML Attribute: clock
	 */
	@attr clock?: '12h' | '24h';

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
	_clockButtonEl!: Button;
	/**
	 * @internal
	 */
	_inlineTimePickerEl!: InlineTimePicker;

	// --- Core ---

	/**
	 * @internal
	 */
	get _displaySeconds() {
		return this.secondsStep !== null;
	}

	/**
	 * @internal
	 */
	@volatile
	get _use12hClock() {
		return this.clock
			? this.clock === '12h'
			: this.locale.timePicker.defaultTo12HourClock;
	}

	// Reformat the presentation value when the clock changes
	#clockChangeHandler = {
		handleChange: () => {
			if (this.value) {
				this._presentationValue = formatPresentationTime(
					this.value,
					this._displaySeconds,
					this._use12hClock
				);
			}
		},
	};

	#clockChangeObserver!: BindingObserver;

	#getFocusableEls = () =>
		this.shadowRoot!.querySelectorAll(`
			#inline-time-picker,
			.dialog .vwc-button:not(:disabled)
		`) as NodeListOf<HTMLElement>;

	/**
	 * @internal
	 */
	override valueChanged(previous: string, next: string) {
		super.valueChanged(previous, next);
		if (this.value) {
			if (!isValidTimeStr(this.value)) {
				this.value = '';
				return;
			}

			this._presentationValue = formatPresentationTime(
				this.value,
				this._displaySeconds,
				this._use12hClock
			);
		} else {
			this._presentationValue = '';
		}
	}

	#updateValueDueToUserInteraction(newValue: TimeStr) {
		this.value = newValue;
		this.$emit('change');
		this.$emit('input');
	}

	constructor() {
		super();
		this.value = '';
		this.min = '';
		this.max = '';
		this.proxy.type = 'time';
		this.proxy.step = '1';
	}

	override connectedCallback() {
		super.connectedCallback();

		document.addEventListener('click', this.#dismissOnClickOutside);
		this.addEventListener('focusin', this.#onFocusIn);
		this.addEventListener('focusout', this.#onFocusOut);

		this.#clockChangeObserver = Observable.binding(
			() => this._use12hClock,
			this.#clockChangeHandler
		);
		this.#clockChangeObserver.observe(this, defaultExecutionContext);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();

		document.removeEventListener('click', this.#dismissOnClickOutside);
		this.removeEventListener('focusin', this.#onFocusIn);
		this.removeEventListener('focusout', this.#onFocusOut);

		this.#clockChangeObserver.disconnect();
	}

	#onFocusIn = () => {
		this.$emit('focus', undefined, { bubbles: false });
	};

	#onFocusOut = () => {
		this.$emit('blur', undefined, { bubbles: false });
	};

	// --- Popup ---

	/**
	 * Whether the time-picker popup is open.
	 * @internal
	 */
	@observable _popupOpen = false;

	#dismissOnClickOutside = (event: MouseEvent) => {
		if (!this._popupOpen) {
			return;
		}

		const path = event.composedPath();
		const elementsToIgnoreClicksOn = [this._dialogEl, this._clockButtonEl];
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

		if (restoreFocusToTextField) {
			this._textFieldEl.focus();
		}
	}

	/**
	 * On keydown anywhere in the time picker.
	 * @internal
	 */
	_onBaseKeyDown(event: KeyboardEvent) {
		// Close dialog on Escape
		if (this._popupOpen && handleEscapeKeyAndStopPropogation(event)) {
			this._closePopup();
			return false;
		}

		if (this._trappedFocus(event, this.#getFocusableEls)) {
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

	/**
	 * @internal
	 */
	get _textFieldPlaceholder() {
		let format = 'hh:mm';
		if (this._displaySeconds) {
			format += ':ss';
		}
		if (this._use12hClock) {
			format += ' aa';
		}
		return format;
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
				parsePresentationTime(this._presentationValue, this._use12hClock)
			);
		} catch (_) {
			return;
		}
	}

	// --- Clock button ---

	/**
	 * @internal
	 */
	get _clockButtonLabel() {
		if (this.value) {
			return this.locale.timePicker.changeTimeLabel(
				formatPresentationTime(
					this.value,
					this._displaySeconds,
					this._use12hClock
				)
			);
		}
		return this.locale.timePicker.chooseTimeLabel;
	}

	/**
	 * @internal
	 */
	_onClockButtonClick() {
		if (this._popupOpen) {
			this._closePopup();
		} else {
			this.#openPopupIfPossible();

			DOM.processUpdates();

			this._inlineTimePickerEl.scrollSelectedOptionsToTop();

			this.#getFocusableEls()[0].focus();
		}
	}

	// --- Inline time picker ---

	/**
	 * @internal
	 */
	_onInlineTimePickerChange(event: CustomEvent<string>) {
		this.#updateValueDueToUserInteraction(event.detail);
	}

	/**
	 * @internal
	 */
	_onInlineTimePickerLastColumnSelected() {
		this._closePopup();
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
		this.#updateValueDueToUserInteraction('');
		this._closePopup();
	}

	// --- Validation ---

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

	/**
	 * @internal
	 */
	private _getCustomValidationError(): string | null {
		if (this._isPresentationValueInvalid()) {
			return this.locale.timePicker.invalidTimeError;
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
			parsePresentationTime(this._presentationValue, this._use12hClock);
			return false;
		} catch (_) {
			return true;
		}
	}
}

export interface TimePicker
	extends ErrorText,
		FormElement,
		FormElementHelperText,
		Localized,
		TrappedFocus {}
applyMixinsWithObservables(
	TimePicker,
	Localized,
	FormElementHelperText,
	TrappedFocus
);
