import {
	ExecutionContext,
	html,
	ref,
	slotted,
	when,
} from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Tabs } from './tabs.js';

const getClasses = ({
	connotation,
	orientation,
	gutters,
	scrollablePanel,
	tabsLayout,
	_actionItemsSlottedContent,
}: Tabs) =>
	classNames(
		'base',
		`layout-${tabsLayout ?? 'align-start'}`,
		[`connotation-${connotation}`, Boolean(connotation)],
		[`orientation-${orientation}`, Boolean(orientation)],
		`gutters-${gutters ?? 'small'}`,
		['scroll', Boolean(scrollablePanel)],
		['has-action-items', Boolean(_actionItemsSlottedContent.length)]
	);

function setNoScrollState(
	scrollShadow: HTMLElement,
	scrollWrapper: HTMLElement
) {
	if (scrollWrapper.scrollWidth <= scrollWrapper.clientWidth) {
		scrollShadow.classList.toggle('start-scroll', false);
		scrollShadow.classList.toggle('end-scroll', false);
		return true;
	}
	return false;
}

function addStartShadow(scrollShadow: HTMLElement, scrollWrapper: HTMLElement) {
	scrollShadow.classList.toggle('start-scroll', scrollWrapper.scrollLeft > 0);
}

function addEndShadow(scrollShadow: HTMLElement, scrollWrapper: HTMLElement) {
	scrollShadow.classList.toggle(
		'end-scroll',
		scrollWrapper.scrollLeft <
			scrollWrapper.scrollWidth - scrollWrapper.clientWidth
	);
}

function setShadowWhenScrollTabs(_: Tabs, { event }: ExecutionContext) {
	const scrollWrapper = event.target as HTMLElement;
	const scrollShadow = scrollWrapper!.parentElement as HTMLElement;

	if (setNoScrollState(scrollShadow, scrollWrapper)) {
		return;
	}

	addStartShadow(scrollShadow, scrollWrapper);
	addEndShadow(scrollShadow, scrollWrapper);
}

/**
 * The template for the (Tabs:class) component.
 *
 * @public
 */
export function TabsTemplate<T extends Tabs>() {
	return html<T>`
		<template>
			<div class="${getClasses}">
				<div class="tabs">
					<div class="scroll-shadow">
						<div class="tablist-wrapper" @scroll="${setShadowWhenScrollTabs}">
							<div class="tablist" role="tablist" ${ref('tablist')}>
								<slot name="tab" ${slotted('tabs')}></slot>
								${when(
									(x) => x.showActiveIndicator,
									html<T>`
										<div
											${ref('activeIndicatorRef')}
											class="active-indicator"
										></div>
									`
								)}
							</div>
						</div>
					</div>
					<slot
						name="action-items"
						${slotted('_actionItemsSlottedContent')}
					></slot>
				</div>
				<div class="tabpanel" part="tab-panel">
					<slot name="tabpanel" ${slotted('tabpanels')}></slot>
				</div>
			</div>
		</template>
	`;
}
