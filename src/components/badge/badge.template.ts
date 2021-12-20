import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import type { Badge } from './badge.base';

const getConnotationClass = (x: Badge) => (x.connotation ? `connotation-${x.connotation}` : '');

/**
 * The template for the {@link @microsoft/fast-foundation#Badge} component.
 * @public
 */
export const badgeTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Badge> = () => html`
    <template>
        <span class="control ${getConnotationClass}">
			${(x) => x.text}
		</span>
    </template>
`;
