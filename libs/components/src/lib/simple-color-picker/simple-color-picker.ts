import { attr, DOM, nullableNumberConverter } from '@microsoft/fast-element';
import type { Placement } from '@floating-ui/dom';
import { Anchored } from '../../shared/patterns/anchored';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';
import { BaseColorPicker } from '../../shared/color-picker';

/**
 * @public
 * @component simple-color-picker
 * @slot anchor - Slot for attaching the toggle button
 * @event {CustomEvent<undefined>} change - Fires when the value changes
 * @vueModel modelValue value input `event.currentTarget.value`
 */
export class SimpleColorPicker extends Anchored(BaseColorPicker(VividElement)) {
	/**
	 * @internal
	 */
	openChanged(): void {
		this._updateListeners();

		if (this._anchorEl) {
			this.#updateAnchor(this._anchorEl);
		}

		if (this.open) {
			this._refreshCanvasColor();
			requestAnimationFrame(() => {
				const selectedIndex = this.swatches.findIndex(
					(swatch) => swatch.value === this.value
				);
				const targetIndex = selectedIndex >= 0 ? selectedIndex : 0;
				this._focusSwatchByIndex(targetIndex);
			});
		}
	}

	/**
	 * Placement of the popup with color swatches
	 *
	 * @public
	 * HTML Attribute: placement
	 */
	@attr({ mode: 'fromView' }) placement?: Placement = 'top-start';

	/**
	 * Number of swatches per row for grid layout
	 * @public
	 * @remarks
	 * HTML Attribute: swatches-per-row
	 */
	@attr({
		attribute: 'swatches-per-row',
		mode: 'fromView',
		converter: nullableNumberConverter,
	})
	swatchesPerRow: number = 7;

	/**
	 * @internal
	 */
	override _getRowLength(): number {
		return this.swatchesPerRow;
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this._updateListeners();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this._updateListeners();
	}

	/**
	 * @internal
	 */
	protected _updateListeners() {
		document.removeEventListener('click', this._closeOnClickOutside);
		document.removeEventListener('keydown', this._closeOnEscape);
		if (this.open && this.isConnected) {
			document.addEventListener('click', this._closeOnClickOutside);
			document.addEventListener('keydown', this._closeOnEscape);
		}
	}

	/**
	 * @internal
	 */
	protected override _getFocusReturnEl(): HTMLElement | null {
		return this._anchorEl ?? null;
	}

	/**
	 * @internal
	 */
	_anchorElChanged(oldValue?: HTMLElement, newValue?: HTMLElement): void {
		if (oldValue) this.#cleanupAnchor(oldValue);
		if (newValue) this.#setupAnchor(newValue);
	}

	/**
	 * @internal
	 */
	#updateAnchor(a: HTMLElement) {
		a.setAttribute('aria-expanded', this.open.toString());
		a.setAttribute('data-expanded', this.open.toString());
	}

	/**
	 * @internal
	 */
	#setupAnchor(a: HTMLElement) {
		this.#updateAnchor(a);
		a.addEventListener('click', this.#openPopup, true);
		a.addEventListener('keydown', this.#handleAnchorKeydown);
		a.setAttribute('aria-haspopup', 'true');
	}

	/**
	 * @internal
	 */
	#cleanupAnchor(a: HTMLElement) {
		a.removeEventListener('click', this.#openPopup, true);
		a.removeEventListener('keydown', this.#handleAnchorKeydown);
		a.removeAttribute('aria-expanded');
		a.removeAttribute('data-expanded');
		a.removeAttribute('aria-haspopup');
	}

	/**
	 * @internal
	 */
	#openPopup = () => {
		// DOM.queueUpdate() prevents click event from being caught by document listener
		if (!this.open) DOM.queueUpdate(() => (this.open = true));
	};

	/**
	 * @internal
	 */
	#handleAnchorKeydown = (event: KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			if (!this.open) {
				DOM.queueUpdate(() => (this.open = true));
			}
			event.preventDefault();
		}
	};

	/**
	 * @internal
	 */
	_closeOnClickOutside = (e: Event) => {
		const clickedOutside = !this.contains(e.target as Node);
		const clickedOnAnchor = this._anchorEl?.contains(e.target as Node);
		if (clickedOutside || clickedOnAnchor) this.open = false;
	};

	/**
	 * @internal
	 */
	_closeOnEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			this.open = false;
		}
	};
}
