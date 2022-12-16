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
 * The template for the {@link @microsoft/fast-foundation#Menu} component.
 *
 * @param context
 * @public
 */
export const MenuTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ElementViewTemplate = (context: ElementDefinitionContext) => {
	const popupTag = context.tagFor(Popup);

	return html<Menu>`
		<template
			slot="${x => (x.slot || x.isNestedMenu() ? 'submenu' : void 0)}"
		>
			<${popupTag}
				:placement=${(x) => x.placement}
				:open=${(x) => x.open}
				:anchor=${(x) => x.anchor}
				@open="${x => x.popupOpenChanged()}"
				@close="${x => x.popupOpenChanged()}"
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
