import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Progress } from './progress';

const getClasses = (_: Progress) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Progress} component.
 *
 * @param context
 * @public
 */
export const ProgressTemplate: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => ViewTemplate<Progress> = (context: ElementDefinitionContext) => html` <span
  class="${getClasses}"
  >${context.name}
</span>`;
