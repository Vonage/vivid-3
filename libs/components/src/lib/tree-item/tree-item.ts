import { TreeItem as FastTreeItem } from '@microsoft/fast-foundation';
import { attr } from '@microsoft/fast-element';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';
import { AffixIcon } from '../../shared/patterns/affix';

/**
 * @public
 * @component tree-item
 * @slot item - To specify a child tree item.
 * @slot icon - Add an icon to the component.
 * @event {CustomEvent<HTMLElement>} expanded-change - Fires a custom 'expanded-change' event when the expanded state changes
 * @event {CustomEvent<HTMLElement>} selected-change - Fires a custom 'selected-change' event when the selected state changes
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
