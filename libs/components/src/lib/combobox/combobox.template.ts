import { html, ref, slotted, ViewTemplate, when } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { Listbox } from '../listbox/listbox.js';
import { affixIconTemplateFactory } from '../shared/patterns/affix.js';
import { focusTemplateFactory } from '../shared/patterns/focus.js';
import { Elevation } from '../elevation/elevation';
import type { Combobox } from './combobox';


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
		<div class="${getStateClasses}">
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
	const elevationTag = context.tagFor(Elevation);

	return html<Combobox>`
        <template
			class="base"
            aria-disabled="${x => x.ariaDisabled}"
            autocomplete="${x => x.autocomplete}"
            ?open="${x => x.open}"
            tabindex="${x => (!x.disabled ? '0' : null)}"
            @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
            @focusout="${(x, c) => x.focusoutHandler(c.event as FocusEvent)}"
            @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
        >
						<slot name="control">
							${() => renderInput(context)}
						</slot>
						<${elevationTag}>
							<div
								id="${x => x.listboxId}"
								class="listbox"
								role="listbox"
								?disabled="${x => x.disabled}"
								?hidden="${x => !x.open}"
								${ref('listbox')}
								>
									<slot
											${slotted({
		filter: Listbox.slottedOptionFilter as any,
		flatten: true,
		property: 'slottedOptions',
	})}
									></slot>
							</div>
						</${elevationTag}>
        </template>
		`;
};
