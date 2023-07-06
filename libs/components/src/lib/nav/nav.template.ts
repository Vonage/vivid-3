import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import type { Nav } from './nav';

/**
 * The template for the Nav component.
 *
 * @param context - element definition context
 * @public
 */
export const NavTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Nav> = (
) => html<Nav>`
		<nav><slot></slot></nav>
    `;
