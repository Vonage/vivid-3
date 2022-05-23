import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { TopAppBar } from './top-app-bar';

const getClasses = (_: TopAppBar) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#TopAppBar} component.
 *
 * @param context
 * @public
 */
export const TopAppBarTemplate: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => ViewTemplate<TopAppBar> = (
  context: ElementDefinitionContext
) => html` <span class="${getClasses}">${context.name} </span>`;
