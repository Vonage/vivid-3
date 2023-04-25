import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import { arrow, autoUpdate, computePosition, flip, hide, inline, offset } from '@floating-ui/dom';
import type { Placement, Strategy } from '@floating-ui/dom';

/**
 * Base class for popup
 *
 * @public
 * @slot - Default slot.
 */
export class Popup extends FoundationElement {
	get #arrowPosition(): any { return { top: 'bottom', right: 'left', bottom: 'top', left: 'right' }; }
	get #padding(): number { return 0; }
	get #distance(): number { return 12; }
	get #middleware(): Array<any> {
		const middleware = [flip(), hide(), inline()];
		if (this.arrow) { middleware.push(arrow({ element: this.arrowEl, padding: this.#padding }), offset(this.#distance)); }
		return middleware;
	}

	#cleanup?: () => void; // cleans the autoupdate

	protected anchorEl: Element | null | undefined;

	popupEl!: HTMLElement;

	arrowEl!: HTMLElement;

	/**
	 * indicates whether the popup is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({
		mode: 'boolean',
	}) open = false;
	openChanged(_: boolean, newValue: boolean): void {
		newValue ? this.$emit('open') : this.$emit('close');
	}

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
	 * HTML Attribute: placement
	 */
	@attr({ mode: 'fromView' }) placement?: Placement;

	/**
	 * the strategy of the popup
	 *
	 * @public
	 * HTML Attribute: strategy
	 */
	@attr({ mode: 'fromView' }) strategy?: Strategy = 'fixed';

	/**
	 * ID reference to element in the popup’s owner document or HTMLElement.
	 *
	 * @public
	 * HTML Attribute: anchor
	 */
	@attr anchor!: string | HTMLElement;

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#cleanup?.();
	}

	override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		super.attributeChangedCallback(name, oldValue, newValue);
		switch (name) {
			case 'anchor': {
				this.anchorEl = this.#getAnchor();
				break;
			}
			case 'open': {
				this.open ? this.show() : this.hide();
				break;
			}
		}
		if (this.anchorEl && this.popupEl) {
			this.#cleanup = autoUpdate(this.anchorEl, this.popupEl, () => this.updatePosition());
		}
		else {
			this.#cleanup?.();
		}
	}

	/**
	 * Updates popup's position
	 *
	 * @public
	 */
	async updatePosition() {
		if (!this.open || !this.anchorEl) {
			return;
		}

		const positionData = await computePosition(this.anchorEl, this.popupEl, {
			placement: this.placement,
			strategy: this.strategy,
			middleware: this.#middleware
		});
		this.#assignPopupPosition(positionData);
		if (this.arrow) { this.#assignArrowPosition(positionData); }
	}

	#assignPopupPosition(data: any): void {
		const { x: popupX, y: popupY } = data;
		const { referenceHidden } = data.middlewareData.hide;
		Object.assign(this.popupEl.style, {
			left: `${popupX}px`,
			top: `${popupY}px`,
			visibility: referenceHidden ? 'hidden' : 'visible',
		});
	}

	#assignArrowPosition(data: any): void {
		const { x: arrowX, y: arrowY } = data.middlewareData.arrow;
		const side: string = this.#arrowPosition[data.placement.split('-')[0]];
		Object.assign(this.arrowEl.style, {
			left: `${arrowX}px`,
			top: `${arrowY}px`,
			[this.#arrowPosition[side]]: '',
			[side]: '-4px',
		});
	}

	/**
	 * Gets the anchor element by id
	 */
	#getAnchor(): HTMLElement | null {
		return this.anchor instanceof HTMLElement ? this.anchor : document.getElementById(this.anchor);
	}

	show(): void {
		this.open = true;
	}

	hide(): void {
		this.open = false;
	}
}
