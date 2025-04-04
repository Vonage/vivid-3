import { attr } from '@microsoft/fast-element';
import { Localized } from '../../shared/patterns';
import { TextField } from '../text-field/text-field';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

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
	 *
	 * @internal
	 */
	_onDial = () => {
		this.callActive ? this.$emit('end-call') : this.$emit('dial');
	};
}
