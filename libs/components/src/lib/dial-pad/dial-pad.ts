import { applyMixins, FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import {
	Localized
} from '../../shared/patterns';
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
 * 
 */

export class DialPad extends FoundationElement {
	@attr({ attribute: 'input-aria-label' }) inputAriaLabel: string | null = null;
	@attr({ attribute: 'delete-button-aria-label' }) deleteButtonAriaLabel: string | null = null;
	@attr({ attribute: 'call-button-label' }) callButtonLabel: string | null = null;
	@attr({ attribute: 'end-call-button-label' }) endCallButtonLabel: string | null = null;
	@attr({ attribute: 'digit-one-aria-label' }) digitOneAriaLabel: string | null = null;
	@attr({ attribute: 'digit-two-aria-label' }) digitTwoAriaLabel: string | null = null;
	@attr({ attribute: 'digit-three-aria-label' }) digitThreeAriaLabel: string | null = null;
	@attr({ attribute: 'digit-four-aria-label' }) digitFourAriaLabel: string | null = null;
	@attr({ attribute: 'digit-five-aria-label' }) digitFiveAriaLabel: string | null = null;
	@attr({ attribute: 'digit-six-aria-label' }) digitSixAriaLabel: string | null = null;
	@attr({ attribute: 'digit-seven-aria-label' }) digitSevenAriaLabel: string | null = null;
	@attr({ attribute: 'digit-eight-aria-label' }) digitEightAriaLabel: string | null = null;
	@attr({ attribute: 'digit-nine-aria-label' }) digitNineAriaLabel: string | null = null;
	@attr({ attribute: 'digit-asterisk-aria-label' }) digitAsteriskAriaLabel: string | null = null;
	@attr({ attribute: 'digit-zero-aria-label' }) digitZeroAriaLabel: string | null = null;
	@attr({ attribute: 'digit-hashtag-aria-label' }) digitHashtagAriaLabel: string | null = null;

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
	@attr({ mode: 'fromView' }) value: string = '';
	valueChanged(_oldValue: string, newValue: string) {
		if (newValue !== undefined && newValue !== null &&
			this._textFieldEl && newValue !== this._textFieldEl.value) {
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
	@attr({ mode: 'fromView' }) pattern: string = '^[0-9#*]*$';

	/**
	 * Indicates the disabled state of the dial-pad.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	@attr({ mode: 'boolean' }) disabled = false;

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
	 *
	 * @internal
	 */
	_onDigit = (e: Event) => {
		if (e.target === undefined || e.target === null || !(e.target instanceof Button)) {
			return;
		}
		this.value += e.target.value;
		this.$emit('keypad-click', e.target.value);
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

export interface DialPad extends Localized { }
applyMixins(DialPad, Localized);
