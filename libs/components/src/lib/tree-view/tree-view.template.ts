import { html, ref, slotted } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { TreeView } from './tree-view';

const getClasses = (_: TreeView) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#TreeView} component.
 *
 * @param context
 * @public
 */
export const TreeViewTemplate = () => {
	return html<TreeView>`
	<template
		role="tree"
		${ref('treeView')}
		@keydown="${(x, c) => x.handleKeyDown(c.event as KeyboardEvent)}"
		@focusin="${(x, c) => x.handleFocus(c.event as FocusEvent)}"
		@focusout="${(x, c) => x.handleBlur(c.event as FocusEvent)}"
		@click="${(x, c) => x.handleClick(c.event as MouseEvent)}"
		@selected-change="${(x, c) => x.handleSelectedChange(c.event)}"
		>
		<div class="${getClasses}">
			<slot ${slotted('slottedTreeItems')}></slot>
		</div>
	</template>`;
};