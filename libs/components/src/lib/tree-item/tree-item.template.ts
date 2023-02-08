import { children, elements, html, ref, slotted, when } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { focusTemplateFactory } from './../../shared/patterns/focus';
import type { TreeItem } from './tree-item';

const getClasses = ({
	disabled, selected }: TreeItem) => classNames(
		'control',
		['disabled', disabled],
		['selected', Boolean(selected)],
	);

export const expandCollapseButton = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<TreeItem>`
	<div aria-hidden="true"
		class="expandCollapseButton"
		@click="${(x, c) =>
			x.handleExpandCollapseButtonClick(c.event as MouseEvent)}"
			${ref('expandCollapseButton')}
	>
		${x => affixIconTemplate(x.expanded ? 'chevron-down-solid' : 'chevron-right-solid')}
	</div>`;
};

/**
 * The template for the {@link @microsoft/fast-foundation#TreeItem} component.
 *
 * @param context
 * @public
 */
export const TreeItemTemplate = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);

	return html<TreeItem>`
	<template
			role="treeitem"
			slot="${x => (x.isNestedItem() ? 'item' : void 0)}"
			tabindex="-1"
			aria-expanded="${x =>
			x.childItems && x.childItems.length > 0 ? x.expanded : void 0}"
			aria-selected="${x => x.selected}"
			aria-disabled="${x => x.disabled}"
			@focusin="${(x, c) => x.handleFocus(c.event as FocusEvent)}"
			@focusout="${(x, c) => x.handleBlur(c.event as FocusEvent)}"
			${children({ property: 'childItems', filter: elements(), })}
			>
			<div class="${getClasses}">
				${() => focusTemplate}
				${when(x => x.childItems && x.childItems.length > 0, expandCollapseButton(context))}
				${x => affixIconTemplate(x.icon)}
				${x => x.text as string}
			</div>
			${when(x => x.childItems && x.childItems.length > 0 && x.expanded,
				html<TreeItem>`
				<div role="group" class="items">
					<slot name="item" ${slotted('items')}></slot>
				</div>`
			)}
		</template>`;
};