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

	/**
	 * reverse the color scheme
	 *
	 * @public
	 * HTML Attribute: alternate
	 */
	@attr({
		mode: 'boolean',
	}) alternate = false;

	/**
	 * /end of attributes
	 */

	button!: HTMLButtonElement;
	popup!: Popup;

	override connectedCallback() {
		super.connectedCallback();

		this.popup.anchor = this.button;
		
		this.button.addEventListener('keydown', this.closeOnEsc);
		this.popup.addEventListener('keydown', this.closeOnEsc);

		this.popup.addEventListener('open', this.openClose);
		this.popup.addEventListener('close', this.openClose);

		// quick'n'dirty light dismiss waiting for https://github.com/Vonage/vivid-3/pull/765
		document.addEventListener('click', (e) => {
			if (this.popup.open && !this.contains(e.target as HTMLElement)) {
				this.popup.open = false;
			}
		});

		this.button.addEventListener('click', () => this.popup.open = true);
	}

	closeOnEsc = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			this.popup.open = false;
		}
	};

	openClose = () => {
		this.ariaExpanded = this.popup.open.toString();
		if (this.popup.open)
			this.popup.setAttribute('role', 'status');
		else
			this.popup.removeAttribute('role');
		
	}
}
