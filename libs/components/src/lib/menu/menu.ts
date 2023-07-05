import { attr } from '@microsoft/fast-element';
import { Menu as FastMenu } from '@microsoft/fast-foundation';
import type { Placement } from '@floating-ui/dom';
import type { Popup } from '../popup/popup';


/**
 * Base class for menu
 *
 * @public
 * @slot - Default slot.
 */
export class Menu extends FastMenu {
	#dismissOnClickOutside = (e: MouseEvent) => {
		const popup = (this._popup as Popup);
		if (popup.open && !this.contains(e.target as HTMLElement)) {
			popup.open = false;
		}
	};

	_popup?: Popup;

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

	/**
	 * indicates whether the menu will automatically close when
	 * the user clicks outside the menu
	 *
	 * @public
	 * HTML Attribute: auto-dismiss
	 */
	@attr({
		mode: 'boolean',
		attribute: 'auto-dismiss'
	}) autoDismiss = false;

	anchorChanged(prevAnchor: string, newAnchor: string ) {
		const prevAnchorEl = document.getElementById(prevAnchor);
		const newAnchorEl = document.getElementById(newAnchor);
		prevAnchorEl?.removeAttribute('aria-haspopup');
		newAnchorEl?.setAttribute('aria-haspopup', 'menu');
	}

	popupOpenChanged = () => {
		this.open = (this._popup as Popup).open;
	};

	autoDismissChanged() {
		if (this.autoDismiss) {
			document.addEventListener('click', this.#dismissOnClickOutside);
		} else {
			document.removeEventListener('click', this.#dismissOnClickOutside);
		}
	}

	override disconnectedCallback() {
		super.disconnectedCallback();

		if (this.autoDismiss) {
			document.removeEventListener('click', this.#dismissOnClickOutside);
		}
	}
}
