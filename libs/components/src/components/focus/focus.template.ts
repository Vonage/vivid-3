import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import type { Focus } from './focus';

/**
 * The template for the {@link @microsoft/fast-foundation#Focus} component.
 *
 * @param context
 * @public
 */
export const focusTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Focus> = () => html`
        <span class="control"></span>`;
