import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Dialog } from './dialog';

const getClasses = (_: Dialog) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Dialog} component.
 *
 * @param context
 * @public
 */
export const DialogTemplate: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => ViewTemplate<Dialog> = (context: ElementDefinitionContext) => html` <span
  class="${getClasses}"
  >${context.name}
</span>`;
