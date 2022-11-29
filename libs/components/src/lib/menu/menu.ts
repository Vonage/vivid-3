import { attr } from '@microsoft/fast-element';
import { Menu as FastMenu } from '@microsoft/fast-foundation';
import type { Placement } from '@floating-ui/dom';
import type { Popup } from '../popup/popup';


/**
 * Base class for menu
 *
 * 
 */
export class Menu extends FastMenu {
	_popup?: Popup;

	/**
	 * indicates whether the menu is open
	 *
	 * 
	 * HTML Attribute: open
	 */
	@attr({
		mode: 'boolean',
	}) open? = false;

	/**
	 * the placement of the menu
	 *
	 * 
	 * HTML Attribute: placement
	 */
	@attr placement?: Placement;

	/**
	 * ID reference to element in the menu's owner document.
	 *
	 * 
	 * HTML Attribute: anchor
	 */
	@attr anchor?: string;

	popupOpenChanged = () => {
		this.open = (this._popup as Popup).open;
	};
}
