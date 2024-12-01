import {
	type ElementViewTemplate,
	html,
	ref,
	slotted,
} from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { Popup } from '../popup/popup';
import { anchorSlotTemplateFactory } from '../../shared/patterns/anchored';
import { handleEscapeKeyAndStopPropogation } from '../../shared/dialog/index';
import type { Menu } from './menu';

const getClasses = ({
	headerSlottedContent,
	actionItemsSlottedContent,
	items,
}: Menu) =>
	classNames(
		'base',
		['hide-header', !headerSlottedContent?.length],
		['hide-actions', !actionItemsSlottedContent?.length],
		['hide-body', items && !(items as unknown as HTMLElement[]).length]
	);

function handleEscapeKey(menu: Menu, event: KeyboardEvent) {
	if (menu.open && handleEscapeKeyAndStopPropogation(event)) {
		menu.open = false;
	}
	return true;
}

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
	const anchorSlotTemplate = anchorSlotTemplateFactory();

	function handlePopupEvents(x: Menu, e: Event, state: boolean) {
		e.stopPropagation();
		x.open = state;
	}

	return html<Menu>`
		<template role="presentation"
							@change="${(x, c) => x._onChange(c.event)}"
							@focusout="${(x, c) => x._onFocusout(c.event as FocusEvent)}">
			${anchorSlotTemplate}
			<${popupTag}
				${ref('_popupEl')}
				:placement=${(x) => x.placement}
				:open=${(x) => x.open}
				:anchor=${(x) => x._anchorEl}
				:strategy="${(x) => x.positionStrategy}"
				@keydown="${(x, c) => handleEscapeKey(x, c.event as KeyboardEvent)}"
				@vwc-popup:open="${(x, c) => handlePopupEvents(x, c.event, true)}"
				@vwc-popup:close="${(x, c) => handlePopupEvents(x, c.event, false)}"
			>
			<div class="${getClasses}">
				<div class="header">
					<slot name="header" ${slotted('headerSlottedContent')}></slot>
				</div>
				<div
					class="body"
					role="menu"
					aria-label="${(x) => x.ariaLabel}"
					@keydown="${(x, c) => x.handleMenuKeyDown(c.event as KeyboardEvent)}"
					@focusout="${(x, c) => x.handleFocusOut(c.event as FocusEvent)}"
				>
					<slot ${slotted('items')}></slot>
				</div>
				<footer class="action-items"><slot name="action-items"  ${slotted(
					'actionItemsSlottedContent'
				)}></slot></footer>
			</div>
		</${popupTag}>
	</template>`;
};
