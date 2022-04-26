import { html, slotted, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Card } from './card';

const getClasses = (_: Card) => classNames(
	'control',
	['hide-footer', !_.hasFooter || !_.hasFooter.length],
	['hide-header', shouldHideHeader(_)]
);

/**
header icon
 */
function renderHeaderIcon() {
	return html<Card>`
	  <vwc-icon class="icon" inline type="${x => x.icon}"></vwc-icon>`;
}

/**
 *
 */
function heading() {
	return html`
		<div class="header-title">${(x) => x.heading}</div>
	`;
}

/**
 *
 */
function subtitle() {
	return html`
		<div class="header-subtitle">${(x) => x.subtitle}</div>
	`;
}

/**
 *
 */
function headerContent() {
	return html`
		<div class="header-content">
			${when(x => x.heading, heading())}
			${when(x => x.subtitle, subtitle())}
		</div>
	`;
}

/**
 *
 */
function text() {
	return html`
		<div class="text">${(x) => x.text}</div>
	`;
}


/**
 * @param card
 */
function shouldHideHeader(card:Card) {
	// eslint-disable-next-line max-len
	return 	!card.heading  && !card.subtitle && !card.icon && (!card.hasGraphic || !card.hasGraphic.length) && (!card.hasMeta || !card.hasMeta.length);
}

/**
header
 */
function renderHeader() {
	return html<Card>`
		<header class="header">
			<slot name="graphic" ${slotted('hasGraphic')}>${when(x => x.icon, renderHeaderIcon())}</slot>
			${when(x => x.heading || x.subtitle, headerContent())}
			<slot name="meta" ${slotted('hasMeta')}></slot>
		</header>`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Card} component.
 *
 * @param context
 * @public
 */
export const CardTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Card> = () => html<Card>`
	<vwc-elevation dp=${(x => x.elevation ??  '4')}>
				<div class="${getClasses}">
					<div class="wrapper">
						<div class="vwc-card-media">
							<slot name="media"></slot>
						</div>
						<div class="content">
							<slot name="content">
								${renderHeader()}
								${when(x => x.text, text())}
							</slot>
						</div>
						<div class="footer">
							<slot name="footer" ${slotted('hasFooter')}></slot>
						</div>
					</div>
				</div>
			</vwc-elevation>
`;
