import {
	type ExecutionContext,
	html,
	ref,
	slotted,
	when,
} from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Popup } from '../popup/popup';
import { ListboxOption } from '../option/option';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import { getFeedbackTemplate } from '../../shared/patterns';
import { chevronTemplateFactory } from '../../shared/patterns/chevron';
import { handleEscapeKeyAndStopPropogation } from '../../shared/dialog';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { Listbox } from '../../shared/foundation/listbox/listbox';
import { applyHostSemantics } from '../../shared/aria/host-semantics';
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
	scale,
}: Select) =>
	classNames(
		['disabled', disabled],
		[`appearance-${appearance}`, Boolean(appearance)],
		[`shape-${shape}`, Boolean(shape)],
		['has-meta', Boolean(metaSlottedContent?.length)],
		['error', Boolean(errorValidationMessage)],
		['success', !!successText],
		['shows-placeholder', Boolean(placeholder) && !value],
		[`size-${scale}`, Boolean(scale)]
	);

function renderLabel() {
	return html<Select>` <label for="control" class="label" id="label">
		${(x) => x.label}
	</label>`;
}

function renderPlaceholder(context: VividElementDefinitionContext) {
	const optionTag = context.tagFor(ListboxOption);

	return html<Select>`
		<${optionTag} ${ref('placeholderOption')}
			text="${(x) => x.placeholder}" hidden disabled>
		</${optionTag}>`;
}

function selectValue(context: VividElementDefinitionContext) {
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
function renderControl(context: VividElementDefinitionContext) {
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
						aria-multiselectable="${(x) => x.multiple}"
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

export const SelectTemplate = (context: VividElementDefinitionContext) => {
	return html<Select>`
		<template
			class="base"
			${applyHostSemantics({
				role: 'combobox',
				ariaLabel: (x) => x.ariaLabel ?? x.label,
				ariaHasPopup: (x) => (x.collapsible ? 'listbox' : 'false'),
				ariaExpanded: (x) => x.open,
				ariaDisabled: (x) => x.disabled,
			})}
			aria-controls="${(x) => x.listboxId}"
			aria-activedescendant="${(x) => x._activeDescendant}"
			tabindex="${(x) => (!x.disabled ? '0' : null)}"
			@click="${ifNotFromFeedback<MouseEvent>((x, e) => x.clickHandler(e))}"
			@focusin="${ifNotFromFeedback<FocusEvent>((x, e) => x.focusinHandler(e))}"
			@focusout="${ifNotFromFeedback<FocusEvent>((x, e) =>
				x.focusoutHandler(e)
			)}"
			@keydown="${ifNotFromFeedback<KeyboardEvent>((x, e) => {
				x.open && handleEscapeKeyAndStopPropogation(e);
				return x.keydownHandler(e);
			})}"
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
