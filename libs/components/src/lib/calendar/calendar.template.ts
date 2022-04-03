import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
  ElementDefinitionContext,
  FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { Calendar } from './calendar';

const getClasses = (_: Calendar) => classNames('control');

/**
 * The template for the {@link @microsoft/fast-foundation#Calendar} component.
 *
 * @param context
 * @public
 */
export const CalendarTemplate: (
  context: ElementDefinitionContext,
  definition: FoundationElementDefinition
) => ViewTemplate<Calendar> = (context: ElementDefinitionContext) => html` <span
  class="${getClasses}"
>
</span>`;
