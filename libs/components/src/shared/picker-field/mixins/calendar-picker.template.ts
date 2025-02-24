import { html, ref, repeat, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Button } from '../../../lib/button/button';
import { Popup } from '../../../lib/popup/popup';
import { TextField } from '../../../lib/text-field/text-field';
import { Divider } from '../../../lib/divider/divider';
import type { VividElementDefinitionContext } from '../../design-system/defineVividComponent';
import type {
	CalendarGridDate,
	Weekday,
} from '../../date-picker/calendar/calendarGrid';
import { areMonthsEqual, monthToStr } from '../../date-picker/calendar/month';
import type { MonthPickerGridCell } from '../../date-picker/calendar/monthPickerGrid';
import type {
	CalendarSegment,
	MonthPickerSegment,
	Segment,
} from '../../date-picker/calendar/segment';
import type { CalendarPicker } from './calendar-picker';

function renderDialogHeader(context: VividElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);

	return html<Segment, CalendarPicker>`<div class="header">
		${when(
			(x) => x.prevYearButton,
			html<Segment, CalendarPicker>`
					<${buttonTag}
						tabindex="1"
						class="vwc-button"
						size="super-condensed"
						icon="${(_, c) =>
							c.parent._inMonthPicker
								? 'chevron-left-line'
								: 'double-chevron-left-line'}"
						aria-label="${(_, c) => c.parent.locale.datePicker.prevYearLabel}"
						?disabled="${(_, c) => c.parent._isPrevYearDisabled}"
						@click="${(_, c) => c.parent._onPrevYearClick()}"
					></${buttonTag}>
		`
		)}
		${when(
			(x) => x.prevMonthButton,
			html<Segment, CalendarPicker>`
					<${buttonTag}
						tabindex="1"
						class="vwc-button"
						size="super-condensed"
						icon="chevron-left-line"
						aria-label="${(_, c) => c.parent.locale.datePicker.prevMonthLabel}"
						?disabled="${(_, c) => c.parent._isPrevMonthDisabled}"
						@click="${(_, c) => c.parent._onPrevMonthClick()}"
					></${buttonTag}>
		`
		)}
		<div class="title">
			${when(
				(x) => x.titleClickable,
				html<Segment, CalendarPicker>`
					<button
						tabindex="1"
						id="${(x) => `grid-label-${x.id}`}"
						class="title-action button"
						aria-live="polite"
						@click="${(_, c) => c.parent._onTitleActionClick()}"
					>
						${(x) => x.title}
					</button>
				`
			)}
			${when(
				(x) => !x.titleClickable,
				html<Segment, CalendarPicker>`
					<div
						id="${(x) => `grid-label-${x.id}`}"
						class="title-action"
						aria-live="polite"
					>
						${(x) => x.title}
					</div>
				`
			)}
		</div>

		${when(
			(x) => x.nextMonthButton,
			html<Segment, CalendarPicker>`
				<${buttonTag}
					tabindex="1"
					class="vwc-button"
					size="super-condensed"
					icon="chevron-right-line"
					aria-label="${(_, c) => c.parent.locale.datePicker.nextMonthLabel}"
					?disabled="${(_, c) => c.parent._isNextMonthDisabled}"
					@click="${(_, c) => c.parent._onNextMonthClick()}"
				></${buttonTag}>
			`
		)}
		${when(
			(x) => x.nextYearButton,
			html<Segment, CalendarPicker>`
				<${buttonTag}
					tabindex="1"
					class="vwc-button"
					size="super-condensed"
					icon="${(_, c) =>
						c.parent._inMonthPicker
							? 'chevron-right-line'
							: 'double-chevron-right-line'}"
					aria-label="${(_, c) => c.parent.locale.datePicker.nextYearLabel}"
					?disabled="${(_, c) => c.parent._isNextYearDisabled}"
					@click="${(_, c) => c.parent._onNextYearClick()}"
				></${buttonTag}>
			`
		)}
	</div>`;
}

