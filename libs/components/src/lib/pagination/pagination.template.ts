import {html, repeat} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Pagination } from './pagination';

const getClasses = (_: Pagination) => classNames('control');

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
			<vwc-button class="vwc-pagination-button"
									label="${(_, c) => (c.index + 1)}">
			</vwc-button>
		`, { positioning: true })}
</div>`;
