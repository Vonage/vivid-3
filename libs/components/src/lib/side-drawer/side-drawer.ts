import { attr } from '@microsoft/fast-element';
import { FoundationElement } from '@microsoft/fast-foundation';

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
}
