import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { TextField } from '../text-field/text-field';
import { Button } from '../button/button';

/**
 * Base class for dial-pad
 *
 * @public
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
	@attr({ mode: 'fromView' }) value: string = '';
	onValueChange(_oldValue: string, newValue: string) {
		this._textFieldEl.value = newValue;
		this._textFieldEl?.reportValidity();
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
	 * HTML Attribute: active
	 */
	@attr({ mode: 'boolean' }) active = false;

	/**
	 * Indicates the no-call state of the dial-pad.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: no-call
	 */
	@attr({ mode: 'boolean', attribute: 'no-call' }) noCall = false;

	override connectedCallback() {
		super.connectedCallback();
		this._textFieldEl.addEventListener('input', this.handleInput);
		this._textFieldEl.addEventListener('change', this.handleInput);
	}

	override disconnectedCallback() {
		super.disconnectedCallback();
		this._textFieldEl.removeEventListener('input', this.handleInput);
		this._textFieldEl.removeEventListener('change', this.handleInput);
	}

	/**
	 *
	 * @internal
	 */
	onDigit = (e: Event) => {
		if (e.target === undefined || e.target === null || !(e.target instanceof Button)) {
			return;
		}
		this.value += e.target.value;
		this.$emit('keypad-click', e.target.value);
	};

	/**
	 *
	 * @internal
	 */
	clearField = () => {
		this.value = '';
	};

	/**
	 *
	 * @internal
	 */
	handleInput = () => {
		this.value = this._textFieldEl.value;
	};
}
