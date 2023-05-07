import {children, elements, html, repeat, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import {Button} from '../button/button';
import type { Pagination } from './pagination';

const handleSelection = (value: string | number, {parent: x}: {parent: Pagination}) => {
	return x.selectedIndex = (Number(value) - 1);
};

const handleKeyDown = (value: string | number, {event, parent}: {event: KeyboardEvent, parent: Pagination}) => {
	if (event.key === ' ' || event.key === 'Enter') {
		handleSelection(value, {parent});
	}
};

const getClasses = (_: Pagination) => classNames('control');

function getButtonAppearance(value: string | number, {parent}: {parent: Pagination}) {
	return (parent.selectedIndex === Number(value) - 1) ? 'filled' : 'ghost';
}

const paginationButtonRenderer = (buttonTag: string) => html`
	${when(value => value !== '...',
		html`
		<${buttonTag} class="vwc-pagination-button"
									label="${(value) => value}"
									appearance="${getButtonAppearance}"
									size="super-condensed"
									tabindex="1"
									aria-pressed="${(value, {parent}) => parent.selectedIndex === Number(value) - 1}"
									@click="${handleSelection}"
									@keydown="${handleKeyDown}"
		</${buttonTag}>
	`)}
	${when(value => value === '...', html`<div class="dots">...</div>`)}`;
/**
 * The template for the {@link @microsoft/fast-foundation#Pagination} component.
 *
 * @param context
 * @public
 */

export const PaginationTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Pagination> = (context) => {
	const buttonTag = context.tagFor(Button);
	const paginationButtonTemplate = paginationButtonRenderer(buttonTag)
	return html<Pagination>`
	<div class="${getClasses}">
		<${buttonTag} class="prev-button"
									label="${x => !x.navIcons ? 'Previous' : null}"
									icon="${x => x.navIcons ? 'chevron-left-line' : null}"
									size="super-condensed"
									?disabled="${x => x.total === 0 || x.selectedIndex === 0}"
									@click="${x => (x.selectedIndex !== undefined) && x.selectedIndex--}"
		></${buttonTag}>
		<div id="buttons-wrapper" class="buttons-wrapper" ${children({ property: 'paginationButtons', filter: elements('vwc-button') })}>
			${repeat(x => x.pagesList, paginationButtonTemplate, { positioning: true })}
		</div>
		<${buttonTag} class="next-button"
									label="${x => !x.navIcons ? 'Next' : null}"
									icon="${x => x.navIcons ? 'chevron-right-line' : null}"
									size="super-condensed"
									?disabled="${x => x.total === 0 || x.selectedIndex === (x.total - 1)}"
									@click="${x => (x.selectedIndex !== undefined) && x.selectedIndex++}"
		></${buttonTag}>
</div>`;
};

