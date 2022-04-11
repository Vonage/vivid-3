import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for expansion-panel
 *
 * @public
 */
export class ExpansionPanel extends FoundationElement {
	/**
	 *
	 * @public
	 * 
	 * HTML Attribute: heading
	 */
	@attr({ mode: 'fromView' }) heading = '';

	/**
	 *
	 * @public
	 * HTML Attribute: heading-level
	 */
	@attr({ mode: 'fromView', attribute: 'heading-level' }) headingLevel: 2 | 3 | 4 | 5 | 6 = 3;

	/**
	 *
	 * @public
	 */
	@attr({ mode: 'boolean' }) leadingToggle = false;

	/**
	 *
	 * @public
	 * 
	 * HTML Attribute: icon
	 */
	@attr({ mode: 'fromView' }) icon = '';

	/**
	 *
	 * @public
	 * 
	 * HTML Attribute: meta
	 */
	@attr({ mode: 'fromView' }) meta = '';

	/**
	 * indicates whether the expansion-panel is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;

	/**
	 * Opens the expansion-panel from the closed state.
	 *
	 * @public
	 */
	show(): void {
		this.open = true;
	}

	/**
	 * Closes the expansion-panel from the open state.
	 *
	 * @public
	 */
	hide(): void {
		this.open = false;
	}

	/**
	 * Toggles the expansion-panel.
	 *
	 * @public
	 */
	toggleOpen(): void {
		this.open = !this.open;
	}
}
