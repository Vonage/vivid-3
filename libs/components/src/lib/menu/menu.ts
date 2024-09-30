import { attr, DOM, observable } from '@microsoft/fast-element';
import { Menu as FastMenu } from '@microsoft/fast-foundation';
import type { Placement, Strategy } from '@floating-ui/dom';
import { type Anchored, anchored } from '../../shared/patterns/anchored';

/**
 * @public
 * @component menu
 * @slot - Default slot.
 * @slot anchor - Used to set the anchor element for the menu.
 * @slot header - Used to add additional content to the top of the menu.
 * @slot action-items - Used to add action items to the bottom of the menu.
 * @event {CustomEvent<undefined>} open - Fired when the menu is opened
 * @event {CustomEvent<undefined>} close - Fired when the menu is closed
 */
@anchored
export class Menu extends FastMenu {
	@attr({ attribute: 'aria-label' }) override ariaLabel: string | null = null;

	/**
	 * placement of the menu
	 *
	 * @public
	 * HTML Attribute: placement
	 */
	@attr({ mode: 'fromView' }) placement?: Placement = 'bottom';

	/**
	 * Controls how the menu opens and closes itself.
	 *
	 * @public
	 * HTML Attribute: trigger
	 */
	@attr trigger?: 'auto' | 'legacy' | 'off';
	get #triggerBehaviour(): 'auto' | 'legacy' | 'off' {
		return this.trigger ?? 'legacy';
	}

	/**
	 * indicates whether the menu will automatically close when focus moves away from it.
	 *
	 * @public
	 * HTML Attribute: auto-dismiss
	 */
	@attr({ mode: 'boolean', attribute: 'auto-dismiss' }) autoDismiss = false;

	/**
	 * The strategy-absolute attribute.
	 *
	 * @public
	 * HTML Attribute: strategy
	 */
	@attr({ mode: 'fromView', attribute: 'position-strategy' })
		positionStrategy?: Strategy = 'fixed';
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
			const isSafeToCallSuper = privates.menuItems!.some(
				privates.isFocusableElement
			);
			if (!isSafeToCallSuper) {
				return;
			}

			handleFocusOut(e);
		};

		// Override Fast's domChildren method to filter out slotted elements like anchor
		const privates = this as unknown as {
			domChildren(): HTMLElement[];
		};
		const domChildren = privates.domChildren;
		privates.domChildren = () => {
			return domChildren
				.call(this)
				.filter((child) => !child.hasAttribute('slot'));
		};
	}

	/**
	 * @internal
	 */
	_anchorElChanged(oldValue?: HTMLElement, newValue?: HTMLElement): void {
		if (oldValue) this.#cleanupAnchor(oldValue);
		if (newValue) this.#setupAnchor(newValue);
	}

	#setupAnchor(a: HTMLElement) {
		a.addEventListener('click', this.#onAnchorClick, true);
		a.addEventListener('focusout', this._onFocusout);
		a.setAttribute('aria-haspopup', 'menu');
		this.#updateAnchor(a);
	}

	#updateAnchor(a: HTMLElement) {
		a.setAttribute('aria-expanded', this.open.toString());
	}

	#cleanupAnchor(a: HTMLElement) {
		a.removeEventListener('click', this.#onAnchorClick, true);
		a.removeEventListener('focusout', this._onFocusout);
		a.removeAttribute('aria-hasPopup');
		a.removeAttribute('aria-expanded');
	}

	#onAnchorClick = () => {
		if (this.#triggerBehaviour === 'off') {
			return;
		}

		// Legacy behaviour: only open the menu but don't close it
		if (this.#triggerBehaviour === 'legacy' && this.open) {
			return;
		}

		const newValue = !this.open;
		DOM.queueUpdate(() => (this.open = newValue));
	};

	_onFocusout = (e: FocusEvent) => {
		const focusTarget = e.relatedTarget as Node;
		const focusMovedAway =
			!this.contains(focusTarget) && !this._anchorEl?.contains(focusTarget);
		if (this.autoDismiss && focusMovedAway) {
			this.open = false;
		}
	};

	/**
	 * @internal
	 */
	_onChange(e: Event) {
		const clickedOnNonCheckboxMenuItem =
			e.target instanceof HTMLElement &&
			(e.target.role === 'menuitem' || e.target.role === 'menuitemradio');

		if (this.#triggerBehaviour === 'auto' && clickedOnNonCheckboxMenuItem) {
			this.open = false;
		}

		return true;
	}

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
