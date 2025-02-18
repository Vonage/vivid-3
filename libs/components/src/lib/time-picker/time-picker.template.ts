import { html, ref, slotted } from '@microsoft/fast-element';
import { Popup } from '../popup/popup';
import { TextField } from '../text-field/text-field';
import { Button } from '../button/button';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { TimePicker } from './time-picker';
import { InlineTimePicker } from './inline-time-picker/inline-time-picker';

export const TimePickerTemplate = (context: VividElementDefinitionContext) => {
	const popupTag = context.tagFor(Popup);
	const textFieldTag = context.tagFor(TextField);
	const buttonTag = context.tagFor(Button);
	const inlineTimePickerTag = context.tagFor(InlineTimePicker);

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
				<${inlineTimePickerTag}
					id="inline-time-picker"
					${ref('_inlineTimePickerEl')}
					:value="${(x) => x.value || undefined}"
					:clock="${(x) => (x._use12hClock ? '12h' : '24h')}"
					:min="${(x) => x.min || undefined}"
					:max="${(x) => x.max || undefined}"
					:minutesStep="${(x) => x.minutesStep ?? 1}"
					:secondsStep="${(x) => x.secondsStep ?? undefined}"
					@change="${(x, c) =>
						x._onInlineTimePickerChange(c.event as CustomEvent<string>)}"
					@last-column-selected="${(x) => x._onInlineTimePickerLastColumnSelected()}"
					>
				</${inlineTimePickerTag}>
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
