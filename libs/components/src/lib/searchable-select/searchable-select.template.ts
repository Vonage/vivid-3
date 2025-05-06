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
import { ProgressRing } from '../progress-ring/progress-ring';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { isListboxOption } from '../option/option';
import { delegateAria } from '../../shared/aria/delegates-aria';
import { OptionTag } from './option-tag';
import type { SearchableSelect } from './searchable-select';

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
function renderSelectionCount() {
	return html<SearchableSelect>`
		<span id="selection-count" class="selection-count" aria-live="polite"
			>(${(x) => x.values.length}/${(x) => x.maxItems})</span
		>
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
				:connotation="${(x, c) => getComponent(c)._tagConnotationForValue(x)}"
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
	const progressRingTag = context.tagFor(ProgressRing);
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
						autocomplete="off"
						aria-controls="listbox"
						${delegateAria({
							role: 'combobox',
							ariaAutoComplete: 'list',
							ariaHasPopup: 'listbox',
							ariaExpanded: (x) => x.open,
						})}
						placeholder="${(x) =>
							x.multiple && x.values.length ? '' : x.placeholder}"
						type="text"
						?disabled="${(x) => x.disabled}"
						:value="${(x) => x._inputValue}"
						@input="${(x, c) => {
							x._onInputInput(c.event as InputEvent);
							c.event.stopPropagation();
						}}"
						@change="${(_, c) => {
							c.event.stopPropagation();
						}}"
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
			<div @mousedown="${() => false}" @click="${(x) => x._onChevronClick()}">
				${when(
					(x) => x.loading,
					html<SearchableSelect>`<${progressRingTag} indeterminate size="-6"></${progressRingTag}>`
				)}
				${when((x) => !x.loading, chevronTemplate)}
			</div>
		</div>
	`;
}

function setFixedDropdownVarWidth(x: Select) {
	return x.open && x.fixedDropdown
		? `--_searchable-select-fixed-width: ${Math.round(
				x.getBoundingClientRect().width
		  )}px`
		: null;
}

function renderControl(context: VividElementDefinitionContext) {
	const popupTag = context.tagFor(Popup);

	return html<SearchableSelect>`
		${when(
			(x) => x.label || (x.multiple && x.maxItems),
			html<SearchableSelect>`
				<div>
					${when((x) => x.label, renderLabel())}
					${when(
						(x) => x.multiple && x.maxItems && x.maxItems >= 1,
						renderSelectionCount()
					)}
				</div>
			`
		)}
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
					style="${setFixedDropdownVarWidth}"
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
								filter: isListboxOption as any,
								flatten: true,
								property: '_slottedOptions',
							})}>
						</slot>
						${when(
							(x) => x._filteredOptions.length === 0,
							html<SearchableSelect>`<div class="empty-message">
								${when(
									(x) => x.loading,
									html<SearchableSelect>`<slot name="loading-options">
										${(x) => x.locale.searchableSelect.loadingOptionsMessage}
									</slot>`
								)}
								${when(
									(x) => !x.loading && x.searchText === '',
									html<SearchableSelect>`<slot name="no-options">
										${(x) => x.locale.searchableSelect.noOptionsMessage}
									</slot>`
								)}
								${when(
									(x) => !x.loading && x.searchText !== '',
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
		<template
			:_optionTagTagName="${() => optionTagTag}"
			@mousedown="${(x, c) => x._onMouseDown(c.event as MouseEvent)}"
		>
			<div class="control-wrapper">
				${renderControl(context)} ${getFeedbackTemplate(context)}
			</div>
		</template>
	`;
};
