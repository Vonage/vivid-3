import { html, ref, repeat, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Popup } from '../popup/popup';
import {
	affixIconTemplateFactory,
	getFeedbackTemplate,
	IconWrapper,
} from '../../shared/patterns';
import { chevronTemplateFactory } from '../../shared/patterns/chevron';
import type { Select } from '../select/select';
import { Button } from '../button/button';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { Listbox } from '../../shared/foundation/listbox/listbox';
import type { SearchableSelect } from './searchable-select';
import { OptionTag } from './option-tag';

const getStateClasses = (x: Select) =>
	classNames(
		['disabled', x.disabled],
		[`appearance-${x.appearance}`, Boolean(x.appearance)],
		[`shape-${x.shape}`, Boolean(x.shape)],
		['error', Boolean(x.errorValidationMessage)],
		['success', !!x.successText]
	);

function renderLabel() {
	return html<SearchableSelect>`
		<label for="control" class="label" id="label"> ${(x) => x.label} </label>
	`;
}

const tagTemplateFactory = (
	context: VividElementDefinitionContext,
	getComponent: (c: any) => SearchableSelect
) => {
	const optionTagTag = context.tagFor(OptionTag);

	return html`
		<div class="tag-wrapper">
			<${optionTagTag}
				class="tag"
				tabindex="-1"
				data-index="${(x, c) => getComponent(c).values.indexOf(x)}"
				removable
				:label="${(x, c) => getComponent(c)._tagLabelForValue(x)}"
				:shape="${(_, c) => getComponent(c).shape}"
				?disabled="${(x, c) => getComponent(c)._isTagDisabled(x)}"
				@remove="${(x, c) => getComponent(c)._onTagRemoved(x)}"
				@keydown="${(_, c) => getComponent(c)._onTagKeydown(c.event as KeyboardEvent)}"
				@mousedown="${() => false}">
				<slot slot="icon" name="${(x, c) =>
					getComponent(c)._tagIconSlotName(x)}"></slot>
			</${optionTagTag}>
		</div>
	`;
};

const elidedTagTemplateFactory = (
	context: VividElementDefinitionContext,
	getComponent: (x: any, c: any) => SearchableSelect
) => {
	const optionTagTag = context.tagFor(OptionTag);

	return html`
		<${optionTagTag}
			class="tag"
			tabindex="-1"
			:label="${(x, c) => getComponent(x, c)._numElidedTags.toString()}"
			:shape="${(x, c) => getComponent(x, c).shape}"
			?disabled="${(x, c) => getComponent(x, c).disabled}"
			@mousedown="${() => false}">
		</${optionTagTag}>
	`;
};

