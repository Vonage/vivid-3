import { children, elements, html, slotted } from '@microsoft/fast-element';
import type { ElementDefinitionContext } from '@microsoft/fast-foundation';
import { ActionGroup } from '../action-group/action-group';
// import { classNames } from '@microsoft/fast-web-utilities';
import type { Toolbar } from './toolbar';

// const getClasses = (_: Toolbar) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Toolbar} component.
 *
 * @public
 */
export function ToolbarTemplate<T extends Toolbar>(context: ElementDefinitionContext) {
	const actionGroupTag = context.tagFor(ActionGroup);
	return html<T> `
		<template
			aria-label="${x => x.ariaLabel}"
			aria-labelledby="${x => x.ariaLabelledby}"
			aria-orientation="${x => x.orientation}"
			orientation="${x => x.orientation}"
			role="toolbar"
			@click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
			@focusin="${(x, c) => x.focusinHandler(c.event as FocusEvent)}"
			@keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
			${children({
		property: 'childItems',
		attributeFilter: ['disabled', 'hidden'],
		selector: '*',
		subtree: true,
	})}
        >
			${x => x.label}
			<${actionGroupTag}>
			<slot
					${slotted({
		filter: elements(),
		property: 'slottedItems',
	})}
			></slot>
			</${actionGroupTag}>
		</template>`;
}
