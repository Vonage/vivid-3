import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { ProgressRing } from './progress-ring';

const getClasses = (_: ProgressRing) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#ProgressRing} component.
 *
 * @param context
 * @public
 */
export const ProgressRingTemplate: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => ViewTemplate<ProgressRing> = (
  context: ElementDefinitionContext
) => html` <span class="${getClasses}">${context.name} </span>`;
