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
			${when(value => value !== '...', html`<${buttonTag} class="vwc-pagination-button"
											label="${(value) => value}"
											@click="${handleSelection}"
											@keydown="${handleKeyDown}"
											connotation="accent"
											appearance="${getButtonAppearance}"
				</${buttonTag}>
			`)}
			${when(value => value === '...', html`<span class="vwc-pagination-dots">...</span>`)}`
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
	return html<Pagination>`
	<div class="${getClasses}">
		<${buttonTag} class="vwc-pagination-prev-button" icon='chevron-left-line'
									?disabled="${x => x.total === 0 || x.selectedIndex === 0}"
									@click="${x => (x.selectedIndex !== undefined) && x.selectedIndex--}"
		></${buttonTag}>
		<span id="buttons-wrapper"${children({ property: 'paginationButtons', filter: elements('vwc-button') })} >
			${repeat(x => x.pagesList, paginationButtonRenderer(buttonTag), { positioning: true })}
		</span>
		<${buttonTag} class="vwc-pagination-next-button" icon='chevron-right-line'
									?disabled="${x => x.total === 0 || x.selectedIndex === (x.total - 1)}"
									@click="${x => (x.selectedIndex !== undefined) && x.selectedIndex++}"
		></${buttonTag}>
</div>`;
};

