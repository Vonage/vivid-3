import type { ViewTemplate } from '@microsoft/fast-element';
import { html, slotted } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { DatePickerBaseTemplate } from '../../shared/date-picker/date-picker-base.template';
import type { DateRangePicker } from './date-range-picker';

/**
 * The template for the DateRangePicker component.
 *
 * @public
 */
export const DateRangePickerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<DateRangePicker> = (context: ElementDefinitionContext, definition: FoundationElementDefinition) => {
	return html`
		${DatePickerBaseTemplate(context, definition)}
		<slot ${slotted('_defaultSlottedContent')}></slot>
	`;
};
