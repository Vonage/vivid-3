import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import type { Sidenav } from './sidenav';

/**
 * The template for the {@link @microsoft/fast-foundation#Sidenav} component.
 *
 * @param context
 * @param definition
 * @public
 */
export const SidenavTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Sidenav> = (
	) => html<Sidenav>`
		<nav><slot></slot></nav>
    `;
