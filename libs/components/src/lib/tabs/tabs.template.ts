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
}: Tabs) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		[`orientation-${orientation}`, Boolean(orientation)],
		`gutters-${gutters ?? 'small'}`,
		['scroll', Boolean(scrollablePanel)]
	);

function setShadowWhenScrollTabs(_: Tabs, { event }: ExecutionContext) {
	const scrollWrapper = event.target as HTMLElement;
	const scrollShadow = scrollWrapper!.parentElement;

	if (
		!(scrollShadow && scrollWrapper && scrollWrapper.scrollLeft !== undefined)
	) {
		return;
	}

	if (scrollWrapper.scrollWidth <= scrollWrapper.clientWidth) {
		scrollShadow.classList.toggle('start-scroll', false);
		scrollShadow.classList.toggle('end-scroll', false);
		return;
	}
	scrollShadow.classList.toggle('start-scroll', scrollWrapper.scrollLeft > 0);

	scrollShadow.classList.toggle(
		'end-scroll',
		scrollWrapper.scrollLeft <
			scrollWrapper.scrollWidth - scrollWrapper.clientWidth
	);
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
				<div class="scroll-shadow">
					<div
						class="tablist-wrapper"
						@scroll="${setShadowWhenScrollTabs}"
					>
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
				<div class="tabpanel">
					<slot name="tabpanel" ${slotted('tabpanels')}></slot>
				</div>
			</div>
		</template>
	`;
}
