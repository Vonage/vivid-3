import { html } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import type { CalendarEvent } from './calendar-event';

const getClasses = (_: CalendarEvent) => classNames('base');

/**
 * The template for the {@link @microsoft/fast-foundation#CalendarEvent} component.
 *
 * @param context
 * @public
 */
export const CalendarEventTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<CalendarEvent> = (
	context: ElementDefinitionContext
) => html`<span class="${getClasses}">${context.name} </span>
<section
  role="button"
  tabindex="0"

			>
  <h2><strong>${x => x.heading}</strong></h2>
  <p>${x => x.description}</p>
</section>

`;
