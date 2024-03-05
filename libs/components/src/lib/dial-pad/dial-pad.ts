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
	@attr value: string | null = null;

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

	/**
	 * @internal
	 */
	_textFieldEl!: TextField;

	/**
	 * @internal
	 */
	onDigit = (e: Event) => {
		if (e.target === undefined || e.target === null || !(e.target instanceof Button)) {
			return;
		}
		this._textFieldEl.value += e.target.value;
		this._textFieldEl.reportValidity();
	};

	clearField = () => {
		this._textFieldEl.value = '';
	};
}
