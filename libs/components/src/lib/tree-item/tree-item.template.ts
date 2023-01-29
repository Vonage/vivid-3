import { children, elements, html, ref, slotted, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { TreeItem } from './tree-item';

const getClasses = (_: TreeItem) => classNames('base');

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
		<template
		class="${getClasses}"
		role="treeitem"
		slot="${x => (x.isNestedItem() ? "item" : void 0)}"
		tabindex="-1"
		aria-expanded="${x =>
				x.childItems && x.childItemLength > 0 ? x.expanded : void 0}"
		aria-selected="${x => x.selected}"
		aria-disabled="${x => x.disabled}"
		@focusin="${(x, c) => x.handleFocus(c.event as FocusEvent)}"
		@focusout="${(x, c) => x.handleBlur(c.event as FocusEvent)}"
		${children({
					property: "childItems",
					filter: elements(),
				})}
		>
		<div class="positioning-region" part="positioning-region">
			<div class="content-region" part="content-region">
				${when(
					x => x.childItems && x.childItemLength > 0,
					html<TreeItem>`
						<div
							aria-hidden="true"
							class="expand-collapse-button"
							part="expand-collapse-button"
							@click="${(x, c) =>
							x.handleExpandCollapseButtonClick(
								c.event as MouseEvent
							)}"
							${ref("expandCollapseButton")}
						>
							<slot name="expand-collapse-glyph">
								${staticallyCompose(options.expandCollapseGlyph)}
							</slot>
						</div>
					`
				)}
				<slot></slot>
			</div>
		</div>
		${when(x => (x.childItems && x.childItemLength > 0 && x.expanded),
					html<TreeItem>`
				<div role="group" class="items" part="items">
					<slot name="item" ${slotted("items")}></slot>
				</div>
			`)
			}
</template>
`;
