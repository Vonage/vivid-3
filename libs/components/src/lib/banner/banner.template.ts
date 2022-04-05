import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Banner } from './banner';

const getClasses = (_: Banner) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Banner} component.
 *
 * @param context
 * @public
 */
export const BannerTemplate: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => ViewTemplate<Banner> = (context: ElementDefinitionContext) => html` <span
  class="${getClasses}"
>${context.name}
</span>`;
