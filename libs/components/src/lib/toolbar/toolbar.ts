import { Toolbar as FoundationToolbar } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for toolbar
 *
 * @public
 */
export class Toolbar extends FoundationToolbar {
	/**
	 * Indicates the toolbar's label.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: label
	 */
	@attr label?: string;
}
