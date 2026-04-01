import { attr, observable } from '@microsoft/fast-element';
import type { Size } from '../enums.js';
import { Localized } from '../../shared/patterns';
import { TextField } from '../text-field/text-field';
import type { ExtractFromEnum } from '../../shared/utils/enums';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { Button } from '../button/button';

/**
 * Types of button size.
 *
 * @public
 */
export type DialPadSize = ExtractFromEnum<Size, Size.Condensed | Size.Normal>;

/**
 * Base class for dial-pad
 *
 * @public
 * @component dial-pad
 * @event {CustomEvent<undefined>} change - Emitted when the text field value changes
 * @event {CustomEvent<undefined>} input - Emitted when the text field value changes
 * @event {CustomEvent<undefined>} blur - Emitted when the text field loses focus
 * @event {CustomEvent<undefined>} focus - Emitted when the text field receives focus
 * @event {CustomEvent<HTMLElement>}keypad-click - Emitted when a digit button is clicked
 * @event {CustomEvent<undefined>} dial - Emitted when the call button is clicked
 * @event {CustomEvent<undefined>} end-call - Emitted when the end call button is clicked
 * @vueModel modelValue value input `event.currentTarget.value`
 *
 */

export class DialPad extends Localized(VividElement) {
	/**
	 * @internal
	 */
	_textFieldEl!: TextField;

	/**
	 * Controls the helper text displayed below the phone input element
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: helper-text
	 */
	@attr({ attribute: 'helper-text' }) helperText: string | null = null;

	/**
	 * Indicates the placeholder's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: placeholder
	 */
	@attr placeholder: string | null = null;

	/**
	 * Value of the phone input element
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: value
	 */
	@attr({ mode: 'fromView' }) value = '';
	valueChanged(_oldValue: string, newValue: string) {
		if (
			newValue !== undefined &&
			newValue !== null &&
			this._textFieldEl &&
			newValue !== this._textFieldEl.value
		) {
			this._textFieldEl.value = newValue;
			this._textFieldEl.reportValidity();
		}
	}

	/**
	 * Regular expression to validate the value of the input element
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: pattern
	 */
	@attr({ mode: 'fromView' }) pattern = '^[0-9#*]*$';

	/**
	 * Controls the disabled state of the dial pad
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	@attr({ mode: 'boolean' }) disabled = false;

	/**
	 * Controls the pending state
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: pending
	 */
	@attr({ mode: 'boolean' }) pending = false;

	/**
	 * Controls the active state of the call
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: call-active
	 */
	@attr({ attribute: 'call-active', mode: 'boolean' }) callActive = false;

	/**
	 * Removes the call button and functionality
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: no-call
	 */
	@attr({ mode: 'boolean', attribute: 'no-call' }) noCall = false;

	/**
	 * Removes the phone input element
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: no-input
	 */
	@attr({ mode: 'boolean', attribute: 'no-input' }) noInput = false;

	/**
	 * Controls the vertical size of the dial pad
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	@attr size?: DialPadSize;

	/**
	 * Controls the end call button label
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: end-call-button-label
	 */
	@attr({ attribute: 'end-call-button-label' }) endCallButtonLabel:
		| string
		| null = null;

	/**
	 * Controls the call button label
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: call-button-label
	 */
	@attr({ attribute: 'call-button-label' }) callButtonLabel: string | null =
		null;

	/**
	 * The aria-label for the delete button
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: delete-aria-label
	 */
	@attr({ attribute: 'delete-aria-label' }) deleteAriaLabel: string | null =
		null;

	/**
	 * Long-press handling for digit '0' to insert '+'
	 * @internal
	 */
	private _longPressTimeoutId: number | null = null;
	/**
	 * Suppresses the next click handler after a long press has already handled input
	 * @internal
	 */
	_suppressNextClick = false;
	/**
	 * Tracks if long press completed for keyboard events
	 * @internal
	 */
	private _keyboardLongPressCompleted = false;

