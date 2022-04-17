import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { accordionItem } from './accordion-item';

const getClasses = ({
	open, iconTrailing, icon, dense, noIndicator
}: accordionItem) => classNames(
	'control',
	['open', open],
	['icon', Boolean(icon)],
	['iconTrailing', iconTrailing],
	['dense', dense],
	['noIndicator', noIndicator],
);

export const accordionItemTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<accordionItem> = () => html<accordionItem>`
	<div class="${getClasses}">
		${x => renderPanelHeader(x.headingLevel)}
		<div class="accordion-item-body" id="content" role="region" aria-labelledby="header">
			<slot></slot>
		</div>
	</div>
`;

const renderPanelHeader = (headingLevel: number | string | undefined) => {
	const header: string = headingLevel ? 'h' + headingLevel : 'h3';
	return html<accordionItem>`
	<${header} class="accordion-item-header">
		${renderHeaderButton()}
	</${header}>
	`;
};

const renderHeaderButton = () => {
	return html<accordionItem>`
	<button class="accordion-item-button" id="header" @click=${x => x.open ? x.hide() : x.show()}
		?aria-expanded=${x => x.open}
		aria-controls="content">
		<span class="icon">
			${when(x => x.icon && !x.iconTrailing, html`<vwc-icon type="${x => x.icon}"></vwc-icon>`)}
		</span>
		<span class="heading-text">${x => x.heading}</span>
			${when(x => x.meta, html`<span class="meta">${x => x.meta}</span>`)}
		<span class="indicator">
			${when(x => x.icon && x.iconTrailing, html`<vwc-icon type="${x => x.icon}"></vwc-icon>`)}
			${when(x => !x.noIndicator && !x.iconTrailing, html`
			<vwc-icon class="toggle-open" type='chevron-down-solid'></vwc-icon>
			<vwc-icon class="toggle-close" type='chevron-up-solid'></vwc-icon>
			`)}
		</span>
	</button>
`;
};