import {html, repeat} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Pagination } from './pagination';

const getClasses = (_: Pagination) => classNames('control');
const getButtonClasses = (pageText: string) => classNames(
	'vwc-pagination-button',
	['vwc-pagination-dots', pageText === '...'],
);
/**
 * The template for the {@link @microsoft/fast-foundation#Pagination} component.
 *
 * @param context
 * @public
 */

export const PaginationTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Pagination> = () => html`<div class="${getClasses}">
		${repeat(x => x.pagesList, html`
			<vwc-button class="${getButtonClasses}"
									label="${(x) => x}">
			</vwc-button>
		`, { positioning: true })}
</div>`;

