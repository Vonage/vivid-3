import { html, ref, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { Popup } from '../popup/popup';
import { handleEscapeKeyAndStopPropogation } from '../../shared/dialog';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { Listbox } from '../../shared/foundation/listbox/listbox';
import type { Combobox } from './combobox';

function renderLabel() {
	return html<Combobox>` <label for="control" class="label">
		${(x) => x.label}
	</label>`;
}

const getStateClasses = ({
	disabled,
	placeholder,
	label,
	appearance,
}: Combobox) =>
	classNames(
		'base',
		['disabled', disabled],
		['placeholder', Boolean(placeholder)],
		[`appearance-${appearance}`, Boolean(appearance)],
		['no-label', !label]
	);

function setFixedDropdownVarWidth(x: Combobox) {
	return x.open && x.fixedDropdown
		? `--_combobox-fixed-width: ${Math.round(
				x.getBoundingClientRect().width
		  )}px`
		: null;
}

function renderInput(context: VividElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<Combobox>` <div class="${getStateClasses}" ${ref('_anchor')}>
		${when((x) => x.label, renderLabel())}
		<div class="fieldset">
			<input
				id="control"
				autocomplete="off"
				class="control"
				aria-activedescendant="${(x) =>
					x.open ? x.ariaActiveDescendant : null}"
				aria-autocomplete="${(x) => x.autocomplete}"
				aria-controls="${(x) => x.listboxId}"
				aria-disabled="${(x) => x.ariaDisabled}"
				aria-expanded="${(x) => x.open}"
				aria-haspopup="listbox"
				placeholder="${(x) => x.placeholder}"
				role="combobox"
				type="text"
				?disabled="${(x) => x.disabled}"
				:value="${(x) => x.value}"
				@input="${(x, c) => x.inputHandler(c.event as InputEvent)}"
				${ref('control')}
			/>
			${() => affixIconTemplate('chevron-down-line')}
		</div>
	</div>`;
}

export const comboboxTemplate = (context: VividElementDefinitionContext) => {
	const popupTag = context.tagFor(Popup);

	return html<Combobox>`
        <template
            aria-disabled="${(x) => x.ariaDisabled}"
            autocomplete="${(x) => x.autocomplete}"
            tabindex="${(x) => (!x.disabled ? '0' : null)}"
            @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
            @focusout="${(x, c) => x.focusoutHandler(c.event as FocusEvent)}"
            @keydown="${(x, { event }) => {
							x.open &&
								handleEscapeKeyAndStopPropogation(event as KeyboardEvent);
							return x.keydownHandler(event as KeyboardEvent);
						}}"
        >
			${() => renderInput(context)}
			<${popupTag} class="popup"
				style="${setFixedDropdownVarWidth}"
				?open="${(x) => x.open}"
				placement="${(x) => x.placement ?? 'bottom-start'}"
				strategy="${(x) => (x.fixedDropdown ? 'fixed' : 'absolute')}"
				${ref('_popup')}>
				<div id="${(x) => x.listboxId}"
					class="listbox"
					role="listbox"
					?disabled="${(x) => x.disabled}"
					${ref('listbox')}>
					<slot ${slotted({
						filter: Listbox.slottedOptionFilter as any,
						flatten: true,
						property: 'slottedOptions',
					})}>
					</slot>
				</div>
			</${popupTag}>
        </template>
		`;
};
