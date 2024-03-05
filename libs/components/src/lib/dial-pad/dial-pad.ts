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
	 * Indicates the disabled state of the dial-pad.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	@attr({ mode: 'boolean' }) disabled = false;

	/**
	 * @internal
	 */
	_textFieldEl!: TextField;

	/**
	 * @internal
	 */
	onDigit = (e: Event) => {
		if (e.target === undefined || e.target === null || !(e.target instanceof Button)){
			return;
		}
		this._textFieldEl.value += e.target.value;
	};
}
