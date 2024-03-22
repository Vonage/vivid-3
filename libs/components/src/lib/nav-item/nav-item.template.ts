import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { textAnchorTemplate } from '../text-anchor/text-anchor.template';
import type { NavItem } from './nav-item';

/**
 * The template for the NavItem component.
 *
 * @param context - element definition context
 * @public
 */
export const NavItemTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<NavItem> = (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => html<NavItem>` ${textAnchorTemplate(context, definition)} `;
