import { html, ref, slotted, type ViewTemplate } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import type { VividElementDefinitionContext } from '../design-system/defineVividComponent';
import { Popup } from '../../lib/popup/popup';
import { TextField } from '../../lib/text-field/text-field';
import { Button } from '../../lib/button/button';
import { PickerField } from './picker-field';

export const PickerFieldTemplate = (
	context: VividElementDefinitionContext,
	popupContentTemplate: ViewTemplate,
	{ withSeparator, padded }: { withSeparator: boolean; padded: boolean }
) => {
	const popupTag = context.tagFor(Popup);
	const textFieldTag = context.tagFor(TextField);
	const buttonTag = context.tagFor(Button);

	return html<PickerField>`
		<div class='base' @keydown='${(x, { event }) =>
			x._onBaseKeyDown(event as KeyboardEvent)}'>
			<${textFieldTag} id='text-field'
				${ref('_textFieldEl')}
				class='${(x) =>
					classNames(
						'control',
						[
							'has-helper-text',
							Boolean(x._helperTextSlottedContent?.length || x.helperText),
						],
						['has-error-text', Boolean(x.errorValidationMessage)]
					)}'
				label='${(x) => x.label}'
				helper-text='${(x) => x.helperText}'
				error-text='${(x) => x.errorValidationMessage}'
				placeholder='${(x) => x._textFieldPlaceholder}'
				size='${(x) => x._textFieldSize}'
				current-value='${(x) => x._presentationValue}'
				?disabled='${(x) => x.disabled}'
				?readonly='${(x) => x.readOnly}'
				@input='${(x, c) => x._onTextFieldInput(c.event)}'
				@change='${(x) => x._onTextFieldChange()}'
			>
				<slot
					slot='${(x) =>
						x._helperTextSlottedContent?.length ? 'helper-text' : undefined}'
					name='helper-text'
					${slotted('_helperTextSlottedContent')}
				></slot>
				<${buttonTag}
					id='picker-button'
					${ref('_pickerButtonEl')}
					slot='action-items'
					size='condensed'
					icon='${(x) => x._pickerButtonIcon}'
					appearance='ghost'
					?disabled='${(x) => x.disabled || x.readOnly}'
					aria-label='${(x) => x._pickerButtonLabel}'
					@click='${(x) => x._onPickerButtonClick()}'
				></${buttonTag}>
			</${textFieldTag}>
			<${popupTag}
				?open='${(x) => x._popupOpen}'
				:anchor='${(x) => x._textFieldEl}'
				placement='bottom-start'
				class='popup'>
				<div class="${() =>
					classNames('dialog', [
						'dialog--padded',
						padded,
					])}" role='dialog' ${ref(
		'_dialogEl'
	)} aria-modal='true' aria-label='${(x) => x._dialogLabel}'>
					${() => popupContentTemplate}
					<div class="${() =>
						classNames('footer', ['footer--with-separator', withSeparator])}">
						<${buttonTag}
							tabindex='3'
							class='vwc-button'
							size='condensed'
							label='${(x) => x.locale.pickerField.clearLabel}'
							@click='${(x) => x._onClearClick()}'
						></${buttonTag}>
						<${buttonTag}
							tabindex='3'
							class='vwc-button'
							size='condensed'
							appearance='filled'
							label='${(x) => x.locale.pickerField.okLabel}'
							@click='${(x) => x._onOkClick()}'
						></${buttonTag}>
					</div>
				</div>
			</${popupTag}>
		</div>`;
};
