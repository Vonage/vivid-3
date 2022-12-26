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
 * @returns HTMLElement - template
 */
export const NavTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Nav> = (
) => html<Nav>`
		<nav><slot></slot></nav>
    `;
