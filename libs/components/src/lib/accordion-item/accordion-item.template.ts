import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { focusTemplateFactory } from './../../shared/patterns/focus';
import type { AccordionItem } from './accordion-item';

const PANEL = 'panel';

const getClasses = ({
	open, iconTrailing, icon, noIndicator
}: AccordionItem) => classNames(
	'control',
	['open', open],
	['icon', Boolean(icon)],
	['icon-trailing', iconTrailing],
	['no-indicator', noIndicator],
);

export const AccordionItemTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<AccordionItem> = (context) => html<AccordionItem>`
	<div class="${getClasses}">
		${x => renderPanelHeader(context, x.headingLevel)}
		<div class="body" id="${PANEL}" role="region" aria-labelledby="header">
			<slot></slot>
		</div>
	</div>
`;

const renderPanelHeader = (context: ElementDefinitionContext, headingLevel: number | string | undefined) => {
	const header: string = headingLevel ? 'h' + headingLevel : 'h3';
	return html<AccordionItem>`
	<${header} class="header">
		${renderHeaderButton(context)}
	</${header}>
	`;
};

const renderHeaderButton = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);

	return html<AccordionItem>`
	<button class="button" id="header" @click=${x => x.open = !x.open}
		?aria-expanded=${x => x.open}
		aria-controls="${PANEL}">
    ${() => focusTemplate}
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
