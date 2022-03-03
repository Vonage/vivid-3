import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import { arrow, computePosition, flip, offset, shift } from '@floating-ui/dom';
import type { Padding, Placement, Strategy } from '@floating-ui/core';
import { Corner, Position } from '../enums.js';

/**
 * Base class for popup
 *
 * @public
 */
export class Popup extends FoundationElement {
	private get PADDING(): Padding { return 0; }
	private get DISTANCE(): number { return 12; }

	private onResizeWindow = this.updatePosition.bind(this);

	/**
     * @internal
     */
	public popupEl!: HTMLElement;
	/**
     * @internal
     */
	public arrowEl!: HTMLElement;

	private get middleware(): Array<any> {
		return (
			this.arrow ? [flip(), shift({ padding: this.PADDING }),
				arrow({ element: this.arrowEl, padding: this.PADDING }), offset(this.DISTANCE)]
				: [flip(), shift({ padding: this.PADDING })]);
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
	@attr corner: Placement = Corner.Left;

	/**
	 * strategy - the position of the popup
	 *
	 * @public
	 * HTML Attribute: strategy
	 */
	@attr strategy: Strategy = Position.Fixed;

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

	override connectedCallback(): void {
		super.connectedCallback();
		window.addEventListener('scroll', this.updatePosition);
		window.addEventListener('resize', this.onResizeWindow);
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		window.removeEventListener('scroll', this.updatePosition);
		window.removeEventListener('resize', this.onResizeWindow);
		// Disconnect the observer to stop from running in the background
		this.sizeObserver?.disconnect();
	}

	override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		super.attributeChangedCallback(name, oldValue, newValue);
		switch (name) {
			case 'anchor': {
				this.sizeObserver?.disconnect();
				this.anchorEl = this.getAnchorById();
				if (this.anchorEl) this.sizeObserver.observe(this.anchorEl);
				break;
			}
		}
		this.updatePosition();
	}

	/**
	 * Updates popup position, if succeeded returns - true, if not - false
	 *
	 * @public
	 */
	async updatePosition() {
		if (!this.open) {
			return;
		}
		if (!this.anchorEl || this.anchorEl === undefined) {
			return;
		}
		if (!this.popupEl || this.popupEl === undefined) {
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
		Object.assign(this.popupEl.style, {
			left: `${popupX}px`,
			top: `${popupY}px`,
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

	private sizeObserver = new ResizeObserver(() => {
		return this.updatePosition();
	});

	/**
	 * Gets the anchor element by id
	 */
	private getAnchorById(): HTMLElement | null {
		return document.getElementById(this.anchor);
	}
}
