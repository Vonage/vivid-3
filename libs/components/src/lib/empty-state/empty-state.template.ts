import {html, slotted, when} from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import type { EmptyState } from './empty-state';

const getClasses = (x: EmptyState) => classNames('base',
	['no-actions', x.slottedActionItems?.length === 0]
);

/**
 * The template for the EmptyState component.
 *
 * @param context
 * @public
 */
export const EmptyStateTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<EmptyState> = (
	context: ElementDefinitionContext
) => {
	const iconTag = context.tagFor(Icon);

	return html<EmptyState>`
		<div class="${getClasses}">
			<slot name="graphic">
				${when(
		x => x.icon,
		html<EmptyState>`<div class="icon-container">
					<${iconTag} class="icon" name="${(x) => x.icon}" size="5"></${iconTag}>
				</div>`
	)}
			</slot>
			<div class="content">
				${when(
		(x) => x.headline,
		html<EmptyState>`<header>${(x) => x.headline}</header>`
	)}
				<slot></slot>
			</div>
			<div class="actions">
				<slot name="action-items" ${slotted('slottedActionItems')}></slot>
			</div>
		</div>`;
};

