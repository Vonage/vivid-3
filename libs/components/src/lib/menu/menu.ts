import { attr } from '@microsoft/fast-element';
import { Menu as FastMenu } from '@microsoft/fast-foundation';
import type { Placement } from '@floating-ui/dom';
// import { isHTMLElement } from '@microsoft/fast-web-utilities';

/**
 * Base class for menu
 *
 * @public
 */
export class Menu extends FastMenu {

	// constructor() {
	// 	super();
	// 	this['isMenuItemElement'] = (el: Element): el is HTMLElement =>  (
	// 		isHTMLElement(el) &&
	// 		roleForMenuItem.hasOwnProperty(
	// 			el.shadowRoot?.firstElementChild?.getAttribute('role') as string
	// 		)
	// 	);
	// }

	/**
	 * indicates whether the menu is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({
		mode: 'boolean',
	}) open = false;

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
}
