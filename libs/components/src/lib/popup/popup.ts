import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import { arrow, autoUpdate, computePosition, flip, hide, inline, offset } from '@floating-ui/dom';
import type { Placement, Strategy } from '@floating-ui/dom';
import { keyEscape } from '@microsoft/fast-web-utilities';

/**
 * Base class for popup
 *
 * 
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
	 * 
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
	 * 
	 * HTML Attribute: dismissible
	 */
	@attr({
		mode: 'boolean',
	}) dismissible = false;

	/**
	 * adds small triangle to indicate the trigger element
	 *
	 * 
	 * HTML Attribute: arrow
	 */
	@attr({
		mode: 'boolean',
	}) arrow = false;

	/**
	 * set the color-scheme to dark
	 *
	 * 
	 * HTML Attribute: alternate
	 */
	@attr({
		mode: 'boolean',
	}) alternate = false;

	/**
	 * the placement of the popup
	 *
	 * 
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
	 * 
	 * HTML Attribute: anchor
	 */
	@attr anchor!: string | HTMLElement;

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.anchorEl?.removeEventListener('keydown', this.#handleKeydown);
		this.#cleanup?.();
	}

	override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		super.attributeChangedCallback(name, oldValue, newValue);
		switch (name) {
			case 'anchor': {
				this.anchorEl?.removeEventListener('keydown', this.#handleKeydown);
				this.anchorEl = this.#getAnchor();
				// close the popup if pressed escape
				this.anchorEl?.addEventListener('keydown', this.#handleKeydown);
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
	 * 
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
			right: '',
			bottom: '',
			[side]: '-4px',
		});
	}

	/**
	 * Gets the anchor element by id
	 * 
	 * @returns HTMLElement - anchor
	 */
	#getAnchor(): HTMLElement | null {
		return this.anchor instanceof HTMLElement ? this.anchor : document.getElementById(this.anchor);
	}

	#handleKeydown = (event: Event) => {
		if ((event as KeyboardEvent).key === keyEscape) {
			this.open = false;
		}
	};
}
