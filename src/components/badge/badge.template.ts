import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Badge } from './badge.base';
import { Icon } from '../icon/icon.base';

const getClasses = ({ connotation, layout }: Badge) => classNames(
	'control',
	[`connotation-${connotation}`, Boolean(connotation)],
	[`layout-${layout}`, Boolean(layout)],
);

/**
 * The template for the {@link @microsoft/fast-foundation#Badge} component.
 * @public
 */
export const badgeTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Badge> = (context: ElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);

	return html`
        <span class="${getClasses}">
			<${iconTag}></${iconTag}>
			${(x) => x.text}
		</span>`;
};
