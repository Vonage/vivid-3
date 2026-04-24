import { html, ref, when } from '@microsoft/fast-element';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { Badge } from '../badge/badge';
import { Popup } from '../popup/popup';
import type { CountryGroup } from './country-group';

export const CountryGroupTemplate = (
	context: VividElementDefinitionContext
) => {
	const badgeTag = context.tagFor(Badge);
	const popupTag = context.tagFor(Popup);
	return html<CountryGroup>`
		<div
			class="container"
			${delegateAria({
				role: 'group',
				ariaLabel: (x) => x.ariaLabel || x.computedAriaLabel,
			})}
		>
			<slot ${ref('slotEl')}></slot>
			<span class="io-resize-sentinel" ${ref('sentinelEl')}></span>
			${when(
				(x) => x.overflowCount > 0,
				html<CountryGroup>`
					<div
						class="overflow-wrap"
						${ref('overflowWrapEl')}
						style="order: ${(x) => x.lastVisibleIndex};"
						@mouseenter="${(x) => x.handleMouseEnter()}"
						@mouseleave="${(x) => x.handleMouseLeave()}"
					>
						<${badgeTag}
							${ref('badgeEl')}
							connotation="cta"
							appearance="duotone"
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
				>
					<div
						class="overflow-grid"
						${ref('overflowGridEl')}
						aria-hidden="true"
					></div>
				</${popupTag}>
			`
		)}
	`;
};
