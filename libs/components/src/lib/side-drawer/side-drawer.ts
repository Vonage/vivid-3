import 'blocking-elements';
import 'wicg-inert';
import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';
import type { DocumentWithBlockingElements } from 'blocking-elements';

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

export class SideDrawer extends FoundationElement {
	asideEl!: HTMLElement;
	scrimEl!: any;

	/**
	 * applies scheme alternate region
	 *
	 * @public
	 */
	@attr({
		mode: 'boolean',
	}) alternate = false;

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
	 *
	 * adds top bar to the side drawer
	 *
	 * @public
	 */
	hasTopBar: HTMLElement[] | undefined;

	#blockingElements = (document as DocumentWithBlockingElements).$blockingElements;

	override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		super.attributeChangedCallback(name, oldValue, newValue);
		if (name === "open" && this.modal) {
			this.open ? this.#trapFocus() : this.#releaseFocusTrap();
		}
	}

	#trapFocus(): void {
		this.#blockingElements.push(this.asideEl);
		this.scrimEl.inert = false;
	}

	#releaseFocusTrap(): void {
		this.#blockingElements.remove(this.asideEl);
	}
}
