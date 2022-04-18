import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import type { AccordionItem } from './accordion-item';

const getClasses = ({
	open, iconTrailing, icon, dense, noIndicator
}: AccordionItem) => classNames(
	'control',
	['open', open],
	['icon', Boolean(icon)],
	['icon-trailing', iconTrailing],
	['dense', dense],
	['no-indicator', noIndicator],
);

export const AccordionItemTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<AccordionItem> = (context) => html<AccordionItem>`
	<div class="${getClasses}">
		${x => renderPanelHeader(context, x.headingLevel)}
		<div class="accordion-item-body" id="content" role="region" aria-labelledby="header">
			<slot></slot>
		</div>
	</div>
`;

const renderPanelHeader = (context: ElementDefinitionContext, headingLevel: number | string | undefined) => {
	const header: string = headingLevel ? 'h' + headingLevel : 'h3';
	return html<AccordionItem>`
	<${header} class="accordion-item-header">
		${renderHeaderButton(context)}
	</${header}>
	`;
};

const renderHeaderButton = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<AccordionItem>`
	<button class="accordion-item-button" id="header" @click=${x => x.open ? x.hide() : x.show()}
		?aria-expanded=${x => x.open}
		aria-controls="content">
		${x => affixIconTemplate(x.icon)}
		<span class="heading-text">${x => x.heading}</span>
		${when(x => x.meta, html`<span class="meta">${x => x.meta}</span>`)}
		<span class="indicator">
			${when(x => !x.noIndicator && !x.iconTrailing, html`
			<vwc-icon class="toggle-open" type='chevron-down-solid'></vwc-icon>
			<vwc-icon class="toggle-close" type='chevron-up-solid'></vwc-icon>
			`)}
		</span>
	</button>
`;
};