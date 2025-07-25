import { attr } from '@microsoft/fast-element';
import type { Placement } from '@floating-ui/dom';
import { Anchored } from '../../shared/patterns/anchored';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/**
 * @public
 * @component tooltip
 * @slot anchor - Used to set the anchor element for the tooltip.
 */
export class Tooltip extends Anchored(VividElement) {
	/**
	 * the text of the tooltip
	 * accepts string
	 *
	 * @public
	 */
	@attr text?: string;

	@attr({ mode: 'fromView' }) placement?: Placement;

	@attr({ mode: 'boolean' }) open = false;

	override connectedCallback(): void {
		super.connectedCallback();
		this.#updateListeners();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#updateListeners();
	}

	/**
	 * @internal
	 */
	_anchorElChanged(oldValue?: HTMLElement, newValue?: HTMLElement): void {
		if (oldValue) this.#cleanupAnchor(oldValue);
		if (newValue) this.#setupAnchor(newValue);
	}

	#setupAnchor(a: HTMLElement) {
		a.addEventListener('mouseover', this.#show);
		a.addEventListener('mouseout', this.#hide);
		a.addEventListener('focusin', this.#show);
		a.addEventListener('focusout', this.#hide);
		a.setAttribute('aria-haspopup', 'true');
		a.setAttribute('aria-expanded', String(this.open));
	}

	#cleanupAnchor(a: HTMLElement) {
		a.removeEventListener('mouseover', this.#show);
		a.removeEventListener('mouseout', this.#hide);
		a.removeEventListener('focusin', this.#show);
		a.removeEventListener('focusout', this.#hide);
		a.removeAttribute('aria-haspopup');
		a.removeAttribute('aria-expanded');
	}

	#show = () => {
		this.open = true;
		this.#updateAnchorExpanded();
	};

	#hide = () => {
		this.open = false;
		this.#updateAnchorExpanded();
	};

	#updateAnchorExpanded() {
		if (this._anchorEl) {
			this._anchorEl.setAttribute('aria-expanded', String(this.open));
		}
	}

	#updateListeners() {
		document.removeEventListener('keydown', this.#closeOnEscape);
		if (this.open && this.isConnected) {
			document.addEventListener('keydown', this.#closeOnEscape);
		}
	}

	#closeOnEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') this.#hide();
	};

	/**
	 * @internal
	 */
	openChanged(oldValue?: boolean): void {
		if (oldValue === undefined) return;

		this.#updateListeners();
	}
}
