import type { ViewTemplate } from '@microsoft/fast-element';
import { html, ref, repeat, when } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Button } from '../button/button';
import { Popup } from '../popup/popup';
import { TextField } from '../text-field/text-field';
import { focusTemplateFactory } from '../../shared/patterns';
import { Divider } from '../divider/divider';
import type { DatePicker } from './date-picker';
import type { CalendarGridDate, Weekday } from './calendar/calendarGrid';
import { areMonthsEqual, monthToStr } from './calendar/month';
import type { MonthPickerGridCell } from './calendar/monthPickerGrid';

function renderDialogHeader(context: ElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);
	const focusTemplate = focusTemplateFactory(context);

	return html<DatePicker>`<div class="header">
		${when(
		(x) => x.inMonthPicker,
		html<DatePicker>`
		<${buttonTag} ${ref(
	'firstFocusableEl'
)} size="super-condensed" icon="chevron-left-line" aria-label="${(x) =>
	x.locale.datePicker.prevYearLabel}" @click="${(x) =>
	x.onPrevYearClick()}"></${buttonTag}>
		`
	)}
		${when(
		(x) => !x.inMonthPicker,
		html<DatePicker>`
					<${buttonTag} ${ref(
	'firstFocusableEl'
)} size="super-condensed" icon="double-chevron-left-line" aria-label="${(
	x
) => x.locale.datePicker.prevYearLabel}" @click="${(x) =>
	x.onPrevYearClick()}"></${buttonTag}>
					<${buttonTag} size="super-condensed" icon="chevron-left-line" aria-label="${(
	x
) => x.locale.datePicker.prevMonthLabel}" @click="${(x) =>
	x.onPrevMonthClick()}"></${buttonTag}>
		`
	)}

		<div class="title">
			<button
				id="grid-label"
				class="title-action button"
				aria-live="polite"
				@click="${(x) => x.onTitleActionClick()}"
			>
				${() => focusTemplate}
				${when(
		(x) => x.inMonthPicker,
		html<DatePicker>` ${(x) => x.monthPickerYear} `
	)}
				${when(
		(x) => !x.inMonthPicker,
		html<DatePicker>`
						${(x) =>
		`${x.locale.datePicker.months.name[x.selectedMonth.month]} ${
			x.selectedMonth.year
		}`}
					`
	)}
			</button>
		</div>

		${when(
		(x) => x.inMonthPicker,
		html<DatePicker>`
			<${buttonTag} size="super-condensed" icon="chevron-right-line" aria-label="${(
	x
) => x.locale.datePicker.nextYearLabel}" @click="${(x) =>
	x.onNextYearClick()}"></${buttonTag}>
		`
	)}
		${when(
		(x) => !x.inMonthPicker,
		html<DatePicker>`
					<${buttonTag} size="super-condensed" icon="chevron-right-line" aria-label="${(
	x
) => x.locale.datePicker.nextMonthLabel}" @click="${(x) =>
	x.onNextMonthClick()}"></${buttonTag}>
					<${buttonTag} size="super-condensed" icon="double-chevron-right-line" aria-label="${(
	x
) => x.locale.datePicker.nextYearLabel}" @click="${(x) =>
	x.onNextYearClick()}"></${buttonTag}>
		`
	)}
	</div>`;
}

