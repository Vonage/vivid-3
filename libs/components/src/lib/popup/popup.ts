import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import { arrow, autoUpdate, computePosition, flip, hide, inline, offset } from '@floating-ui/dom';
import type { Corner, Position } from '../enums.js';

type PopupPosition = Extract<Position, Position.Fixed | Position.Absolute>;
type PopupCorner = Extract<Corner, Corner.Bottom | Corner.BottomEnd | Corner.BottomStart | Corner.Left | Corner.LeftEnd | Corner.LeftStart
	| Corner.Right | Corner.RightEnd | Corner.RightStart | Corner.Top | Corner.TopEnd | Corner.TopStart>;

/**
 * Base class for popup
 *
 * @public
 */
export class Popup extends FoundationElement {
	private get PADDING(): number { return 0; }
	private get DISTANCE(): number { return 12; }

	popupEl!: HTMLElement;
	arrowEl!: HTMLElement;

	private get middleware(): Array<any> {
		const middleware = [flip(), hide(), inline()];
		if (this.arrow) { middleware.push(arrow({ element: this.arrowEl, padding: this.PADDING }), offset(this.DISTANCE)); }
		return middleware;
	}

	/**
	 * indicates whether the popup is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({
		mode: 'boolean',
	}) open = false;

	/**
	 * adds close button to the popup
	 *
	 * @public
	 * HTML Attribute: dismissible
	 */
	@attr({
		mode: 'boolean',
	}) dismissible = false;

	/**
	 * adds small triangle to indicate the trigger element
	 *
	 * @public
	 * HTML Attribute: arrow
	 */
	@attr({
		mode: 'boolean',
	}) arrow = false;

	/**
	 * set the color-scheme to dark
	 *
	 * @public
	 * HTML Attribute: alternate
	 */
	@attr({
		mode: 'boolean',
	}) alternate = false;

	/**
	 * the placement of the popup
	 *
	 * @public
	 * HTML Attribute: corner
	 */
	@attr corner?: PopupCorner;

	/**
	 * strategy - the position of the popup
	 *
	 * @public
	 * HTML Attribute: strategy
	 */
	@attr strategy?: PopupPosition;

	/**
	 * ID reference to element in the popup’s owner document.
	 *
	 * @public
	 * HTML Attribute: anchor
	 */
	@attr anchor: string = '';

	/**
	 * popup's anchor element
	 *
	 * @private
	 */
	@attr private anchorEl: Element | null | undefined;

	constructor() {
		super();
		this.corner = 'left' as PopupCorner;
		this.strategy = 'fixed' as PopupPosition;
	}

	override connectedCallback(): void {
		super.connectedCallback();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
	}

	override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		super.attributeChangedCallback(name, oldValue, newValue);
		switch (name) {
			case 'anchor': {
				this.anchorEl = this.getAnchorById();
				break;
			}
		}
		if (this.anchorEl && this.popupEl) {
			autoUpdate(this.anchorEl, this.popupEl, () => this.updatePosition());
		}
	}

	/**
	 * Updates popup position, if succeeded returns - true, if not - false
	 *
	 * @public
	 */
	async updatePosition() {
		if (!this.open || !this.anchorEl) {
			return;
		}

		const positionData = await computePosition(this.anchorEl, this.popupEl, {
			placement: this.corner,
			strategy: this.strategy,
			middleware: this.middleware
		});
		this.assignPopupPosition(positionData);
		if (this.arrow) { this.assignArrowPosition(positionData); }
	}

	/**
	 * Opens the popup
	 *
	 * @public
	 */
	show(): void {
		if (this.anchorEl) { // only if anchor element exists
			this.open = true;
		}
	}

	/**
	 * Closes the popup
	 *
	 * @public
	 */
	hide(): void {
		this.open = false;
	}

	handleDismissClick(): void {
		this.hide();
	}

	private assignPopupPosition(data: any): void {
		const { x: popupX, y: popupY } = data;
		const { referenceHidden } = data.middlewareData.hide;
		Object.assign(this.popupEl.style, {
			left: `${popupX}px`,
			top: `${popupY}px`,
			visibility: referenceHidden ? 'hidden' : 'visible',
		});
	}

	private assignArrowPosition(data: any): void {
		const { x: arrowX, y: arrowY } = data.middlewareData.arrow;
		const staticSide: any = { top: 'bottom', right: 'left', bottom: 'top', left: 'right' };
		const side: string = staticSide[data.placement.split('-')[0]];
		Object.assign(this.arrowEl.style, {
			left: arrowX != null ? `${arrowX}px` : '',
			top: arrowY != null ? `${arrowY}px` : '',
			right: '',
			bottom: '',
			[side]: '-4px',
		});
	}

	/**
	 * Gets the anchor element by id
	 */
	private getAnchorById(): HTMLElement | null {
		return document.getElementById(this.anchor);
	}
}
