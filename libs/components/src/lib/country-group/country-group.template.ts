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
		<div
			class="hover-root"
			@mouseenter="${(x) => x.handleMouseEnter()}"
			@mouseleave="${(x) => x.handleMouseLeave()}"
		>
			<div class="row" ${ref('rowEl')}>
				<slot
					${slotted({
						property: 'countryItems',
						filter: elements(countryTagName),
					})}
				></slot>
				${when(
					(x) => x.overflowCount > 0,
					html<CountryGroup>`
						<div class="overflow-wrap" ${ref('overflowWrapEl')}>
							<${badgeTag}
								${ref('badgeEl')}
								connotation="accent"
								appearance="subtle-light"
								shape="pill"
								text="${(x) => '+' + x.overflowCount}"
							></${badgeTag}>
						</div>
					`
				)}
			</div>
			${when(
				(x) => x.overflowCount > 0,
				html<CountryGroup>`
					<${popupTag}
						strategy="fixed"
						placement="top"
						alternate
						arrow
						:anchor="${(x) => x.overflowWrapEl}"
						:open="${(x) => x.popupOpen}"
						exportparts="vvd-theme-alternate"
						@keydown="${(x, c) => x.popupKeydown(c.event as Event)}"
					>
						<div
							class="overflow-grid"
							${ref('overflowGridEl')}
							aria-hidden="true"
						></div>
					</${popupTag}>
				`
			)}
		</div>
	`;
};
