import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Toolbar } from './toolbar';

const getClasses = (_: Toolbar) => classNames('base');

/**
 * The template for the {@link @microsoft/fast-foundation#Toolbar} component.
 *
 * @param context
 * @public
 */
export const ToolbarTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Toolbar> = () => html`
<div class="${getClasses}">
  <slot></slot>
</div>`;
