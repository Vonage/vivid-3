import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Breadcrumb } from './breadcrumb';

const getClasses = (_: Breadcrumb) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Breadcrumb} component.
 *
 * @param context
 * @public
 */
export const BreadcrumbTemplate: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => ViewTemplate<Breadcrumb> = (
  context: ElementDefinitionContext
) => html` <span class="${getClasses}"> </span>`;