	/**
	 * @internal
	 */
	_startLongPress(digit: string, event: PointerEvent) {
		if (this.disabled || this.callActive || digit !== '0') return;

		this._clearLongPressTimer();
		const target = event.currentTarget as HTMLElement | null;

		this._longPressTimeoutId = window.setTimeout(() => {
			this._suppressNextClick = true;
			this.value += '+';
			this.$emit('keypad-click', target);
			this.$emit('input');
			this.$emit('change');
		}, 600);
	}

	/**
	 * @internal
	 */
	_startKeyboardLongPress() {
		if (this.disabled || this.callActive) return;
		// If timer is already running, don't restart it (keydown events repeat while key is held)
		if (this._longPressTimeoutId !== null) return;

		this._keyboardLongPressCompleted = false;

		this._longPressTimeoutId = window.setTimeout(() => {
			this._keyboardLongPressCompleted = true;

			this.value += '+';
			this.$emit('input');
			this.$emit('change');
		}, 650);
	}

	/**
	 * @internal
	 */
	_endLongPress() {
		this._clearLongPressTimer();
		// Reset suppress flag after a delay to handle cases where click doesn't fire.
		// This ensures the next click won't be incorrectly suppressed.
		window.setTimeout(() => {
			if (this._suppressNextClick) {
				this._suppressNextClick = false;
			}
		}, 0);
	}

	/**
	 * @internal
	 * @returns true if long press completed (timer fired), false otherwise
	 */
	_endKeyboardLongPress(): boolean {
		const wasLongPress = this._keyboardLongPressCompleted;
		this._clearLongPressTimer();

		window.setTimeout(() => {
			this._keyboardLongPressCompleted = false;
		}, 0);
		return wasLongPress;
	}

	/**
	 * @internal
	 */
	_cancelLongPress() {
		this._clearLongPressTimer();
	}

	private _clearLongPressTimer() {
		if (this._longPressTimeoutId !== null) {
			clearTimeout(this._longPressTimeoutId);
			this._longPressTimeoutId = null;
		}
	}

	/**
	 *
	 * @internal
	 */
	_onDial = () => {
		const invalid = !this._textFieldEl.checkValidity();
		if (invalid) {
			this._announceValidationError(
				this._textFieldEl.errorValidationMessage ?? ''
			);
		} else {
			this._clearErrorAnnouncement();
		}
		this.callActive ? this.$emit('end-call') : this.$emit('dial');
	};

	/**
	 * Indicates that an element should be focused on page load, or when the Dialog that it is part of
	 * is displayed. When `no-input` attribute is specified, it will be the first digit button.
	 * Otherwise, the text field will be focused.`
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: autofocus
	 */
	@attr({ mode: 'boolean' })
	override autofocus = false;

	/**
	 * Moves focus into the Dial Pad. If `no-input` attribute is specified, it will be the first digit
	 * button. Otherwise, the input field will be focused.
	 *
	 * @public
	 */
	override focus(): void {
		const digitBtns =
			this.shadowRoot?.querySelectorAll<Button>('.digits .digit-btn');
		// focus either the text field or the first digit button
		const firstFocusableEl = this._textFieldEl || digitBtns?.[0];
		firstFocusableEl?.focus();
	}

	/**
	 * @internal
	 */
	@observable _errorAnnouncement: string = '';

	/**
	 * @internal
	 */
	_forceAnnouncementToggle = false;

	/**
	 * @internal
	 */
	_announceValidationError(message: string) {
		this._errorAnnouncement = '';
		window.queueMicrotask(() => {
			if (message) {
				this._forceAnnouncementToggle = !this._forceAnnouncementToggle;
				this._errorAnnouncement = `${message}${
					this._forceAnnouncementToggle ? '\u200B' : ''
				}`;
			} else {
				this._clearErrorAnnouncement();
			}
		});
	}

	/**
	 * @internal
	 */
	private _clearErrorAnnouncement() {
		this._errorAnnouncement = '';
		this._forceAnnouncementToggle = false;
	}
}