function renderCalendarGrid(context: VividElementDefinitionContext) {
	const dividerTag = context.tagFor(Divider);

	return html<CalendarSegment, CalendarPicker>`<div
		class="calendar"
		role="grid"
		aria-labelledby="${(x) => `grid-label-${x.id}`}"
	>
		<div class="calendar-weekdays" role="row">
			${repeat(
				(x) => x.calendar.weekdays,
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
			(x) => x.calendar.grid,
			html<CalendarGridDate[]>` <div class="calendar-week" role="row">
				${repeat(
					(x) => x,
					html<CalendarGridDate>`
			${when(
				(x, c) =>
					c.parentContext.parentContext.parent._hideDatesOutsideMonth &&
					x.isOutsideMonth,
				html<CalendarGridDate>`<div class="calendar-day"></div>`
			)}
			${when(
				(x, c) =>
					!c.parentContext.parentContext.parent._hideDatesOutsideMonth ||
					!x.isOutsideMonth,
				html<CalendarGridDate>` <span role="gridcell">
					<button
						class="${(x, c) =>
							classNames(
								'calendar-day',
								'button',
								[
									'current',
									x.date === c.parentContext.parentContext.parent._currentDate,
								],
								[
									'selected',
									c.parentContext.parentContext.parent._isDateSelected(x.date),
								],
								[
									'range',
									c.parentContext.parentContext.parent._isDateInSelectedRange(
										x.date
									),
								],
								[
									'start',
									c.parentContext.parentContext.parent._isDateRangeStart(
										x.date
									),
								],
								[
									'end',
									c.parentContext.parentContext.parent._isDateRangeEnd(x.date),
								],
								['outside-month', x.isOutsideMonth]
							)}"
						?disabled="${(x, c) =>
							!c.parentContext.parentContext.parent._isDateInValidRange(
								x.date
							)}"
						tabindex="${(x, c) =>
							x.date === c.parentContext.parentContext.parent._tabbableDate
								? 2
								: -1}"
						aria-selected="${(x, c) =>
							c.parentContext.parentContext.parent._isDateAriaSelected(x.date)}"
						data-date="${(x) => x.date}"
						@click="${(x, c) =>
							c.parentContext.parentContext.parent._onDateClick(x.date)}"
						@focus="${(x, c) =>
							c.parentContext.parentContext.parent._onDateFocus(x.date)}"
						@mouseenter="${(x, c) =>
							c.parentContext.parentContext.parent._onDateMouseEnter(x.date)}"
						@mouseleave="${(x, c) =>
							c.parentContext.parentContext.parent._onDateMouseLeave(x.date)}"
						@keydown="${(x, c) =>
							c.parentContext.parentContext.parent._onDateKeydown(
								x.date,
								c.event as KeyboardEvent
							)}"
					>
						${(x) => x.label}
					</button>
				</span>`
			)}
				</div>
			`
				)}
			</div>`
		)}`;
}
function renderMonthPickerGrid(context: VividElementDefinitionContext) {
	const dividerTag = context.tagFor(Divider);

	return html<MonthPickerSegment, CalendarPicker>`
		<${dividerTag}
			class="months-separator"
			role="presentation"
		></${dividerTag}>
		<div
		class="month-grid"
		role="grid"
		aria-labelledby="grid-label"
	>
		${repeat(
			(x) => x.months,
			html<MonthPickerGridCell[]>`
				<div class="months-row" role="row">
					${repeat(
						(x) => x,
						html<MonthPickerGridCell>`
							<span role="gridcell">
								<button
									class="${(x, c) =>
										classNames(
											'month',
											'button',
											[
												'current',
												areMonthsEqual(
													x.month,
													c.parentContext.parentContext.parent._currentMonth
												),
											],
											[
												'selected',
												areMonthsEqual(
													x.month,
													c.parentContext.parentContext.parent._selectedMonth
												),
											]
										)}"
									tabindex="${(x, c) =>
										c.parentContext.parentContext.parent._tabbableMonth &&
										areMonthsEqual(
											x.month,
											c.parentContext.parentContext.parent._tabbableMonth
										)
											? 2
											: -1}"
									aria-label="${(x) => x.monthName}"
									aria-selected="${(x, c) =>
										areMonthsEqual(
											x.month,
											c.parentContext.parentContext.parent._selectedMonth
										)}"
									data-month="${(x) => monthToStr(x.month)}"
									?disabled="${(x, c) =>
										!c.parentContext.parentContext.parent._isMonthInValidRange(
											x.month
										)}"
									@click="${(x, c) =>
										c.parentContext.parentContext.parent._onMonthClick(
											x.month
										)}"
									@focus="${(x, c) =>
										c.parentContext.parentContext.parent._onMonthFocus(
											x.month
										)}"
									@keydown="${(x, c) =>
										c.parentContext.parentContext.parent._onMonthKeydown(
											x.month,
											c.event as KeyboardEvent
										)}"
								>
									${(x) => x.label}
								</button>
							</span>
						`
					)}
				</div>
			`
		)}
	</div>`;
}

