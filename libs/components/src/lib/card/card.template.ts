import { html, slotted, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import { Elevation } from '../elevation/elevation';
import type { Card } from './card';

const getClasses = (_: Card) => classNames(
	'base',
	['hide-footer', !_.footerSlottedContent || !_.footerSlottedContent.length],
	['hide-header', shouldHideHeader(_)]
);

/**
header icon
 */
function renderHeaderIcon(iconTag: string) {
	return html<Card>`
	  <${iconTag} class="icon" inline name="${x => x.icon}"></${iconTag}>`;
}

/**
 *
 */
function Headline() {
	return html`
		<div class="header-headline">${(x) => x.headline}</div>
	`;
}

/**
 *
 */
function Subtitle() {
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
			${when(x => x.headline, Headline())}
			${when(x => x.subtitle, Subtitle())}
		</div>
	`;
}

/**
 header
 */
function renderHeader(iconTag: string) {

	return html<Card>`
		<header class="header">
			<slot name="graphic" ${slotted('graphicSlottedContent')}>${when(x => x.icon, renderHeaderIcon(iconTag))}</slot>
			${when(x => x.headline || x.subtitle, headerContent())}
		</header>`;
}


/**
 * @param card
 */
function shouldHideHeader(card:Card) {
	// eslint-disable-next-line max-len
	return 	!card.headline  && !card.subtitle && !card.icon && (!card.graphicSlottedContent || !card.graphicSlottedContent.length);
}

/**
 *
 */
function renderMetaSlot() {
	return html`
		<slot name="meta" ${slotted('metaSlottedContent')}></slot>
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
 * The template for the {@link @microsoft/fast-foundation#Card} component.
 *
 * @param context
 * @public
 */
export const CardTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Card> = (context: ElementDefinitionContext) => {
	const elevationTag = context.tagFor(Elevation);
	const iconTag = context.tagFor(Icon);

	return html<Card>`
	<${elevationTag} dp=${(x => x.elevation ?? '4')}>

		<div class="${getClasses}">
			<div class="wrapper">
				<div class="vwc-card-media">
					<slot name="media"></slot>
				</div>
				<slot name="main">
					<div class="main-content">
						<div class="header-wrapper">
							${renderHeader(iconTag)}
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

	</${elevationTag}>
`;
};