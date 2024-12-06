import { FoundationElement } from '@microsoft/fast-foundation';
import { isHTMLElement } from '@microsoft/fast-web-utilities';
import { attr, observable } from '@microsoft/fast-element';
import { applyMixins } from '../../shared/foundation/utilities/apply-mixins';
import { AffixIcon } from '../../shared/patterns/affix';

/**
 * check if the item is a tree item
 * @public
 * @remarks
 * determines if element is an HTMLElement and if it has the role treeitem
 */
export function isTreeItemElement(el: Element): el is HTMLElement {
	return (
		isHTMLElement(el) && (el.getAttribute('role') as string) === 'treeitem'
	);
}

/**
 * @public
 * @component tree-item
 * @slot item - To specify a child tree item.
 * @slot icon - Add an icon to the component.
 * @event {CustomEvent<HTMLElement>} expanded-change - Fires a custom 'expanded-change' event when the expanded state changes
 * @event {CustomEvent<HTMLElement>} selected-change - Fires a custom 'selected-change' event when the selected state changes
 */
export class TreeItem extends FoundationElement {
	/**
	 * Indicates the text's text.
	 *
	 * @public
	 * @remarks
	 * HTML Attribute: text
	 */
	@attr text?: string;

	/**
	 * When true, the control will be appear expanded by user interaction.
	 * @public
	 * @remarks
	 * HTML Attribute: expanded
	 */
	@attr({ mode: 'boolean' }) expanded = false;
	expandedChanged(): void {
		if (this.$fastController.isConnected) {
			this.$emit('expanded-change', this);
		}
	}

	/**
	 * When true, the control will appear selected by user interaction.
	 * @public
	 * @remarks
	 * HTML Attribute: selected
	 */
	@attr({
		mode: 'boolean',
	})
	selected = false;
	selectedChanged(): void {
		if (this.$fastController.isConnected) {
			this.$emit('selected-change', this);
		}
	}

	/**
	 * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/disabled | disabled HTML attribute} for more information.
	 * @public
	 * @remarks
	 * HTML Attribute: disabled
	 */
	@attr({ mode: 'boolean' })
	disabled = false;

	/**
	 *  Reference to the expand/collapse button
	 *
	 * @internal
	 */
	// @ts-expect-error Type is incorrectly non-optional
	expandCollapseButton: HTMLDivElement;

	/**
	 * Whether the item is focusable
	 *
	 * @internal
	 */
	@observable
	focusable = false;

	/**
	 *
	 *
	 * @internal
	 */
	@observable
	// @ts-expect-error Type is incorrectly non-optional
	childItems: HTMLElement[];

	/**
	 * The slotted child tree items
	 *
	 * @internal
	 */
	@observable
	items!: HTMLElement[];
	itemsChanged(): void {
		if (this.$fastController.isConnected) {
			this.items.forEach((node: HTMLElement) => {
				if (isTreeItemElement(node)) {
					// TODO: maybe not require it to be a TreeItem?
					(node as TreeItem).nested = true;
				}
			});
		}
	}

	/**
	 * Indicates if the tree item is nested
	 *
	 * @internal
	 */
	@observable
	// @ts-expect-error Type is incorrectly non-optional
	nested: boolean;

	/**
	 *
	 *
	 * @internal
	 */
	@observable
	// @ts-expect-error Type is incorrectly non-optional
	renderCollapsedChildren: boolean;

	/**
	 * Places document focus on a tree item
	 *
	 * @public
	 * @param el - the element to focus
	 */
	static focusItem(el: HTMLElement) {
		(el as TreeItem).focusable = true;
		el.focus();
	}

	/**
	 * Whether the tree is nested
	 *
	 * @public
	 */
	readonly isNestedItem = (): boolean => {
		return isTreeItemElement(this.parentElement as Element);
	};

	/**
	 * Handle expand button click
	 *
	 * @internal
	 */
	handleExpandCollapseButtonClick = (e: MouseEvent): void => {
		if (!this.disabled && !e.defaultPrevented) {
			this.expanded = !this.expanded;
		}
	};

	/**
	 * Handle focus events
	 *
	 * @internal
	 */
	handleFocus = (_e: FocusEvent): void => {
		this.setAttribute('tabindex', '0');
	};

	/**
	 * Handle blur events
	 *
	 * @internal
	 */
	handleBlur = (_e: FocusEvent): void => {
		this.setAttribute('tabindex', '-1');
	};

	/**
	 * Gets number of children
	 *
	 * @internal
	 */
	childItemLength(): number {
		const treeChildren: HTMLElement[] = this.childItems.filter(
			(item: HTMLElement) => {
				return isTreeItemElement(item);
			}
		);
		return treeChildren ? treeChildren.length : 0;
	}
}

export interface TreeItem extends AffixIcon {}
applyMixins(TreeItem, AffixIcon);
