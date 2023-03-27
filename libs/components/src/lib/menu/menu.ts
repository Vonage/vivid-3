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

	anchorChanged(prevAnchor: string, newAnchor: string ) {
		const prevAnchorEl = document.getElementById(prevAnchor);
		const newAnchorEl = document.getElementById(newAnchor);
		prevAnchorEl?.removeAttribute('aria-haspopup');
		newAnchorEl?.setAttribute('aria-haspopup', 'menu');
	}

	popupOpenChanged = () => {
		this.open = (this._popup as Popup).open;
	};
}
