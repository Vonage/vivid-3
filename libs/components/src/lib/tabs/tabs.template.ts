import { html, ref, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Tabs } from './tabs.js';

const getClasses = ({
	connotation, orientation
}: Tabs) => classNames(
	'base',
	[`connotation-${connotation}`, Boolean(connotation)],
	[`orientation-${orientation}`, Boolean(orientation)],
);

/**
 * The template for the (Tabs:class) component.
 *
 * @public
 */
export function TabsTemplate<T extends Tabs>() {
	return html<T>`
		<template>
			<div class="${getClasses}">
				<div class="tablist-wrapper">
					<div class="tablist" role="tablist" ${ref('tablist')}>
						<slot name="tab" ${slotted('tabs')}></slot>
						${when(x => x.showActiveIndicator, html<T>`
							<div ${ref('activeIndicatorRef')} class="active-indicator"></div>
						`)}
					</div>
				</div>
				<div class="tabpanel">
					<slot name="tabpanel" ${slotted('tabpanels')}></slot>
				</div>
			</div>
		</template>
	`;
}
