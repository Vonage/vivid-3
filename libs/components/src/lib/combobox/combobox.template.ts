import { html, ref, slotted, ViewTemplate, when } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { Popup } from '../popup/popup';
import { Listbox } from '../listbox/listbox';
import type { Combobox } from './combobox';
import { focusTemplateFactory } from './../../shared/patterns/focus';

/**
 *
 */
function renderLabel() {
	return html<Combobox>`
	  <label for="control" class="label">
		  ${x => x.label}
	  </label>`;
}

const getStateClasses = ({
	disabled,
	placeholder,
	label,
}: Combobox) => classNames(
	'base',
	['disabled', disabled],
	['placeholder', Boolean(placeholder)],
	['no-label', !label],
);

/**
 * @param context
 */
function renderInput(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);

	return html<Combobox>`
		<div class="${getStateClasses}" ${ref('_anchor')}>
			${when(x => x.label, renderLabel())}
			<div class="fieldset">
				<input
					id="control"
					class="control"
					aria-activedescendant="${x => x.open ? x.ariaActiveDescendant : null}"
					aria-autocomplete="${x => x.ariaAutoComplete}"
					aria-controls="${x => x.ariaControls}"
					aria-disabled="${x => x.ariaDisabled}"
					aria-expanded="${x => x.ariaExpanded}"
					aria-haspopup="listbox"
					placeholder="${x => x.placeholder}"
					role="combobox"
					type="text"
					?disabled="${x => x.disabled}"
					:value="${x => x.value}"
					@input="${(x, c) => x.inputHandler(c.event as InputEvent)}"
					@keyup="${(x, c) => x.keyupHandler(c.event as KeyboardEvent)}"
					${ref('control')}
				/>
				${() => affixIconTemplate('chevron-down-line')}
				${() => focusTemplate}
			</div>
		</div>`;
}


/**
 * The template for the {@link @microsoft/fast-foundation#(Combobox:class)} component.
 *
 * @param context
 * @public
 */
export const comboboxTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Combobox> = (context: ElementDefinitionContext) => {
	const popupTag = context.tagFor(Popup);

	return html<Combobox>`
        <template
            aria-disabled="${x => x.ariaDisabled}"
            autocomplete="${x => x.autocomplete}"
            tabindex="${x => (!x.disabled ? '0' : null)}"
            @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
            @focusout="${(x, c) => x.focusoutHandler(c.event as FocusEvent)}"
            @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
        >
			${() => renderInput(context)}
			<${popupTag} class="popup"
				?open="${x => x.open}"
				placement="${x => x.placement}"
				strategy="absolute"
				${ref('_popup')}>
				<div id="${x => x.listboxId}"
					class="listbox"
					role="listbox"
					?disabled="${x => x.disabled}"
					${ref('listbox')}>
					<slot ${slotted({
		filter: Listbox.slottedOptionFilter as any,
		flatten: true,
		property: 'slottedOptions'
	})}>
					</slot>
				</div>
			</${popupTag}>
        </template>
		`;
};
