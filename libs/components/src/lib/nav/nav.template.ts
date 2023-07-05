import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import type { Nav } from './nav';

/**
 * The template for the {@link @microsoft/fast-foundation#Nav} component.
 *
 * @param context - element definition context
 * @param definition
 * @public
 */
export const NavTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Nav> = (
) => html<Nav>`
		<nav><slot></slot></nav>
    `;
