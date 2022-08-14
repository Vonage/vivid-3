import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Menu } from './menu';

const getClasses = (_: Menu) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Menu} component.
 *
 * @param context
 * @public
 */
export const MenuTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Menu> = (context: ElementDefinitionContext) => html` <span
	class="${getClasses}"
	>${context.name}
</span>`;
