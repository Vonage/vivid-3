import { attr } from '@microsoft/fast-element';
import { FoundationElement, FoundationElementDefinition, StartEndOptions } from '@microsoft/fast-foundation';
import { createAndDispatchEvent } from '@vivid-nx/shared';
import type { DocumentWithBlockingElements } from 'blocking-elements';

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
 * @public
 */

/**
 * Anchor configuration options
 *
 * @public
 */
export type SideDrawerOptions = FoundationElementDefinition & StartEndOptions;

export class SideDrawer extends FoundationElement {
	private rootEl = document.querySelector('.side-drawer') as HTMLElement;

	/**
	 * applies scheme alternate region
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	}) alternate = false;

	/**
	 *
	 * adds top bar to the side drawer
	 *
	 * @internal
	 */
	hasTopBar: HTMLElement[] | undefined;

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
	@attr position?: 'start' | 'end';

	/**
	 * Opens the side drawer from the closed state.
	 *
	 * @public
	 */
	show(): void {
		this.open = true;
	}

	/**
	 * Closes the side drawer from the open state.
	 *
	 * @public
	 */
	hide(): void {
		this.open = false;
	}

	override disconnectedCallback(): void {
		super.disconnectedCallback();
		this.releaseFocus();
	}

	handleScrimClick(): void {
		if (this.modal && this.open) {
			this.hide();
		}
	}

	handleKeydown({ key }: KeyboardEvent): void {
		if (this.open && key === 'Escape') {
			this.hide();
		}
	}

	handleTransitionEnd(): void {
		if (this.open) {
			this.opened();
		} else {
			this.closed();
		}
	}

	private opened(): void {
		createAndDispatchEvent(this, 'side-drawer-opened');
		if (this.modal) {
			this.trapFocus();
		}
	}

	private closed(): void {
		createAndDispatchEvent(this, 'side-drawer-closed');
		if (this.modal) {
			this.releaseFocus();
		}
	}

	private trapFocus(): void {
		blockingElements?.push(this.rootEl);
	}

	private releaseFocus(): void {
		blockingElements?.remove(this.rootEl);
	}
}
