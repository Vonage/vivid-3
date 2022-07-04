import { Divider as FoundationDivider } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for divider
 *
 * @public
 */
export class Divider extends FoundationDivider {
	/**
	 * Indicates the text's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr orientation?: string;
}
