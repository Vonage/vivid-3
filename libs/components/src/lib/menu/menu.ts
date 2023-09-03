import { attr, DOM, observable } from '@microsoft/fast-element';
import { Menu as FoundationMenu } from '@microsoft/fast-foundation';
import type { Placement } from '@floating-ui/dom';

type AnchorType = string | HTMLElement;

/**
 * Base class for menu
 *
 * @public
 * @slot - Default slot.
 * @slot header - Used to add additional content to the top of the menu.
 * @slot action-items - Used to add action items to the bottom of the menu.
 * @event open - Fired when the menu is opened
 * @event close - Fired when the menu is closed
 */
export class Menu extends FoundationMenu {
	[x: string]: any;

	#observer?: MutationObserver;
	#anchorEl: HTMLElement | null = null;
	#observeMissingAnchor = (anchorId: string) => {
		this.#observer = new MutationObserver(() => {
			const anchor = document.getElementById(anchorId as string);
			if (anchor) {
				this.#anchorEl = anchor;
				this.#setupAnchor(this.#anchorEl);
				this.#observer!.disconnect();
				this.#observer = undefined;
			}
		});
		this.#observer.observe(document.body, { childList: true, subtree: true });
	};

	/**
	 * placement of the menu
	 *
	 * @public
	 * HTML Attribute: placement
	 */
	@attr({ mode: 'fromView' }) placement?: Placement = 'bottom';

	/**
	 * id or direct reference to the menu's anchor element
	 *
	 * @public
	 * HTML Attribute: anchor
	 */
	@attr({ mode: 'fromView' }) anchor: AnchorType = '';
	anchorChanged(_: AnchorType, newValue: AnchorType): void {
		if (this.#anchorEl) this.#cleanupAnchor(this.#anchorEl);
		this.#observer?.disconnect();

		this.#anchorEl = (newValue instanceof HTMLElement) ? newValue : document.getElementById(newValue);
		if (this.#anchorEl) {
			this.#setupAnchor(this.#anchorEl);
		} else {
			this.#observeMissingAnchor(newValue as string);
		}
	}

	/**
	 * indicates whether the menu will automatically close when
	 * the user clicks outside the menu
	 *
	 * @public
	 * HTML Attribute: auto-dismiss
	 */
	@attr({ mode: 'boolean', attribute: 'auto-dismiss' }) autoDismiss = false;
	autoDismissChanged(oldValue: boolean, newValue: boolean): void {
		if (oldValue === undefined) return;

		if (newValue) {
			document.addEventListener('click', this.#closeOnClickOutside);
		} else {
			document.removeEventListener('click', this.#closeOnClickOutside);
		}
	}

	/**
	 * indicates whether the menu is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;
	openChanged(_: boolean, newValue: boolean): void {
		newValue
			? this.$emit('open', undefined, { bubbles: false })
			: this.$emit('close', undefined, { bubbles: false });

		if (this.#anchorEl) {
			this.#anchorEl.ariaExpanded = this.open.toString();
		}
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		if (this.#anchorEl) this.#cleanupAnchor(this.#anchorEl);
		this.#observer?.disconnect();
		document.removeEventListener('click', this.#closeOnClickOutside);
	}

	override handleFocusOut = (e: FocusEvent) => {
		super.handleFocusOut(e);
		e.stopPropagation();
		return false;
	};

	#setupAnchor(a: HTMLElement) {
		a.addEventListener('click', this.#openIfClosed, true);
		a.setAttribute('aria-haspopup', 'menu');
		// TODO aria-controls="myid"
	}

	#cleanupAnchor(a: HTMLElement) {
		a.removeEventListener('click', this.#openIfClosed, true);
		a.removeAttribute('aria-hasPopup');
	}

	#openIfClosed = () => {
		// DOM.queueUpdate() is required to prevent the click event from
		// being caught by the document click handler (added by openChanged)
		if (!this.open) DOM.queueUpdate(() => this.open = true);
	};

	#closeOnClickOutside = (e: Event) => {
		if (!this.contains(e.target as Node)) this.open = false;
	};

	/**
	 *
	 * Slot observer:
	 *
	 * @internal
	 */
	@observable headerSlottedContent?: HTMLElement[];
	@observable actionItemsSlottedContent?: HTMLElement[];
}
