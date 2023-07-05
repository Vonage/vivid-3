import { attr, DOM } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import type { Placement } from '@floating-ui/dom';

type AnchorType = string | HTMLElement;

/**
 * Base class for toggletip
 *
 * @public
 * @slot - The content to display in the toggletip.
 * @slot action-items - The content to display in the toggletip action items.
 */
export class Toggletip extends FoundationElement {

	#observer?: MutationObserver;
	#anchorEl: HTMLElement | null = null;
	#observeMissingAnchor = (anchorId: string) => {
		this.#observer = new MutationObserver(() => {
			const anchor = document.getElementById(anchorId as string);
			if (anchor) {
				this.#anchorEl = anchor;
				this.#setupAnchor(this.#anchorEl);
				// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
				this.#observer!.disconnect();
				this.#observer = undefined;
			}
		});
		this.#observer.observe(document.body, { childList: true, subtree: true });
	};

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
	@attr({ mode: 'fromView' }) anchor: AnchorType = '';

	anchorChanged(_: AnchorType, newValue: AnchorType) {
		if (this.#anchorEl) this.#cleanupAnchor(this.#anchorEl);
		this.#observer?.disconnect();

		this.#anchorEl = newValue instanceof HTMLElement ? newValue : document.getElementById(newValue);
		if (this.#anchorEl) {
			this.#setupAnchor(this.#anchorEl);
		} else {
			this.#observeMissingAnchor(newValue as string);
		}
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
			document.addEventListener('click', this.#closeOnClickOutside);
			document.addEventListener('keydown', this.#closeOnEscape);
			this.setAttribute('role', 'status');
		} else {
			document.removeEventListener('click', this.#closeOnClickOutside);
			document.removeEventListener('keydown', this.#closeOnEscape);
			this.removeAttribute('role');
		}

		if (this.#anchorEl) {
			this.#anchorEl.ariaExpanded = this.open.toString();
		}
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		if (this.#anchorEl) this.#cleanupAnchor(this.#anchorEl);
		this.#observer?.disconnect();
		document.removeEventListener('keydown', this.#closeOnEscape);
	}

	#setupAnchor(a: HTMLElement) {
		a.addEventListener('click', this.#openIfClosed, true);
		a.ariaLabel = (a.ariaLabel ?? '') + this.#ANCHOR_ARIA_LABEL_SUFFIX;
		// TODO aria-controls="myid"
	}

	#cleanupAnchor(a: HTMLElement) {
		a.removeEventListener('click', this.#openIfClosed, true);
		if (a.ariaLabel) a.ariaLabel = a.ariaLabel.replace(this.#ANCHOR_ARIA_LABEL_SUFFIX, '');
	}

	#openIfClosed = () => {
		// DOM.queueUpdate() is required to prevent the click event from
		// being caught by the document click handler (added by openChanged)
		if (!this.open) DOM.queueUpdate(() => this.open = true);
	};

	#closeOnClickOutside = (e: Event) => {
		if (!this.contains(e.target as Node)) this.open = false;
	};

	#closeOnEscape = (e:KeyboardEvent) => {
		if (e.key === 'Escape') this.open = false;
	};
}
