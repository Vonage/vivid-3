import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import type { Popup } from '../popup/popup';
import type { ButtonConnotation, ButtonAppearance, ButtonSize, ButtonShape } from '../button/button';
import type { Placement } from '@floating-ui/dom';

/**
 * Base class for toggletip
 *
 * @public
 */
export class Toggletip extends FoundationElement {
	/**
	 * Indicates whether the toggletip is disabled or not
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	 @attr({
		mode: 'boolean'
	}) disabled = false;

	/**
	 * The connotation the toggletip's button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: connotation
	 */
	@attr connotation?: ButtonConnotation;

	/**
	 * The appearance the toggletip's button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: appearance
	 */
	 @attr appearance?: ButtonAppearance;

	/**
	 * The size the toggletip's button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: size
	 */
	 @attr size?: ButtonSize;

	/**
	 * The shape the button should have.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: shape
	 */
	 @attr shape?: ButtonShape;

	/**
	* A decorative icon the custom element should have.
	*
	* @public
	* @remarks
	* HTML Attribute: icon
	*/
	@attr icon?: string;

	/**
	 * the placement of the popup
	 *
	 * @public
	 * HTML Attribute: placement
	 */
	 @attr placement?: Placement;

	button!: HTMLButtonElement;
	popup!: Popup;

	override connectedCallback() {
		super.connectedCallback();

		this.popup.anchorEl = this.button;
		this.popup.anchorEl.addEventListener('keydown', this.popup.handleKeydown);

		// quick'n'dirty light dismiss
		document.addEventListener('click', (e) => {
			if (this.popup.open && !this.contains(e.target as HTMLElement)) {
				this.popup.open = false;
			}
		});

		this.button.addEventListener('click', () => this.popup.open = true);
	}

}
