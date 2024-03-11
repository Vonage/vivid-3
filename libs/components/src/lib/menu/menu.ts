import { attr, DOM, observable } from '@microsoft/fast-element';
import { Menu as FastMenu } from '@microsoft/fast-foundation';
import type { Placement } from '@floating-ui/dom';
import { type Anchored, anchored } from '../../shared/patterns/anchored';

/**
 * @public
 * @component menu
 * @slot - Default slot.
 * @slot anchor - Used to set the anchor element for the menu.
 * @slot header - Used to add additional content to the top of the menu.
 * @slot action-items - Used to add action items to the bottom of the menu.
 * @event open - Fired when the menu is opened
 * @event close - Fired when the menu is closed
 */
@anchored
export class Menu extends FastMenu {
	@attr({attribute: 'aria-label'}) override ariaLabel: string | null = null;

	/**
	 * placement of the menu
	 *
	 * @public
	 * HTML Attribute: placement
	 */
	@attr({ mode: 'fromView' }) placement?: Placement = 'bottom';

	/**
	 * indicates whether the menu will automatically close when
	 * the user clicks outside the menu
	 *
	 * @public
	 * HTML Attribute: auto-dismiss
	 */
	@attr({ mode: 'boolean', attribute: 'auto-dismiss' }) autoDismiss = false;
	autoDismissChanged(oldValue?: boolean) {
		if (oldValue === undefined) return;

		this.#updateClickOutsideListeners();
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

		if (this._anchorEl) {
			this.#updateAnchor(this._anchorEl);
		}
	}

	constructor() {
		super();

		const handleFocusOut = this.handleFocusOut;
		this.handleFocusOut = (e: FocusEvent) => {
			/**
			 * Fast menu doesn't support having arbitrary elements in the menu and handleFocusOut will throw if there are
			 * no menuitem children. Therefore, we need to skip calling it in that case.
			 */
			const privates = this as unknown as {
				menuItems: Element[] | undefined;
				isFocusableElement: (el: Element) => el is HTMLElement;
			};
			const isSafeToCallSuper = privates.menuItems!.some(privates.isFocusableElement);
			if (!isSafeToCallSuper) {
				return;
			}

			handleFocusOut(e);
		};
	}

	override connectedCallback(): void {
		super.connectedCallback();
		this.#updateClickOutsideListeners();
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.#updateClickOutsideListeners();
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
		a.setAttribute('aria-haspopup', 'menu');
		this.#updateAnchor(a);
		// TODO aria-controls="myid"
	}

	#updateAnchor(a: HTMLElement) {
		a.setAttribute('aria-expanded', this.open.toString());
	}

	#cleanupAnchor(a: HTMLElement) {
		a.removeEventListener('click', this.#openIfClosed, true);
		a.removeAttribute('aria-hasPopup');
		a.removeAttribute('aria-expanded');
	}

	#openIfClosed = () => {
		if (!this.open) DOM.queueUpdate(() => this.open = true);
	};

	#updateClickOutsideListeners = () => {
		document.removeEventListener('click', this.#onClickOutsideCapture, true);
		document.removeEventListener('click', this.#onClickOutside);
		if (this.autoDismiss && this.isConnected) {
			document.addEventListener('click', this.#onClickOutsideCapture, true);
			document.addEventListener('click', this.#onClickOutside);
		}
	};

	#wasOpenBeforeClick = new WeakMap<Event, boolean>();

	#onClickOutsideCapture = (e: Event) => {
		this.#wasOpenBeforeClick.set(e, this.open);
	};

	#onClickOutside = (e: Event) => {
		if (!this.contains(e.target as Node) && this.#wasOpenBeforeClick.get(e)) {
			this.open = false;
		}
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

export interface Menu extends Anchored {}
