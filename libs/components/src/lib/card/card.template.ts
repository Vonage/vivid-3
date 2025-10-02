import {
	html,
	InlineTemplateDirective,
	slotted,
	ViewTemplate,
	when,
} from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Appearance } from '../enums';
import { Icon } from '../icon/icon';
import { Elevation } from '../elevation/elevation';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { Card } from './card';

const getClasses = (_: Card) =>
	classNames(
		'base',
		['hide-footer', !_.footerSlottedContent || !_.footerSlottedContent.length],
		['hide-header', shouldHideHeader(_)]
	);

function renderHeaderIcon(iconTag: InlineTemplateDirective) {
	return html<Card>`
		<${iconTag} class="icon" inline name="${(x) => x.icon}"></${iconTag}>`;
}

function Headline() {
	return html` <div class="header-headline">${(x) => x.headline}</div> `;
}

function Subtitle() {
	return html` <div class="header-subtitle">${(x) => x.subtitle}</div> `;
}

function headerContent() {
	return html`
		<div class="header-content">
			${when((x) => x.headline, Headline())}
			${when((x) => x.subtitle, Subtitle())}
		</div>
	`;
}

/**
 header
 */
function renderHeader(iconTag: InlineTemplateDirective) {
	return html<Card>` <div class="header">
		<slot name="graphic" ${slotted('graphicSlottedContent')}
			>${when((x) => x.icon, renderHeaderIcon(iconTag))}</slot
		>
		${when((x) => x.headline || x.subtitle, headerContent())}
	</div>`;
}

function shouldHideHeader(card: Card) {
	// eslint-disable-next-line max-len
	return (
		!card.headline &&
		!card.subtitle &&
		!card.icon &&
		(!card.graphicSlottedContent || !card.graphicSlottedContent.length)
	);
}

function renderMetaSlot() {
	return html` <slot name="meta" ${slotted('metaSlottedContent')}></slot> `;
}

function text() {
	return html` <div class="text">${(x) => x.text}</div> `;
}

function renderButtonElement(content: ViewTemplate<Card>) {
	return html<Card>`<button
		class="${getClasses}"
		type="button"
		${delegateAria()}
	>
		${content}
	</button>`;
}

function renderCardBaseElement(x: Card, content: ViewTemplate<Card>) {
	if (x.href) {
		return x._renderLinkElement(content, getClasses);
	} else if (x.clickableCard) {
		return renderButtonElement(content);
	} else {
		return html`<div class="${getClasses}">${content}</div>`;
	}
}

function renderCardContent(context: VividElementDefinitionContext) {
	const iconTag = context.tagFor(Icon);

	return html`
		${(x) =>
			renderCardBaseElement(
				x,
				html`<div class="wrapper">
					<div class="vwc-card-media">
						<slot name="media"></slot>
					</div>
					<slot name="main">
						<div class="main-content">
							<div class="header-wrapper">
								${renderHeader(iconTag)} ${renderMetaSlot()}
							</div>
							${when((x) => x.text, text())}
						</div>
					</slot>
					<div class="footer">
						<slot name="footer" ${slotted('footerSlottedContent')}></slot>
					</div>
				</div> `
			)}
	`;
}

export const CardTemplate = (context: VividElementDefinitionContext) => {
	const elevationTag = context.tagFor(Elevation);

	return html<Card>`
		${when(
			(x) =>
				x.appearance !== Appearance.Ghost &&
				x.appearance !== Appearance.Outlined,
			html`
			<${elevationTag} dp=${(x) => x.elevation ?? '4'}>
			  ${renderCardContent(context)}
			</${elevationTag}>
		`
		)}
		${when(
			(x) => x.appearance === Appearance.Outlined,
			html`
			<${elevationTag} dp='0')}>
			  ${renderCardContent(context)}
			</${elevationTag}>
		`
		)}
		${when(
			(x) => x.appearance === Appearance.Ghost,
			html` ${renderCardContent(context)} `
		)}
	`;
};
