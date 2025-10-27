import {
	html,
	InlineTemplateDirective,
	ref,
	repeat,
	slotted,
	when,
} from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { TextField } from '../text-field/text-field';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { Icon } from '../icon/icon';
import { Popup } from '../popup/popup';
import { Button } from '../button/button';
import { delegateAria } from '../../shared/aria/delegates-aria';
import { ColorPicker, vcInputTag, vcPickerTag } from './color-picker';

function renderTextField(
	textFieldTag: InlineTemplateDirective,
	iconTag: InlineTemplateDirective
) {
	const getClasses = (_: ColorPicker) => classNames('control');

	return html<ColorPicker>`
		<${textFieldTag} 
			id="text-field"
			class="${getClasses}"
			pattern="${ColorPicker.HEX_COLOR_PATTERN.source}"
			maxlength="7"
			label="${(x) => x.label}"
			:value="${(x) => x.value}"
			placeholder="${(x) => x.placeholder}"
			helper-text="${(x) => x.helperText}"
			error-text="${(x) => x.errorValidationMessage}"
			success-text="${(x) => x.successText}"
			?disabled="${(x) => x.disabled}"
			?required="${(x) => x.required}"
			@input='${(x, c) => x._onTextFieldInput(c.event)}'
			@change="${(x) => x.handleChange()}"
			@blur="${(x) => {
				x.$emit('blur', undefined, { bubbles: false });
			}}"
			@focus="${(x) => {
				x.$emit('focus', undefined, { bubbles: false });
			}}"
			${delegateAria()}
			${ref('_textFieldEl')}
		>
			<button 
				aria-label="${(x) => x.locale.colorPicker.pickerButtonLabel}"
				aria-expanded="${(x) => x.open}"
  			aria-haspopup="dialog"
				class="button ${(x) =>
					classNames(
						x._applyContrastClass(x._buttonColor) ? 'contrast' : '',
						x.disabled ? 'disabled' : ''
					)}" 
				style="--button-color: ${(x) => x._buttonColor};" 
				?disabled="${(x) => x.disabled}"
				@click="${(x) => x._onButtonClick()}"
				slot="action-items" 
				${ref('_buttonEl')}>
				<${iconTag} name="edit-line"></${iconTag}>
			</button>
			<slot
				slot="${(x) =>
					x._helperTextSlottedContent?.length ? 'helper-text' : undefined}"
				name="helper-text"
				${slotted('_helperTextSlottedContent')}
			></slot>
			<slot
				slot='${(x) =>
					x._contextualHelpSlottedContent?.length
						? 'contextual-help'
						: undefined}'
				name='contextual-help'
				${slotted('_contextualHelpSlottedContent')}
			></slot>
		</${textFieldTag}>
	`;
}

function renderPopupHeader(
	buttonTag: InlineTemplateDirective,
	iconTag: InlineTemplateDirective
) {
	return html<ColorPicker>`
		<div class="header">
			<h2 class="header-title" id="color-picker-title">
				<slot name="popup-text">${(x) => x.locale.colorPicker.popupLabel}</slot>
			</h2>
			<${buttonTag} size="condensed" 
				aria-label="${(x) => x.locale.colorPicker.closeButtonLabel}" 
				@click="${(x) => x._handleCloseRequest()}">
				<${iconTag} slot="icon" name="close-line"></${iconTag}>
			</${buttonTag}>
		</div>
	`;
}

function renderPopupBody(
	buttonTag: InlineTemplateDirective,
	iconTag: InlineTemplateDirective
) {
	return html<ColorPicker>`
		<div class="body">
			<${html.partial(vcPickerTag)}
				part="hex-picker"
				color="${(x) => x.value}"
				@color-changed="${(x, c) =>
					x._onPickerColorChanged(c.event as CustomEvent<{ value: string }>)}"
				${ref('_vcHexPickerEl')}
			></${html.partial(vcPickerTag)}>
			<div class="hex-input-wrapper">
				<${html.partial(vcInputTag)}
					part="hex-input"
					prefixed
					color="${(x) => x.value}"
					@color-changed="${(x, c) =>
						x._onPickerColorChanged(c.event as CustomEvent<{ value: string }>)}"
					${ref('_vcHexInputEl')}
				></${html.partial(vcInputTag)}>
				<${buttonTag} size="normal" 
					aria-label="${(x) => x.locale.colorPicker.copyButtonLabel}" 
					@click="${(x) => x._copyValueToClipboard(x.value)}">
					<${iconTag} slot="icon" name="${(x) => x.copyIconName}"></${iconTag}>
				</${buttonTag}>
			</div>
		</div>
	`;
}

function renderPopupFooter(
	buttonTag: InlineTemplateDirective,
	iconTag: InlineTemplateDirective
) {
	return html<ColorPicker>`
		<div class="footer">
			<span class="footer-title" id="color-picker-footer-title"
				><slot name="swatches-text"
					>${(x) => x.locale.colorPicker.swatchesLabel}</slot
				></span
			>
			<div
				class="palette"
				role="grid"
				aria-rowcount="${(x) =>
					Math.ceil(x.allSwatches.length / x._getRowLength())}"
				aria-colcount="${(x) => x._getRowLength()}"
				style="--swatches-per-row: ${(x) => x._getRowLength()};"
				aria-labelledby="color-picker-footer-title"
			>
				${repeat(
					(x) => x.allSwatches,
					(x) => x._renderColorSwatch(iconTag),
					{ positioning: true }
				)}
				${when(
					(x) => !x.disableSavedColors,
					html`
					<${buttonTag}
						appearance="outlined"
						size="super-condensed"
						role="gridcell"
						tabindex="${(x) => (x.allSwatches.length ? '-1' : '0')}"
						aria-label="${(x) => x.locale.colorPicker.saveButtonLabel}"
						@click="${(x) => x._saveCurrentColor()}"
						@keydown="${(x, c) =>
							x._handleCellKeydown(
								c.event as KeyboardEvent,
								x.value,
								x.allSwatches.length,
								true
							)}">
					>
						<${iconTag} slot="icon" name="plus-line"></${iconTag}>
					</${buttonTag}>
				`
				)}
			</div>
		</div>
	`;
}

export const ColorPickerTemplate = (context: VividElementDefinitionContext) => {
	const textFieldTag = context.tagFor(TextField);
	const iconTag = context.tagFor(Icon);
	const popupTag = context.tagFor(Popup);
	const buttonTag = context.tagFor(Button);
	return html<ColorPicker>`
		<div class="base">
			${renderTextField(textFieldTag, iconTag)}
			<${popupTag}
				:open="${(x) => x.open}"
				:anchor="${(x) => x._buttonEl}"
				placement="top"
				offset="10" 
				${ref('_popupEl')}>
				<div class="dialog" 
					role="dialog" 
					aria-modal="true" 
					aria-labelledby="color-picker-title">
					${renderPopupHeader(buttonTag, iconTag)}
					${renderPopupBody(buttonTag, iconTag)}
					${when(
						(x) => !x.disableSavedColors || x.allSwatches.length > 0,
						renderPopupFooter(buttonTag, iconTag)
					)}
				</div>
			</${popupTag}>
		</div>
	`;
};
