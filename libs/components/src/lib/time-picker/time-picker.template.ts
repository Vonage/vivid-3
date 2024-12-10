import type { ViewTemplate } from '@microsoft/fast-element';
import { html, ref, repeat, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Popup } from '../popup/popup';
import { TextField } from '../text-field/text-field';
import { Button } from '../button/button';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { TimePicker } from './time-picker';
import type { PickerOption } from './time/picker';

/**
 * Renders a picker for hours/minutes/etc. using a listbox pattern.
 */
const renderPicker = (
	id: string,
	getLabel: (x: TimePicker) => string,
	getSelected: (x: TimePicker) => string | undefined,
	setSelected: (x: TimePicker) => (value: string) => void,
	getOptions: (x: TimePicker) => PickerOption[]
): ViewTemplate<TimePicker> => {
	return html<TimePicker>`
		<ul
			id="${id}"
			class="picker"
			role="listbox"
			tabindex="0"
			aria-label="${getLabel}"
			aria-activedescendant="${(x) =>
				getSelected(x) ? `${id}-${getSelected(x)}` : undefined}"
			@keydown="${(x, c) =>
				x._onPickerKeyDown(
					id,
					getOptions(x),
					getSelected(x),
					setSelected(x),
					c.event as KeyboardEvent
				)}"
		>
			${repeat(
				getOptions,
				html<PickerOption>`
					<li
						id="${(x) => `${id}-${x.value}`}"
						class="${(x, c) =>
							classNames('item', [
								'selected',
								getSelected(c.parent) === x.value,
							])}"
						role="option"
						aria-selected="${(x, c) => getSelected(c.parent) === x.value}"
						@click="${(x, c) =>
							c.parent._onPickerItemClick(id, setSelected(c.parent), x.value)}"
					>
						${(x) => x.label}
					</li>
				`
			)}
		</ul>
	`;
};

export const TimePickerTemplate = (context: VividElementDefinitionContext) => {
	const popupTag = context.tagFor(Popup);
	const textFieldTag = context.tagFor(TextField);
	const buttonTag = context.tagFor(Button);

	return html<TimePicker>`<div class="base" @keydown="${(x, { event }) =>
		x._onBaseKeyDown(event as KeyboardEvent)}">
		<${textFieldTag} id="text-field"
										 ${ref('_textFieldEl')}
										 class="control"
										 label="${(x) => x.label}"
										 helper-text="${(x) => x.helperText}"
										 error-text="${(x) => x.errorValidationMessage}"
										 placeholder="${(x) => x._textFieldPlaceholder}"
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
				id="clock-button"
				${ref('_clockButtonEl')}
				slot="action-items"
				size="condensed"
				icon="clock-line"
				appearance="ghost"
				?disabled="${(x) => x.disabled || x.readOnly}"
				aria-label="${(x) => x._clockButtonLabel}"
				@click="${(x) => x._onClockButtonClick()}"
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
		x.locale.timePicker.chooseTimeLabel}">
				<div class="time-pickers">
					${renderPicker(
						'hours',
						(x) => x.locale.timePicker.hoursLabel,
						(x) => x._selectedHour,
						(x) => (v) => (x._selectedHour = v),
						(x) => x._hours
					)}
					${renderPicker(
						'minutes',
						(x) => x.locale.timePicker.minutesLabel,
						(x) => x._selectedMinute,
						(x) => (v) => (x._selectedMinute = v),
						(x) => x._minutes
					)}
					${when(
						(x) => x._displaySeconds,
						renderPicker(
							'seconds',
							(x) => x.locale.timePicker.secondsLabel,
							(x) => x._selectedSecond,
							(x) => (v) => (x._selectedSecond = v),
							(x) => x._seconds
						)
					)}
					${when(
						(x) => x._use12hClock,
						renderPicker(
							'meridies',
							(x) => x.locale.timePicker.meridiesLabel,
							(x) => x._selectedMeridiem,
							(x) => (v) => (x._selectedMeridiem = v),
							(x) => x._meridies
						)
					)}
				</div>
				<div class="footer">
					<${buttonTag}
						class="vwc-button"
						size="condensed"
						label="${(x) => x.locale.timePicker.clearLabel}"
						@click="${(x) => x._onClearClick()}"
					></${buttonTag}>
					<${buttonTag}
						class="vwc-button"
						size="condensed"
						appearance="filled"
						label="${(x) => x.locale.timePicker.okLabel}"
						@click="${(x) => x._onOkClick()}"
					></${buttonTag}>
				</div>
			</div>
		</${popupTag}>
	</div>`;
};
