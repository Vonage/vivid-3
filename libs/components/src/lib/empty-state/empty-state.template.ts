import { html, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { EmptyState } from './empty-state';

const getClasses = ({
	connotation,
	iconDecoration,
	slottedActionItems,
}: EmptyState) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		[`icon-decoration-${iconDecoration}`, Boolean(iconDecoration)],
		['no-actions', slottedActionItems?.length === 0]
	);

export const EmptyStateTemplate = (context: VividElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);

	return html<EmptyState>` <div class="${getClasses}">
		<slot name="graphic">
			${when(
				(x) => x.icon,
				html<EmptyState>`<div class="icon-container">
					<${iconTag} class="icon" name="${(x) => x.icon}"></${iconTag}>
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
