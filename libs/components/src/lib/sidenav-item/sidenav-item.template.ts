import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { textAnchorTemplate } from '../text-anchor/text-anchor.template';
import type { SidenavItem } from './sidenav-item';


/**
 * The template for the {@link @microsoft/fast-foundation#SidenavItem} component.
 *
 * @param context
 * @param definition
 * @public
 */
export const SidenavItemTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<SidenavItem> = (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => html<SidenavItem>`
      ${textAnchorTemplate(context, definition)}
    `;
