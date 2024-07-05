import {
	type ExecutionContext,
	html,
	ref,
	slotted,
	ViewTemplate,
	when,
} from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Listbox } from '../listbox/listbox';
import { Popup } from '../popup/popup';
import { ListboxOption } from '../option/option';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import { getFeedbackTemplate } from '../../shared/patterns';
import { chevronTemplateFactory } from '../../shared/patterns/chevron';
import type { Select } from './select';

const getStateClasses = ({
	shape,
	disabled,
	appearance,
	metaSlottedContent,
	errorValidationMessage,
	successText,
	placeholder,
	value,
}: Select) =>
	classNames(
		['disabled', disabled],
		[`appearance-${appearance}`, Boolean(appearance)],
		[`shape-${shape}`, Boolean(shape)],
		['has-meta', Boolean(metaSlottedContent?.length)],
		['error', Boolean(errorValidationMessage)],
		['success', !!successText],
		['has-meta', Boolean(metaSlottedContent?.length)],
		['shows-placeholder', Boolean(placeholder) && !value]
	);

function renderLabel() {
	return html<Select>` <label for="control" class="label" id="label">
		${(x) => x.label}
	</label>`;
}

function renderPlaceholder(context: ElementDefinitionContext) {
	const optionTag = context.tagFor(ListboxOption);

	return html<Select>`
		<${optionTag} ${ref('placeholderOption')}
			text="${(x) => x.placeholder}" hidden disabled>
		</${optionTag}>`;
}

function selectValue(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const chevronTemplate = chevronTemplateFactory(context);
	return html<Select>` <div
		class="control ${getStateClasses}"
		${ref('_anchor')}
		id="control"
		?disabled="${(x) => x.disabled}"
	>
		<div class="selected-value">
			${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)}
			<span class="text">${(x) => x.displayValue}</span>
			<slot name="meta" ${slotted('metaSlottedContent')}></slot>
		</div>
		${chevronTemplate}
	</div>`;
}

function setFixedDropdownVarWidth(x: Select) {
	return x.open && x.fixedDropdown
		? `--_select-fixed-width: ${Math.round(x.getBoundingClientRect().width)}px`
		: null;
}

/**
 * @param context - element definition context
 */
function renderControl(context: ElementDefinitionContext) {
	const popupTag = context.tagFor(Popup);

	return html<Select>`
			${when((x) => x.label, renderLabel())}
			<div class="control-wrapper">
				${when((x) => !x.multiple, selectValue(context))}
				<${popupTag} class="popup"
					style="${setFixedDropdownVarWidth}"
					?open="${(x) => (x.collapsible ? x.open : true)}"
					:anchor="${(x) => x._anchor}"
					placement="bottom-start"
					strategy="${(x) => (x.fixedDropdown ? null : 'absolute')}">
					<div class="listbox"
						id="${(x) => x.listboxId}"
						role="listbox"
						?disabled="${(x) => x.disabled}"
						?hidden="${(x) => (x.collapsible ? !x.open : false)}"
						${ref('listbox')}>
						${when((x) => x.placeholder, renderPlaceholder(context))}
						<slot
							${slotted({
								filter: Listbox.slottedOptionFilter as any,
								flatten: true,
								property: 'slottedOptions',
							})}>
						</slot>
				 	</div>
				</${popupTag}>
			</div>
		`;
}

/**
 * Ignore events that originate from feedback, e.g. a click on link
 */
function ifNotFromFeedback<E extends Event>(
	handler: (x: Select, event: E) => void
) {
	return (x: Select, c: ExecutionContext) => {
		if (!c.event.composedPath().includes(x._feedbackWrapper!)) {
			return handler(x, c.event as E);
		}
		return true;
	};
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
		<template
			class="base"
			aria-label="${(x) => x.ariaLabel}"
			aria-activedescendant="${(x) => x.ariaActiveDescendant}"
			aria-controls="${(x) => x.ariaControls}"
			aria-disabled="${(x) => x.ariaDisabled}"
			aria-expanded="${(x) => x.ariaExpanded}"
			aria-haspopup="${(x) => (x.collapsible ? 'listbox' : null)}"
			aria-multiselectable="${(x) => x.ariaMultiSelectable}"
			role="combobox"
			tabindex="${(x) => (!x.disabled ? '0' : null)}"
			@click="${ifNotFromFeedback<MouseEvent>((x, e) => x.clickHandler(e))}"
			@focusin="${ifNotFromFeedback<FocusEvent>((x, e) => x.focusinHandler(e))}"
			@focusout="${ifNotFromFeedback<FocusEvent>((x, e) =>
				x.focusoutHandler(e)
			)}"
			@keydown="${ifNotFromFeedback<KeyboardEvent>((x, e) =>
				x.keydownHandler(e)
			)}"
			@mousedown="${ifNotFromFeedback<MouseEvent>((x, e) =>
				x.mousedownHandler(e)
			)}"
		>
			${renderControl(context)}
			<div class="feedback-wrapper" ${ref('_feedbackWrapper')}>
				${getFeedbackTemplate(context)}
			</div>
		</template>
	`;
};

// TODO::change the css variable according to select width
