import { html, slotted } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { TreeView } from './tree-view';

const getClasses = (_: TreeView) => classNames('base');

/**
 * The template for the {@link @microsoft/fast-foundation#TreeView} component.
 *
 * @param context
 * @public
 */
export const TreeViewTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<TreeView> = () => 
	html`
	<template
		class="${getClasses}"
		role="tree"
		@keydown="${(x, c) => x.handleKeyDown(c.event as KeyboardEvent)}"
		@focusin="${(x, c) => x.handleFocus(c.event as FocusEvent)}"
		@focusout="${(x, c) => x.handleBlur(c.event as FocusEvent)}"
		@click="${(x, c) => x.handleClick(c.event as MouseEvent)}"
		@selected-change="${(x, c) => x.handleSelectedChange(c.event)}"
		>
		<slot ${slotted("slottedTreeItems")}></slot>
	</template>
`;
