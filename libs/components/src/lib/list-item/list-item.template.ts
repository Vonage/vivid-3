import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import type { ListItem } from './list-item';

const getClasses = ({
	iconTrailing, icon
}: ListItem) => classNames(
	'base',
	['icon', Boolean(icon)],
	['icon-trailing', iconTrailing],
);

export const ListItemTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<ListItem> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html`
    <li class="${getClasses}">
		${x => affixIconTemplate(x.icon)}
		<div class="text-content">
			${when(x => x.text, html`<div class="text">${x => x.text}</div>`)}
			${when(x => x.subtext, html`<div class="subtext">${x => x.subtext}</div>`)}
		</div>
		${when(x => x.meta, html`<vwc-icon class="meta" type="${x => x.meta}"></vwc-icon>`)}
	</li>`;
};
