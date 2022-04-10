import { FoundationElement } from '@microsoft/fast-foundation';
import { attr, html } from '@microsoft/fast-element';

export enum ICON_SETS { Chevron = 'chevron', Binary = 'binary' }

/**
 * Base class for expansion-panel
 *
 * @public
 */
export class ExpansionPanel extends FoundationElement {
	safeHtml = html;
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
	*
	* @public
	* 
	* HTML Attribute: meta
	*/
	@attr({ mode: 'fromView' }) indicatorIconSet = ICON_SETS.Chevron;

	/**
	 *
	 * @public
	 * HTML Attribute: dense
	 */
	@attr({ mode: 'boolean' }) dense = false;

	/**
	 *
	 * @public
	 * HTML Attribute: leadingToggle
	 */
	@attr({ mode: 'boolean' }) leadingToggle = false;

	/**
	 *
	 * @public
	 */
	@attr({ mode: 'fromView', attribute: 'heading-level' }) headingLevel = '3';

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

	override attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
		super.attributeChangedCallback(name, oldValue, newValue);
		switch (name) {
			case 'open': {
				this.toggleAttribute('open', this.open);
				break;
			}
		}
	}
}
