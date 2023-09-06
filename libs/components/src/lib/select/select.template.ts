import { html, ref, slotted, ViewTemplate, when } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Listbox } from '../listbox/listbox';
import { Popup } from '../popup/popup';
import { ListboxOption } from '../option/option';
import { AFFIX_ICON_SLOTTED_STATE, affixIconTemplateFactory } from '../../shared/patterns/affix';
import { getFeedbackTemplate } from '../../shared/patterns';
import { focusTemplateFactory } from './../../shared/patterns/focus';
import type { Select } from './select';

const getStateClasses = ({
	shape,
	disabled,
	appearance,
	metaSlottedContent,
	errorValidationMessage,
	successText,
}: Select) => classNames(
	['disabled', disabled],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
	['has-meta', Boolean(metaSlottedContent?.length)],
	['error connotation-alert', Boolean(errorValidationMessage)],
	['success connotation-success', !!successText],
	['has-meta', Boolean(metaSlottedContent?.length)],
);

function renderLabel() {
	return html<Select>`
	  <label for="control" class="label">
		  ${x => x.label}
	  </label>`;
}

function renderPlaceholder(context: ElementDefinitionContext) {
	const optionTag = context.tagFor(ListboxOption);

	return html<Select>`
		<${optionTag} ${ref('placeholderOption')}
			text="${x => x.placeholder}" hidden disabled>
		</${optionTag}>`;
}

function selectValue(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);
	return html<Select>`
		<div class="control ${getStateClasses}" ${ref('_anchor')}
			id="control" ?disabled="${x => x.disabled}">
			<div class="selected-value">
				${x => affixIconTemplate(x.icon, AFFIX_ICON_SLOTTED_STATE.SLOTTED)}
				<span class="text">${x => x.displayValue}</span>
				<slot name="meta" ${slotted('metaSlottedContent')}></slot>
			</div>
			${() => affixIconTemplate('chevron-down-line')}
			${() => focusTemplate}
		</div>`;
}

function setFixedDropdownVarWidth(x: Select) {
	return (x.open && x.fixedDropdown) ? `--_select-fixed-width: ${Math.round(x.getBoundingClientRect().width)}px` : null;
}

/**
 * @param context - element definition context
 */
function renderControl(context: ElementDefinitionContext) {
	const focusTemplate = focusTemplateFactory(context);
	const popupTag = context.tagFor(Popup);

	return html<Select>`
			${when(x => x.label, renderLabel())}
			<div class="control-wrapper">
				${when(x => !x.multiple, selectValue(context))}
				<${popupTag} class="popup" ${ref('_popup')}
					style="${setFixedDropdownVarWidth}"
					?open="${x => (x.collapsible ? x.open : true)}"
					anchor="control"
					placement="bottom-start"
					strategy="${x => x.fixedDropdown ? null : 'absolute'}">
					<div class="listbox"
						id="${x => x.listboxId}"
						role="listbox"
						?disabled="${x => x.disabled}"
						?hidden="${x => (x.collapsible ? !x.open : false)}"
						${ref('listbox')}>
						${when(x => x.placeholder, renderPlaceholder(context))}
						${when(x => x.multiple, focusTemplate)}
						<slot
							${slotted({ filter: Listbox.slottedOptionFilter as any, flatten: true, property: 'slottedOptions' })}>
						</slot>
           			 </div>
				</${popupTag}>
			</div>
			${when(x => x.helperText?.length, getFeedbackTemplate('helper', context))}
			${when(x => !x.successText && x.errorValidationMessage, getFeedbackTemplate('error', context))}
			${when(x => x.successText, getFeedbackTemplate('success', context))}
		`;

}

/**
 * The template for the Select component.
 *
 * @param context - element definition context
 * @public
 */
export const SelectTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Select> = (context: ElementDefinitionContext) => {

	return html<Select>`
		<template class="base"
			aria-label="${x => x.ariaLabel ? x.ariaLabel : x.label}"
			aria-activedescendant="${x => x.ariaActiveDescendant}"
			aria-controls="${x => x.ariaControls}"
			aria-disabled="${x => x.ariaDisabled}"
			aria-expanded="${x => x.ariaExpanded}"
			aria-haspopup="${x => (x.collapsible ? 'listbox' : null)}"
			aria-multiselectable="${x => x.ariaMultiSelectable}"
			?open="${x => x.open}"
			role="combobox"
			tabindex="${x => (!x.disabled ? '0' : null)}"
			@click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
			@focusin="${(x, c) => x.focusinHandler(c.event as FocusEvent)}"
			@focusout="${(x, c) => x.focusoutHandler(c.event as FocusEvent)}"
			@keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
			@mousedown="${(x, c) => x.mousedownHandler(c.event as MouseEvent)}">
				${renderControl(context)}
		</template>`;
};

// TODO::change the css variable according to select width
