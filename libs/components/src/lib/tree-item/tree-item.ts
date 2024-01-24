import { TreeItem as FastTreeItem } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { applyMixins } from '@microsoft/fast-foundation';
import { AffixIcon } from '../../shared/patterns/affix';

/**
 * Base class for tree-item
 *
 * @public
 * @slot item - To specify a child tree item.
 * @slot icon - Add an icon to the component.
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

export interface TreeItem extends AffixIcon {}
applyMixins(TreeItem, AffixIcon);
