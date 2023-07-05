import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import type { Focus } from './focus';

/**
 * The template for the Focus component.
 *
 * @param context - element definition context
 * @public
 */
export const focusTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Focus> = () => html`
        <span class="control"></span>`;
