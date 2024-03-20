import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ActionGroup } from './action-group';

const getClasses = ({ appearance, shape, tight }: ActionGroup) =>
	classNames(
		'base',
		[`appearance-${appearance}`, Boolean(appearance)],
		[`shape-${shape}`, Boolean(shape)],
		['tight', tight]
	);

/**
 * The template for the action-group component.
 *
 * @param context - element definition context
 * @public
 */
export const ActionGroupTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<ActionGroup> = () => html` <div
	class="${getClasses}"
	role="${(x) => (x.role ? x.role : 'group')}"
	aria-label="${(x) => x.ariaLabel}"
>
	<slot></slot>
</div>`;
