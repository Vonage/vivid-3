import { attr } from '@microsoft/fast-element';
import { Menu as FastMenu } from '@microsoft/fast-foundation';
import type { Placement } from '@floating-ui/dom';
import type { Popup } from '../popup/popup';


/**
 * Base class for menu
 *
 * @public
 */
export class Menu extends FastMenu {
	_popup?: Popup;

	/**
	 * indicates whether the menu is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({
		mode: 'boolean',
	}) open? = false;

	/**
	 * the placement of the menu
	 *
	 * @public
	 * HTML Attribute: placement
	 */
	@attr placement?: Placement;

	/**
	 * ID reference to element in the menu's owner document.
	 *
	 * @public
	 * HTML Attribute: anchor
	 */
	@attr anchor?: string;

	override connectedCallback() {
		super.connectedCallback();
		this._popup?.addEventListener('open-changed', this.handlePopupOpenChanged);
	}

	handlePopupOpenChanged = () => {
		if (this._popup?.open && this._popup.open != this.open) {
			this.open = this._popup.open;
		}
	};
}
