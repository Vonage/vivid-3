import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for dialog
 *
 * @public
 */
export class Dialog extends FoundationElement {
	/**
	 * Indicates dialog's state
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: open
	 */
	@attr({mode: 'boolean'}) open = false;
	@attr({mode: 'boolean'}) stacked = false;
	@attr({attribute: 'return-value'}) returnValue?: string;
	@attr icon?: string;
	@attr content?: string;
	@attr heading?: string;

	close() {
		if (!this.open) {
			return;
		}
		this.open = false;
		this.dispatchEvent(new CustomEvent('close', {bubbles: true, composed: true, detail: this.returnValue}));
	}

	show() {
		this.open = true;
	}
}
