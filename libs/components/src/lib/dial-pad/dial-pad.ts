import { attr, observable } from '@microsoft/fast-element';
import { Localized } from '../../shared/patterns';
import { TextField } from '../text-field/text-field';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import type { Button } from '../button/button';

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
	 * Indicates the helper-text's text.
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
	 * Indicates the value's text.
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
	 * Indicates the dial pad's pattern.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: pattern
	 */
	@attr({ mode: 'fromView' }) pattern = '^[0-9#*]*$';

	/**
	 * Indicates the disabled state of the dial-pad.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	@attr({ mode: 'boolean' }) disabled = false;

	/**
	 * Indicates the pending state of the dial-pad.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: pending
	 */
	@attr({ mode: 'boolean' }) pending = false;

	/**
	 * Indicates the active state of the dial-pad.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: call-active
	 */
	@attr({ attribute: 'call-active', mode: 'boolean' }) callActive = false;

	/**
	 * Indicates the no-call state of the dial-pad.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: no-call
	 */
	@attr({ mode: 'boolean', attribute: 'no-call' }) noCall = false;

	/**
	 * Indicates the no-input state of the dial-pad.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: no-input
	 */
	@attr({ mode: 'boolean', attribute: 'no-input' }) noInput = false;

	/**
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: end-call-button-label
	 */
	@attr({ attribute: 'end-call-button-label' }) endCallButtonLabel:
		| string
		| null = null;

	/**
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
	_endLongPress() {
		this._clearLongPressTimer();
		// Don't reset suppress flag here - let the click handler reset it
		// This ensures the click event can check the flag and suppress if needed
		// If click doesn't fire, the flag will be reset on the next click
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
	 * Indicates that this element should get focus after the page finishes loading.
	 * @public
	 * @remarks
	 * HTML Attribute: autofocus
	 */
	@attr({ mode: 'boolean' })
	override autofocus = false;

	/**
	 * Moves focus into the diapl-pad.
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
