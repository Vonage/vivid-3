import { html, repeat } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import type { Calendar } from './calendar';
import {
	getFirstDateOfTheWeek,
	getValidDateString
} from './helpers/calendar.date-functions';


/**
 * the html days markup
 *
 * @internal
 */
const HoursTemplate = () => {
	return html`
  <div class="row-headers" role="presentation">
    ${repeat(x => x.hoursAsDatetime, html<string>`<span role="rowheader">
      <time datetime="${(x: Date, c) =>	new Intl.DateTimeFormat(c.parent.locales, {
		hour: 'numeric', minute: 'numeric',	hour12: false
	}).format(x)}">
						${(x: Date, c) => new Intl.DateTimeFormat(c.parent.locales, {
		hour: 'numeric', hour12: c.parent.hour12
	}).format(x)}
					</time>
				</span>`)}
  </div>`;
};

/**
 * The html days markup
 *
 * @internal
 */
const DaysTemplate = () => {
	return html`
			<div class="column-headers" role="row">
				${repeat(x => x.getDaysAsDatetime([getFirstDateOfTheWeek(x.datetime, x.startDay)]), html<string>`
						<div role="columnheader" tabindex="-1">
              <time datetime=${(x: Date) => getValidDateString(x)}>
                <h2>
									<!-- TODO add to column aria-labelledby or describedby to count
                  events and related day e.g. "3 events, Sunday, March 8" -->
									<em tabindex="0" role="button" aria-label=${(x: Date, c) => new Intl.DateTimeFormat(c.parent.locales, {
		weekday: 'long', month: 'long', day: 'numeric'
	}).format(x)}>
										${(x: Date, c) => new Intl.DateTimeFormat(c.parent.locales, { day: '2-digit' }).format(x)}
									</em>
									<small aria-hidden="true">
										${(x: Date, c) => new Intl.DateTimeFormat(c.parent.locales, { weekday: 'short' }).format(x)}
									</small>
                </h2>
              </time>
						</div>`)}
			</div>`;
};

const ColumnTemplate = html<string>`
            <div role="gridcell" tabindex="-1">
              <slot name="day-${(_, c) => c.index}"></slot>
            </div>
          `;
/**
 * The template for the {@link @microsoft/fast-foundation#Calendar} component.
 *
 * @param context
 * @public
 */
export const CalendarTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Calendar> = () => html`
  <div role="grid" @keydown=${(x, c) => x.onKeydown(c.event as KeyboardEvent)}>
    ${DaysTemplate}
    <div role="row" class="calendar-row">
      ${HoursTemplate}
      <div class="calendar-grid-presentation" role="presentation">
        <div class="hours" role="list">
          ${repeat(x => Array.from({ length: x.hoursAsDatetime.length + 1 }),	html<string>`
            <div role="listitem"></div>`)}
        </div>
        <div class="columns" role="presentation">
          ${repeat(x => Array.from(Array(x._days)), ColumnTemplate, { positioning: true })}
        </div>
        <slot></slot>
      </div>
    </div>
  </div>
`;
