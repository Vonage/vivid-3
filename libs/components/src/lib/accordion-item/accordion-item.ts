import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for accordion-item
 *
 * @public
 */
export class accordionItem extends FoundationElement {
	/**
	 * 
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
	 * Indicates whether the accordion-item has indicator
	 *
	 * @public
	 * HTML Attribute: no-indicator
	 */
	@attr({ mode: 'boolean', attribute: 'no-indicator' }) noIndicator = false;

	/**
	 *
	 * @public
	 * 
	 * HTML Attribute: icon
	 */
	@attr({ mode: 'fromView' }) icon = '';

	/**
	 * Indicates the icon affix alignment.
	 *
	 * @public
	 * 
	 * HTML Attribute: icon-trailing
	 */
	@attr({ mode: 'boolean', attribute: 'icon-trailing' }) iconTrailing = false;

	/**
	 *
	 * @public
	 * 
	 * HTML Attribute: meta
	 */
	@attr({ mode: 'fromView' }) meta = '';

	/**
	 * Indicates whether the accordion-item is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;

	/**
	 *
	 * @public
	 * HTML Attribute: dense
	 */
	@attr({ mode: 'boolean' }) dense = false;

	/**
	 * Opens the accordion-item from the closed state.
	 *
	 * @public
	 */
	show(): void {
		this.open = true;
	}

	/**
	 * Closes the accordion-item from the open state.
	 *
	 * @public
	 */
	hide(): void {
		this.open = false;
	}

	/**
	 * Toggles the accordion-item.
	 *
	 * @public
	 */
	toggleOpen(): void {
		this.open = !this.open;
	}
}
