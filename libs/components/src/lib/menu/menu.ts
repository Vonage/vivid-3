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
	 * indicates whether the menu can be light dismissed
	 *
	 * @public
	 * HTML Attribute: lightDismiss
	 */
	@attr({
		mode: 'boolean',
	}) lightDismiss?= false;

	/**
	 * ID reference to element in the menu's owner document.
	 *
	 * @public
	 * HTML Attribute: anchor
	 */
	@attr anchor?: string;

	popupOpenChanged = () => {
		this.open = (this._popup as Popup).open;
	};
}