function renderFieldset(context: VividElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);
	const affixIconTemplate = affixIconTemplateFactory(context);
	const chevronTemplate = chevronTemplateFactory(context);
	const tagTemplate = tagTemplateFactory(context, (c) => c.parent);
	const nestedTagTemplate = tagTemplateFactory(
		context,
		(c) => c.parentContext.parent
	);
	const elidedTagTemplate = elidedTagTemplateFactory(context, (x, _) => x);
	const nestedElidedTagTemplate = elidedTagTemplateFactory(
		context,
		(_, c) => c.parent
	);

	return html<SearchableSelect>`
		<div
			class="fieldset ${getStateClasses}"
			@click="${(x, c) => x._onFieldsetClick(c.event as MouseEvent)}"
			${ref('_anchor')}
		>
			${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)}
			<div class="content-area" ${ref('_contentArea')}>
				${repeat(
					(x) => x._tagRows,
					html<string[]>`
						<div class="tag-row">
							${when(
								(_, c) => c.isFirst && c.parent._numElidedTags,
								nestedElidedTagTemplate
							)}
							${repeat((x) => x, nestedTagTemplate)}
						</div>
					`,
					{ positioning: true }
				)}
				<div
					class="tag-row ${(x) =>
						classNames([
							'contains-only-input',
							x._tagRows.length > 0 && x._lastTagRow.length === 0,
						])}"
				>
					${when(
						(x) => x._tagRows.length === 0 && x._numElidedTags,
						elidedTagTemplate
					)}
					${repeat((x) => x._lastTagRow, tagTemplate)}
					<input
						id="control"
						class="control"
						autofocus
						autocomplete="off"
						aria-autocomplete="list"
						aria-expanded="${(x) => x.open}"
						aria-haspopup="listbox"
						aria-controls="listbox"
						placeholder="${(x) =>
							x.multiple && x.values.length ? '' : x.placeholder}"
						role="combobox"
						type="text"
						?disabled="${(x) => x.disabled}"
						:value="${(x) => x._inputValue}"
						@input="${(x, c) => x._onInputInput(c.event as InputEvent)}"
						@focus="${(x, c) => x._onInputFocus(c.event as FocusEvent)}"
						@blur="${(x, c) => x._onInputBlur(c.event as FocusEvent)}"
						@keydown="${(x, c) => x._onInputKeydown(c.event as KeyboardEvent)}"
						${ref('_input')}
					/>
				</div>
			</div>
			<slot name="meta"></slot>
			${when(
				(x) => x._shouldShowClearButton,
				html<SearchableSelect>`<${buttonTag}
					aria-label="${(x) => x.locale.searchableSelect.clearButtonLabel}"
					@click="${(x) => x._onClearButtonClick()}"
					@mousedown="${() => false}"
					?disabled="${(x) => x.disabled}"
					:shape="${(x) => x.shape}"
					size="super-condensed"
					icon="close-line"
					appearance="ghost-light"
					tabindex="-1"
				></${buttonTag}>`
			)}
			${chevronTemplate}
		</div>
	`;
}

function renderControl(context: VividElementDefinitionContext) {
	const popupTag = context.tagFor(Popup);

	return html<SearchableSelect>`
		${when((x) => x.label, renderLabel())}
		<span aria-live="assertive" aria-relevant="text" class="visually-hidden">
			${(x) => x._changeDescription}
		</span>
		<div>
			${renderFieldset(context)}
			<div class="popup-wrapper">
				<${popupTag}
					:anchor="${(x) => x._anchor}"
					:open="${(x) => x.open}"
					class="popup"
					placement="bottom-start"
					strategy="${(x) => (x.fixedDropdown ? 'fixed' : 'absolute')}">
					<div
						class="listbox"
						role="listbox"
						aria-multiselectable="${(x) => x.multiple}"
						aria-required="${(x) => x.required}"
						${ref('_listbox')}
						@click="${(x, c) => x._onListboxClick(c.event as MouseEvent)}"
						@mousedown="${() => false}"
					>
						<slot
							${slotted({
								filter: Listbox.slottedOptionFilter as any,
								flatten: true,
								property: '_slottedOptions',
							})}>
						</slot>
						${when(
							(x) => x._filteredOptions.length === 0,
							html<SearchableSelect>`<div class="empty-message">
								${when(
									(x) => x._inputValue === '',
									html<SearchableSelect>`<slot name="no-options">
										${(x) => x.locale.searchableSelect.noOptionsMessage}
									</slot>`
								)}
								${when(
									(x) => x._inputValue !== '',
									html<SearchableSelect>`<slot name="no-matches">
										${(x) => x.locale.searchableSelect.noMatchesMessage}
									</slot>`
								)}
							</div>`
						)}
					</div>
				</${popupTag}>
			</div>
		</div>
	`;
}

export const SearchableSelectTemplate = (
	context: VividElementDefinitionContext
) => {
	const optionTagTag = context.tagFor(OptionTag);

	return html<SearchableSelect>`
		<template :_optionTagTagName="${() => optionTagTag}">
			<div class="control-wrapper">
				${renderControl(context)} ${getFeedbackTemplate(context)}
			</div>
		</template>
	`;
};
