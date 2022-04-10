import { FoundationElement } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

export enum ICON_SETS { Chevron = 'chevron', Binary = 'binary' }

/**
 * Base class for expension-panel
 *
 * @public
 */
export class ExpensionPanel extends FoundationElement {
	private VALID_HEADER_VALUES = [2, 3, 4, 5, 6];

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
	@attr({ mode: 'fromView' }) meta? = '';

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
	 * indicates whether the expension-panel is open
	 *
	 * @public
	 * HTML Attribute: open
	 */
	@attr({ mode: 'boolean' }) open = false;

	/**
	 * Opens the expension-panel from the closed state.
	 *
	 * @public
	 */
	show(): void {
		this.open = true;
	}

	/**
	 * Closes the expension-panel from the open state.
	 *
	 * @public
	 */
	hide(): void {
		this.open = false;
	}

	isValidHeaderValue(headerValue: string | number) {
		return this.VALID_HEADER_VALUES.includes(Number(headerValue));
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

	protected toggleOpen(): void {
		this.open = !this.open;
	}
}
