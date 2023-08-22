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
		(x) => x._inMonthPicker,
		html<DatePicker>`
		<${buttonTag} ${ref(
	'_firstFocusableEl'
)} size="super-condensed" icon="chevron-left-line" aria-label="${(x) =>
	x.locale.datePicker.prevYearLabel}" @click="${(x) =>
	x._onPrevYearClick()}"></${buttonTag}>
		`
	)}
		${when(
		(x) => !x._inMonthPicker,
		html<DatePicker>`
					<${buttonTag} ${ref(
	'_firstFocusableEl'
)} size="super-condensed" icon="double-chevron-left-line" aria-label="${(
	x
) => x.locale.datePicker.prevYearLabel}" @click="${(x) =>
	x._onPrevYearClick()}"></${buttonTag}>
					<${buttonTag} size="super-condensed" icon="chevron-left-line" aria-label="${(
	x
) => x.locale.datePicker.prevMonthLabel}" @click="${(x) =>
	x._onPrevMonthClick()}"></${buttonTag}>
		`
	)}

		<div class="title">
			<button
				id="grid-label"
				class="title-action button"
				aria-live="polite"
				@click="${(x) => x._onTitleActionClick()}"
			>
				${() => focusTemplate}
				${when(
		(x) => x._inMonthPicker,
		html<DatePicker>` ${(x) => x._monthPickerYear} `
	)}
				${when(
		(x) => !x._inMonthPicker,
		html<DatePicker>`
						${(x) =>
		`${x.locale.datePicker.months.name[x._selectedMonth.month]} ${
			x._selectedMonth.year
		}`}
					`
	)}
			</button>
		</div>

		${when(
		(x) => x._inMonthPicker,
		html<DatePicker>`
			<${buttonTag} size="super-condensed" icon="chevron-right-line" aria-label="${(
	x
) => x.locale.datePicker.nextYearLabel}" @click="${(x) =>
	x._onNextYearClick()}"></${buttonTag}>
		`
	)}
		${when(
		(x) => !x._inMonthPicker,
		html<DatePicker>`
					<${buttonTag} size="super-condensed" icon="chevron-right-line" aria-label="${(
	x
) => x.locale.datePicker.nextMonthLabel}" @click="${(x) =>
	x._onNextMonthClick()}"></${buttonTag}>
					<${buttonTag} size="super-condensed" icon="double-chevron-right-line" aria-label="${(
	x
) => x.locale.datePicker.nextYearLabel}" @click="${(x) =>
	x._onNextYearClick()}"></${buttonTag}>
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
		(x) => x._calendarGrid.weekdays,
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
		(x) => x._calendarGrid.grid,
		html<CalendarGridDate[]>`
				<div class="calendar-week" role="row">
					${repeat(
		(x) => x,
		html<CalendarGridDate>`<button
							class="${(x, c) =>
		classNames(
			'calendar-day',
			'button',
			['current', x.date === c.parentContext.parent._currentDate],
			['selected', x.date === c.parentContext.parent.value],
			['outside-month', x.isOutsideMonth]
		)}"
							role="gridcell"
							tabindex="${(x, c) =>
		x.date === c.parentContext.parent._tabbableDate ? 0 : -1}"
							aria-selected="${(x, c) =>
		x.date === c.parentContext.parent.value}"
							data-date="${(x) => x.date}"
							@click="${(x, c) => c.parentContext.parent._onDateClick(x.date)}"
							@focus="${(x, c) => c.parentContext.parent._onDateFocus(x.date)}"
							@keydown="${(x, c) =>
		c.parentContext.parent._onDateKeydown(
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
		(x) => x._monthPickerGrid,
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
					c.parentContext.parent._currentMonth
				),
			],
			[
				'selected',
				areMonthsEqual(
					x.month,
					c.parentContext.parent._selectedMonth
				),
			]
		)}"
								role="gridcell"
								tabindex="${(x, c) =>
		areMonthsEqual(x.month, c.parentContext.parent._tabbableMonth)
			? 0
			: -1}"
								aria-label="${(x) => x.monthName}"
								aria-selected="${(x, c) =>
		areMonthsEqual(
			x.month,
			c.parentContext.parent._selectedMonth
		)}"
								data-month="${(x) => monthToStr(x.month)}"
								@click="${(x, c) =>
		c.parentContext.parent._onMonthClick(x.month)}"
								@focus="${(x, c) =>
		c.parentContext.parent._onMonthFocus(x.month)}"
								@keydown="${(x, c) =>
		c.parentContext.parent._onMonthKeydown(
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
		x._onBaseKeyDown(event as KeyboardEvent)}">
		<${textFieldTag} id="text-field"
										 ${ref('_textFieldEl')}
										 class="control"
										 icon="calendar-line"
										 label="${(x) => x.label}"
										 helper-text="${(x) => x.helperText}"
										 error-text="${(x) => x._textFieldErrorText}"
										 placeholder="${(x) => x.locale.datePicker.dateFormatPlaceholder}"
										 current-value="${(x) => x._presentationValue}"
										 ?disabled="${(x) => x.disabled}"
										 ?readonly="${(x) => x.readOnly}"
										 @input="${(x, c) => x._onTextFieldInput(c.event)}"
										 @change="${(x) => x._onTextFieldChange()}"
										 @focus="${(x) => x._onTextFieldFocus()}"
										 @click="${(x) => x._onTextFieldClick()}"
										 @keydown="${(x, c) => x._onTextFieldKeydown(c.event as KeyboardEvent)}"
		></${textFieldTag}>
		<${popupTag}
					?open="${(x) => x._popupOpen}"
					anchor="text-field"
					placement="bottom-start"
					class="popup">
			<div class="dialog" role="dialog" ${ref(
		'_dialogEl'
	)} aria-modal="true" aria-label="${(x) =>
	x.locale.datePicker.chooseDateLabel}">
				${renderDialogHeader(context)}
				${when(
		(x) => x._inMonthPicker,
		html<DatePicker>`
						<${dividerTag}
							class="months-separator"
							role="presentation"
						></${dividerTag}>
						${renderMonthPickerGrid(context)}
					`
	)}
				${when(
		(x) => !x._inMonthPicker,
		html<DatePicker>` ${renderCalendarGrid(context)} `
	)}
				<div class="footer">
					<${buttonTag} size="condensed" label="${(x) =>
	x.locale.datePicker.clearLabel}" @click="${(x) =>
	x._onClearClick()}"></${buttonTag}>
					<${buttonTag} ${ref(
	'_lastFocusableEl'
)} size="condensed" appearance="filled" label="${(x) =>
	x.locale.datePicker.okLabel}" @click="${(x) =>
	x._onOkClick()}"></${buttonTag}>
				</div>
			</div>
		</${popupTag}>
	</div>`;
};
