import { elements, html, ref, slotted, when } from '@microsoft/fast-element';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { Badge } from '../badge/badge';
import { Country } from '../country/country';
import { Popup } from '../popup/popup';
import type { CountryGroup } from './country-group';

export const CountryGroupTemplate = (
	context: VividElementDefinitionContext
) => {
	const countryTagName = context.tagFor(Country, true);
	const badgeTag = context.tagFor(Badge);
	const popupTag = context.tagFor(Popup);

	return html<CountryGroup>`
		<template>
			<div class="container"
					 @mouseenter="${(x) => (x.popupOpened = true)}"
					 @mouseleave="${(x) => (x.popupOpened = false)}">
				<slot
					${ref('slotElement')}
					${slotted({
						property: 'countryItems',
						filter: elements(countryTagName),
					})}
				></slot>
				${when(
					(x) => x.overflowedCountries.size > 0,
					html<CountryGroup>`
						<div class="badge"
								 ${ref('badgeElement')}>
							<${badgeTag}
								connotation="accent"
								appearance="subtle-light"
								shape="pill"
								text="${(x) => '+' + x.overflowedCountries.size}"
							></${badgeTag}>
						</div>`
				)}
			</div>
			<${popupTag}
				placement="top"
				alternate
				arrow
				:anchor="${(x) => x.badgeElement}"
				:open="${(x) => x.popupOpened}"
				exportparts="vvd-theme-alternate"
			>
				<div
					${ref('popupContents')}
					class="popupContents">
				</div>
			</${popupTag}>
		</template>
	`;
};