function renderCalendarGrid(context: ElementDefinitionContext) {
	const focusTemplate = focusTemplateFactory(context);
	const dividerTag = context.tagFor(Divider);

	return html<DatePicker>`<div
		class="calendar"
		role="grid"
		aria-labelledby="grid-label"
	>
		<div class="calendar-weekdays" role="row">
			${repeat(
		(x) => x.calendarGrid.weekdays,
		html<Weekday>`
					<div
						class="calendar-weekday"
						role="columnheader"
						aria-label="${(x) => x.name}"
					>
						${(x) => x.shortName}
					</div>
				`
	)}
		</div>
		<${dividerTag} class="calendar-separator" role="presentation"></${dividerTag}>
		${repeat(
		(x) => x.calendarGrid.grid,
		html<CalendarGridDate[]>`
				<div class="calendar-week" role="row">
					${repeat(
		(x) => x,
		html<CalendarGridDate>`<button
							class="${(x, c) =>
		classNames(
			'calendar-day',
			'button',
			['current', x.date === c.parentContext.parent.currentDate],
			['selected', x.date === c.parentContext.parent.selectedDate],
			['outside-month', x.isOutsideMonth]
		)}"
							role="gridcell"
							tabindex="${(x, c) =>
		x.date === c.parentContext.parent.tabbableDate ? 0 : -1}"
							aria-selected="${(x, c) =>
		x.date === c.parentContext.parent.selectedDate}"
							data-date="${(x) => x.date}"
							@click="${(x, c) => c.parentContext.parent.onDateClick(x.date)}"
							@focus="${(x, c) => c.parentContext.parent.onDateFocus(x.date)}"
							@keydown="${(x, c) =>
		c.parentContext.parent.onDateKeydown(
			x.date,
			c.event as KeyboardEvent
		)}"
						>
							${() => focusTemplate} ${(x) => x.label}
						</button>`
	)}
				</div>
			`
	)}
	</div>`;
}
function renderMonthPickerGrid(context: ElementDefinitionContext) {
	const focusTemplate = focusTemplateFactory(context);

	return html<DatePicker>` <div
		class="month-grid"
		role="grid"
		aria-labelledby="grid-label"
	>
		${repeat(
		(x) => x.monthPickerGrid,
		html<MonthPickerGridCell[]>`
				<div class="months-row" role="row">
					${repeat(
		(x) => x,
		html<MonthPickerGridCell>`
							<button
								class="${(x, c) =>
		classNames(
			'month',
			'button',
			[
				'current',
				areMonthsEqual(
					x.month,
					c.parentContext.parent.currentMonth
				),
			],
			[
				'selected',
				areMonthsEqual(
					x.month,
					c.parentContext.parent.selectedMonth
				),
			]
		)}"
								role="gridcell"
								tabindex="${(x, c) =>
		areMonthsEqual(x.month, c.parentContext.parent.tabbableMonth)
			? 0
			: -1}"
								aria-label="${(x) => x.monthName}"
								aria-selected="${(x, c) =>
		areMonthsEqual(
			x.month,
			c.parentContext.parent.selectedMonth
		)}"
								data-month="${(x) => monthToStr(x.month)}"
								@click="${(x, c) =>
		c.parentContext.parent.onMonthClick(x.month)}"
								@focus="${(x, c) =>
		c.parentContext.parent.onMonthFocus(x.month)}"
								@keydown="${(x, c) =>
		c.parentContext.parent.onMonthKeydown(
			x.month,
			c.event as KeyboardEvent
		)}"
							>
								${() => focusTemplate} ${(x) => x.label}
							</button>
						`
	)}
				</div>
			`
	)}
	</div>`;
}

/**
 * The template for the DatePicker component.
 *
 * @param context - element definition context
 * @public
 */
export const DatePickerTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<DatePicker> = (context: ElementDefinitionContext) => {
	const popupTag = context.tagFor(Popup);
	const textFieldTag = context.tagFor(TextField);
	const buttonTag = context.tagFor(Button);
	const dividerTag = context.tagFor(Divider);

	return html`<div class="base" @keydown="${(x, { event }) =>
		x.onBaseKeyDown(event as KeyboardEvent)}">
		<${textFieldTag} id="text-field"
										 ${ref('textFieldEl')}
										 class="control"
										 icon="calendar-line"
										 label="${(x) => x.label}"
										 helper-text="${(x) => x.helperText}"
										 error-text="${(x) => x.textFieldErrorText}"
										 placeholder="${(x) => x.locale.datePicker.dateFormatPlaceholder}"
										 current-value="${(x) => x.presentationValue}"
										 ?disabled="${(x) => x.disabled}"
										 ?readonly="${(x) => x.readOnly}"
										 @input="${(x, c) => x.onTextFieldInput(c.event)}"
										 @change="${(x) => x.onTextFieldChange()}"
										 @focus="${(x) => x.onTextFieldFocus()}"
										 @click="${(x) => x.onTextFieldClick()}"
										 @keydown="${(x, c) => x.onTextFieldKeydown(c.event as KeyboardEvent)}"
		></${textFieldTag}>
		<${popupTag}
					?open="${(x) => x.popupOpen}"
					anchor="text-field"
					placement="bottom-start"
					class="popup">
			<div class="dialog" role="dialog" ${ref(
		'dialogEl'
	)} aria-modal="true" aria-label="${(x) =>
	x.locale.datePicker.chooseDateLabel}">
				${renderDialogHeader(context)}
				${when(
		(x) => x.inMonthPicker,
		html<DatePicker>`
						<${dividerTag}
							class="months-separator"
							role="presentation"
						></${dividerTag}>
						${renderMonthPickerGrid(context)}
					`
	)}
				${when(
		(x) => !x.inMonthPicker,
		html<DatePicker>` ${renderCalendarGrid(context)} `
	)}
				<div class="footer">
					<${buttonTag} size="condensed" label="${(x) =>
	x.locale.datePicker.clearLabel}" @click="${(x) =>
	x.onClearClick()}"></${buttonTag}>
					<${buttonTag} ${ref(
	'lastFocusableEl'
)} size="condensed" appearance="filled" label="${(x) =>
	x.locale.datePicker.okLabel}" @click="${(x) =>
	x.onOkClick()}"></${buttonTag}>
				</div>
			</div>
		</${popupTag}>
	</div>`;
};
