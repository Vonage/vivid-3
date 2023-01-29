import { TreeItem as FastTreeItem } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';

/**
 * Base class for tree-item
 *
 * @public
 */
export class TreeItem extends FastTreeItem {
	/**
	 * Indicates the text's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;
}
