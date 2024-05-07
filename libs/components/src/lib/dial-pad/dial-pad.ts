import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { Localized } from '../../shared/patterns';
import { TextField } from '../text-field/text-field';
import { Button } from '../button/button';

/**
 * Base class for dial-pad
 *
 * @public
 * @component dial-pad
 * @event change - Emitted when the text field value changes
 * @event input - Emitted when the text field value changes
 * @event blur - Emitted when the text field loses focus
 * @event focus - Emitted when the text field receives focus
 * @event keypad-click - Emitted when a digit button is clicked
 * @event dial - Emitted when the call button is clicked
 * @event end-call - Emitted when the end call button is clicked
 * @vueModel modelValue value input `(event.target as any).value`
 *
 */

export class DialPad extends FoundationElement {
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
	 *
	 * @internal
	 */
	_onDigit = (e: Event) => {
		this.value += (e.currentTarget as Button).value;

		this.$emit('keypad-click', e.currentTarget);
		this.$emit('input');
		this.$emit('change');
	};

	/**
	 *
	 * @internal
	 */
	_onDial = () => {
		this.callActive ? this.$emit('end-call') : this.$emit('dial');
	};

	/**
	 *
	 * @internal
	 */
	_deleteLastCharacter = () => {
		this.value = this.value.slice(0, -1);
	};

	/**
	 *
	 * @internal
	 */
	_handleInput = () => {
		this.value = this._textFieldEl.value;
		this.$emit('input');
	};

	/**
	 *
	 * @internal
	 */
	_handleChange = () => {
		this.value = this._textFieldEl.value;
		this.$emit('change');
	};

	/**
	 *
	 * @internal
	 */
	_handleFocus = () => {
		this.$emit('focus');
	};

	/**
	 *
	 * @internal
	 */
	_handleBlur = () => {
		this.$emit('blur');
	};
}

export interface DialPad extends Localized {}
applyMixins(DialPad, Localized);
