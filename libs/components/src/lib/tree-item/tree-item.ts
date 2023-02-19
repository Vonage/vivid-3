import { TreeItem as FastTreeItem } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { applyMixins } from '@microsoft/fast-foundation';
import { AffixIcon } from '../../shared/patterns/affix';

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

export interface TreeItem extends AffixIcon {}
applyMixins(TreeItem, AffixIcon);