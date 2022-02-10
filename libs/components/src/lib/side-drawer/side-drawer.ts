import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import type { DocumentWithBlockingElements } from 'blocking-elements';

enum POSITION { Start = 'start', End = 'end' }
const blockingElements =
	(document as DocumentWithBlockingElements).$blockingElements;

/**
 * Base class for side-drawer
 *
 * @cssprop [side-drawer-background-color=Current theme's canvas (background) color] - Controls the background of the side drawer
 * @cssprop [side-drawer-color=Current theme's on-canvas (text) color] - Controls the color of the side drawer
 * @cssprop [side-drawer-inline-size=280px] - Controls the inline size of the side drawer
 * @cssprop [side-drawer-padding-top-bar=16px] - Controls the padding of the side drawer's top bar
 * @cssprop [side-drawer-padding-body=16px] - Controls the padding of the side drawer's body
 * @cssprop [side-drawer-z-index=6] - Controls the z-index of the side drawer
 *
 * @public
 */
export class SideDrawer extends FoundationElement {
	private rootEl = document.querySelector(".side-drawer") as HTMLElement;

	/**
	 * applies scheme alternate region
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	}) alternate = false;

	/**
	 * adds top bar to the side drawer
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	}) hasTopBar = false;

	/**
	* sets the side drawer's type to modal
	*
	* @public
	*/
	@attr({
		mode: 'boolean',
	}) modal = false;

	/**
	 * indicates whether the side drawer is open
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	}) open = false;

	/**
	 * sets the side of the side drawer
	 *
	 * @public
	 */
	@attr position?: POSITION;

	/**
	 * Opens the side drawer from the closed state.
	 * @public
	 */
	 public show(): void {
		this.open = true;
	}

	/**
	 * Closes the side drawer from the open state.
	 * @public
	 */
	public hide(): void {
		this.open = false;
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.releaseFocusTrap();
	}

	public handleScrimClick(): void {
		if (this.modal && this.open) {
			this.hide();
		}
	}

	public handleKeydown({ key }: KeyboardEvent): void {
		if (this.open && key === 'Escape') {
			this.hide();
		}
	};

	public handleTransitionEnd(): void {
		// when side drawer finishes open animation
		if (this.open) {
			this.opened();
		} else {
			// when side drawer finishes hide animation
			this.closed();
		}
	};

	private opened(): void {
		if (this.modal) {
			this.trapFocus();
		}
	}

	private closed(): void {
		if (this.modal) {
			this.releaseFocusTrap();
		}
	}

	private trapFocus(): void {
		blockingElements.push(this.rootEl);
	}

	private releaseFocusTrap(): void {
		blockingElements.remove(this.rootEl);
	}
}
