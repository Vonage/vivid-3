import { html, ref, slotted, when } from '@microsoft/fast-element';
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


function setShadowWhenScrollTabs(x: Tabs) {
	//const tabsWrapper = document.querySelector('.tabs-wrapper');
	const overflow = x.shadowRoot.querySelector('.tablist-wrapper') as HTMLElement;
	console.log("overflow is", overflow);



		return "--start-shadow: 1";


	// const scrollLeft = overflow.scrollLeft;
	//
	//
	// if (scrollLeft > 0) {
	// 	return "--start-shadow: 1";
	// } else {
	// 	return "--start-shadow: 0";
	// }
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
				<div class="tablist-wrapper" style=${setShadowWhenScrollTabs}>
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
				<div class="tabpanel">
					<slot name="tabpanel" ${slotted('tabpanels')}></slot>
				</div>
			</div>
		</template>
	`;
}