export const CalendarPickerTemplate = (
	context: VividElementDefinitionContext
) => {
	const popupTag = context.tagFor(Popup);
	const textFieldTag = context.tagFor(TextField);
	const buttonTag = context.tagFor(Button);

	return html<CalendarPicker>`<div class="base" @keydown="${(x, { event }) =>
		x._onBaseKeyDown(event as KeyboardEvent)}">
		<${textFieldTag} id="text-field"
										 ${ref('_textFieldEl')}
										 class="control"
										 label="${(x) => x.label}"
										 helper-text="${(x) => x.helperText}"
										 error-text="${(x) => x.errorValidationMessage}"
										 placeholder="${(x) => x._textFieldPlaceholder}"
										 size="${(x) => x._textFieldSize}"
										 current-value="${(x) => x._presentationValue}"
										 ?disabled="${(x) => x.disabled}"
										 ?readonly="${(x) => x.readOnly}"
										 @input="${(x, c) => x._onTextFieldInput(c.event)}"
										 @change="${(x) => x._onTextFieldChange()}"
		>
			<slot
				slot="${(x) =>
					x._helperTextSlottedContent?.length ? 'helper-text' : undefined}"
				name="helper-text"
				${slotted('_helperTextSlottedContent')}
			></slot>
			<${buttonTag}
				id="calendar-button"
				${ref('_calendarButtonEl')}
				slot="action-items"
				size="condensed"
				icon="calendar-line"
				appearance="ghost"
				?disabled="${(x) => x.disabled || x.readOnly}"
				aria-label="${(x) => x._calendarButtonLabel}"
				@click="${(x) => x._onCalendarButtonClick()}"
			></${buttonTag}>
		</${textFieldTag}>
		<${popupTag}
					?open="${(x) => x._popupOpen}"
					:anchor="${(x) => x._textFieldEl}"
					placement="bottom-start"
					class="popup">
			<div class="dialog" role="dialog" ${ref(
				'_dialogEl'
			)} aria-modal="true" aria-label="${(x) =>
		x.locale.datePicker.chooseDateLabel}">
				<div class="segments">
					${repeat(
						(x) => x._segments,
						html<Segment>` <div class="segment">
							${renderDialogHeader(context)}
							${when(
								(x) => x.type === 'month-picker',
								html<CalendarPicker>`${renderMonthPickerGrid(context)}`
							)}
							${when(
								(x) => x.type === 'calendar',
								html<CalendarPicker>`${renderCalendarGrid(context)}`
							)}
						</div>`
					)}
				</div>
				<div class="footer">
					<${buttonTag}
						tabindex="3"
						class="vwc-button"
						size="condensed"
						label="${(x) => x.locale.datePicker.clearLabel}"
						@click="${(x) => x._onClearClick()},
										${(x) => x.$emit('clear-click')}"
					></${buttonTag}>
					<${buttonTag}
						tabindex="3"
						class="vwc-button"
						size="condensed"
						appearance="filled"
						label="${(x) => x.locale.datePicker.okLabel}"
						@click="${(x) => x._onOkClick()}"
					></${buttonTag}>
				</div>
			</div>
		</${popupTag}>
	</div>`;
};
