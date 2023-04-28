import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import type { Placement } from '@floating-ui/dom';
import type { Popup } from '../components';

type anchorType = string | HTMLElement;

/**
 * Base class for toggletip
 *
 * @public
 */
export class Toggletip extends FoundationElement {

	popup!: Popup;

	anchorEl: HTMLElement | null = null;

	#ANCHOR_ARIA_LABEL_SUFFIX = ' ; Show more information';

	/**
	 * toggle color scheme
	 *
	 * @public
	 * HTML Attribute: alternate
	 */
	@attr({ mode: 'boolean'	}) alternate = false;

	/**
	 * placement of the toggletip
	 *
	 * @public
	 * HTML Attribute: placement
	 */
	@attr({ mode: 'fromView' }) placement?: Placement = 'right';
	
	/**
	 * id or direct reference to the toggletip's anchor element
	 *
	 * @public
	 * HTML Attribute: anchor
	 */
	@attr({ mode: 'fromView' }) anchor: anchorType = '';
	anchorChanged(_: anchorType, newValue: anchorType) {
		if (this.anchorEl) this.#cleanupAnchor(this.anchorEl);

		this.anchorEl = newValue instanceof HTMLElement ? newValue : document.getElementById(newValue);
		if (this.anchorEl) this.#setupAnchor(this.anchorEl);
	}

	/**
	 * indicates whether the toggletip is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean'	}) open = false;
	openChanged(oldValue: boolean, newValue: boolean): void {
		if (oldValue === undefined) return;

		if (newValue) {
			document.addEventListener('keydown', this.#closeOnEscape);
			this.setAttribute('role', 'status');
		} else {
			document.removeEventListener('keydown', this.#closeOnEscape);
			this.removeAttribute('role');
		}
		
		if (this.anchorEl) {
			this.anchorEl.ariaExpanded = this.open.toString();
		}
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		if (this.anchorEl) this.#cleanupAnchor(this.anchorEl);
		document.removeEventListener('keydown', this.#closeOnEscape);
	}

	#setupAnchor(a: HTMLElement) {
		a.addEventListener('click', this.#toggle);
		a.addEventListener('focusout', this.#hide);
		a.ariaLabel = (a.ariaLabel ?? '') + this.#ANCHOR_ARIA_LABEL_SUFFIX;
		// TODO aria-controls="myid"
	};

	#cleanupAnchor(a: HTMLElement) {
		console.log('cleanup', a);
		a.removeEventListener('click', this.#toggle);
		a.removeEventListener('focusout', this.#hide);
		a.ariaLabel = a.ariaLabel?.replace(this.#ANCHOR_ARIA_LABEL_SUFFIX, '') as string;
	};

	#toggle = () => {
		this.open = !this.open;
	};

	#hide = () => {
		this.open = false;
	};

	#closeOnEscape = (e:KeyboardEvent) => {
		if (e.key === 'Escape') this.#hide();
	};
}
