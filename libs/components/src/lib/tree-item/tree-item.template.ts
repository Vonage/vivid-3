import { children, elements, html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { TreeItem } from './tree-item';

const getClasses = (_: TreeItem) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#TreeItem} component.
 *
 * @param context
 * @public
 */
export const TreeItemTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<TreeItem> = () =>
		html<TreeItem>`
		<div
			class="${getClasses}"
			role="treeitem"
			slot="${x => (x.isNestedItem() ? "item" : void 0)}"
			tabindex="-1"
			aria-expanded="${x =>
				x.childItems && Number(x.childItemLength) > 0 ? x.expanded : void 0}"
			aria-selected="${x => x.selected}"
			aria-disabled="${x => x.disabled}"
			@focusin="${(x, c) => x.handleFocus(c.event as FocusEvent)}"
			@focusout="${(x, c) => x.handleBlur(c.event as FocusEvent)}"
			${children({
					property: "childItems",
					filter: elements(),
				})}
			>
			${x => x.text as string}
		</div>
`;
