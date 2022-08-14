import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { MenuItem } from './menu-item';

const getClasses = (_: MenuItem) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#MenuItem} component.
 *
 * @param context
 * @public
 */
export const MenuItemTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<MenuItem> = (context: ElementDefinitionContext) => html` <span
	class="${getClasses}"
	>${context.name}
</span>`;
