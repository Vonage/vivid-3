import { children, elements, html, when, slotted, ref } from '@microsoft/fast-element';
import { focusTemplateFactory } from '../../shared/patterns/focus';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { TreeItem } from './tree-item';

const getClasses = (_: TreeItem) => classNames('control');

export const expandButton = (context: ElementDefinitionContext) => {
	const focusTemplate = focusTemplateFactory(context);
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<TreeItem>`
	<button
		aria-hidden="true"
		class="button ${(x) => x.expanded ? 'expanded' : ''}""
		@click="${(x, c) =>
			x.handleExpandCollapseButtonClick(c.event as MouseEvent)}"
		${ref("expandCollapseButton")}
	>
		${() => focusTemplate}
		${() => affixIconTemplate('chevron-right-solid')}
	</button>`;
};

/**
 * The template for the {@link @microsoft/fast-foundation#TreeItem} component.
 *
 * @param context
 * @public
 */
export const TreeItemTemplate = (context: ElementDefinitionContext) => {
	const focusTemplate = focusTemplateFactory(context);
	return html<TreeItem>`
	<template
			role="treeitem"
			slot="${x => (x.isNestedItem() ? "item" : void 0)}"
			tabindex="-1"
			aria-expanded="${x =>
			x.childItems && x.childItems.length > 0 ? x.expanded : void 0}"
			aria-selected="${x => x.selected}"
			aria-disabled="${x => x.disabled}"
			@focusin="${(x, c) => x.handleFocus(c.event as FocusEvent)}"
			@focusout="${(x, c) => x.handleBlur(c.event as FocusEvent)}"
			${children({ property: "childItems", filter: elements(), })}
			>
			<div class="${getClasses}">
				${when(x => x.childItems && x.childItems.length > 0, expandButton(context))}
				${x => x.text as string}
				${() => focusTemplate}
			</div>
			${when(x => x.childItems && x.childItems.length > 0 && x.expanded,
				html<TreeItem>`
				<div role="group" class="items">
					<slot name="item" ${slotted("items")}></slot>
				</div>`
			)}
		</template>`;
};