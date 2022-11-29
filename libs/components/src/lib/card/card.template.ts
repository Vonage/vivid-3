import { html, slotted, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Card } from './card';

const getClasses = (_: Card) => classNames(
	'base',
	['hide-footer', !_.footerSlottedContent || !_.footerSlottedContent.length],
	['hide-header', shouldHideHeader(_)]
);

/**
 * 
 * @returns {HTMLElement} template
 */
function renderHeaderIcon() {
	return html<Card>`
	  <vwc-icon class="icon" inline name="${x => x.icon}"></vwc-icon>`;
}

/**
 *
 *
 * @returns {HTMLElement} template
 */
function Headline() {
	return html`
		<div class="header-headline">${(x) => x.headline}</div>
	`;
}

/**
 *
 *
 * @returns {HTMLElement} template
 */
function Subtitle() {
	return html`
		<div class="header-subtitle">${(x) => x.subtitle}</div>
	`;
}

/**
 *
 *
 * @returns {HTMLElement} template
 */
function headerContent() {
	return html`
		<div class="header-content">
			${when(x => x.headline, Headline())}
			${when(x => x.subtitle, Subtitle())}
		</div>
	`;
}

/**
 *
 *
 * @returns {HTMLElement} template
 */
function renderHeader() {

	return html<Card>`
		<header class="header">
			<slot name="graphic" ${slotted('graphicSlottedContent')}>${when(x => x.icon, renderHeaderIcon())}</slot>
			${when(x => x.headline || x.subtitle, headerContent())}
		</header>`;
}


/**
 *
 *
 * @param {Card} card - card
 * @returns {HTMLElement} template
 */
function shouldHideHeader(card:Card) {
	// eslint-disable-next-line max-len
	return 	!card.headline  && !card.subtitle && !card.icon && (!card.graphicSlottedContent || !card.graphicSlottedContent.length);
}

/**
 *
 *
 * @returns {HTMLElement} template
 */
function renderMetaSlot() {
	return html`
		<slot name="meta" ${slotted('metaSlottedContent')}></slot>
	`;
}

/**
 *
 *
 * @returns {HTMLElement} template
 */
function text() {
	return html`
		<div class="text">${(x) => x.text}</div>
	`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#Card} component.
 *
 * @returns {HTMLElement} template
 */
export const CardTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Card> = () => html<Card>`
	<vwc-elevation dp=${(x => x.elevation ?? '4')}>

		<div class="${getClasses}">
			<div class="wrapper">
				<div class="vwc-card-media">
					<slot name="media"></slot>
				</div>
				<slot name="main">
					<div class="main-content">
						<div class="header-wrapper">
							${renderHeader()}
							${renderMetaSlot()}
						</div>
						${when(x => x.text, text())}
					</div>
				</slot>
				<div class="footer">
					<slot name="footer" ${slotted('footerSlottedContent')}></slot>
				</div>
			</div>
		</div>

	</vwc-elevation>
`;
