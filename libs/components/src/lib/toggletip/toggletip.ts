import { attr, DOM } from '@microsoft/fast-element';
import type { Placement } from '@floating-ui/dom';
import { type Anchored, anchored } from '../../shared/patterns/anchored';
import { VividElement } from '../../shared/foundation/vivid-element/vivid-element';

/**
 * @public
 * @component toggletip
 * @slot - The content to display in the toggletip.
 * @slot anchor - Used to set the anchor element for the toggletip.
 * @slot action-items - The content to display in the toggletip action items.
 */
@anchored
export class Toggletip extends VividElement {
	#ANCHOR_ARIA_LABEL_SUFFIX = ' ; Show more information';

	/**
	 * the optional title of the toggletip
	 *
	 * @public
	 * HTML Attribute: headline
	 */

	@attr headline?: string;

	/**
	 * toggle color scheme
	 *
	 * @public
	 * HTML Attribute: alternate
	 */
	@attr({ mode: 'boolean' }) alternate = false;

	/**
	 * placement of the toggletip
	 *
	 * @public
	 * HTML Attribute: placement
	 */
	@attr({ mode: 'fromView' }) placement?: Placement = 'right';

	/**
	 * indicates whether the toggletip is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;
	openChanged(oldValue: boolean, newValue: boolean): void {
		if (oldValue === undefined) return;

		if (newValue) {
			this.setAttribute('role', 'status');
		} else {
			this.removeAttribute('role');
		}

		this.#updateListeners();

		if (this._anchorEl) {
			this.#updateAnchor(this._anchorEl);
		}
	}

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
		a.addEventListener('click', this.#openIfClosed, true);
		a.ariaLabel = (a.ariaLabel ?? '') + this.#ANCHOR_ARIA_LABEL_SUFFIX;
		this.#updateAnchor(a);
		// TODO aria-controls="myid"
	}

	#updateAnchor(a: HTMLElement) {
		a.setAttribute('aria-expanded', this.open.toString());
	}

	#cleanupAnchor(a: HTMLElement) {
		a.removeEventListener('click', this.#openIfClosed, true);
		if (a.ariaLabel)
			a.ariaLabel = a.ariaLabel.replace(this.#ANCHOR_ARIA_LABEL_SUFFIX, '');
	}

	#openIfClosed = () => {
		// DOM.queueUpdate() is required to prevent the click event from
		// being caught by the document click handler (added by openChanged)
		if (!this.open) DOM.queueUpdate(() => (this.open = true));
	};

	#updateListeners() {
		document.removeEventListener('click', this.#closeOnClickOutside);
		document.removeEventListener('keydown', this.#closeOnEscape);
		if (this.open && this.isConnected) {
			document.addEventListener('click', this.#closeOnClickOutside);
			document.addEventListener('keydown', this.#closeOnEscape);
		}
	}

	#closeOnClickOutside = (e: Event) => {
		const clickedOutside = !this.contains(e.target as Node);
		const clickedOnAnchor = this._anchorEl?.contains(e.target as Node);
		if (clickedOutside || clickedOnAnchor) this.open = false;
	};

	#closeOnEscape = (e: KeyboardEvent) => {
		if (e.key === 'Escape') {
			this.open = false;
		}
	};
}

export interface Toggletip extends Anchored {}
