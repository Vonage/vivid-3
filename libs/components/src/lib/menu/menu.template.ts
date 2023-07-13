import {
	type ElementViewTemplate,
	html,
	ref,
	slotted
} from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { Popup } from '../popup/popup';
import type { Menu } from './menu';


/**
 * The template for the Menu component.
 *
 * @param context - element definition context
 * @public
 */
export const MenuTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ElementViewTemplate = (context: ElementDefinitionContext) => {
	const popupTag = context.tagFor(Popup);

	function handlePopupEvents(x: Menu, state: boolean) {
		x.open = state;
	}
	return html<Menu>`
		<template>
			<${popupTag}
				:placement=${(x) => x.placement}
				:open=${(x) => x.open}
				:anchor=${(x) => x.anchor}
				@vwc-popup:open="${x => handlePopupEvents(x, true)}"
				@vwc-popup:close="${x => handlePopupEvents(x, false)}"
				${ref('_popup')}
			>
				<div
					class="base"
					role="menu"
					@keydown="${(x, c) => x.handleMenuKeyDown(c.event as KeyboardEvent)}"
					@focusout="${(x, c) => x.handleFocusOut(c.event as FocusEvent)}"
				>
					<slot ${slotted('items')}></slot>
				</div>
		</${popupTag}>
	</template>`;
};
