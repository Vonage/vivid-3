import { html, ref, slotted, ViewTemplate } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import { Listbox } from '../listbox/listbox.js';
import type { Combobox } from './combobox';

/**
 * The template for the {@link @microsoft/fast-foundation#(Combobox:class)} component.
 *
 * @public
 */
export const ComboboxTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Combobox> = () => html`
        <template
            aria-disabled="${x => x.ariaDisabled}"
            autocomplete="${x => x.autocomplete}"
            ?open="${x => x.open}"
            tabindex="${x => (!x.disabled ? '0' : null)}"
            @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
            @focusout="${(x, c) => x.focusoutHandler(c.event as FocusEvent)}"
            @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
        >
						<slot name="control">
							<vwc-text-field
								id="text-field"
								icon="chevron-down-line"
								aria-activedescendant="${x =>	x.open ? x.ariaActiveDescendant : null}"
								aria-autocomplete="${x => x.ariaAutoComplete}"
								aria-controls="${x => x.ariaControls}"
								aria-disabled="${x => x.ariaDisabled}"
								aria-expanded="${x => x.ariaExpanded}"
								aria-haspopup="listbox"
								placeholder="${x => x.placeholder}"
								role="combobox"
								?disabled="${x => x.disabled}"
								:value="${x => x.value}"
								@input="${(x, c) => x.inputHandler(c.event as InputEvent)}"
								@keyup="${(x, c) => x.keyupHandler(c.event as KeyboardEvent)}"
								${ref('control')}
							></vwc-text-field>
						</slot>
						<vwc-popup
							anchor="text-field"
							?open="${x => x.open}">
							<div
								id="${x => x.listboxId}"
								role="listbox"
								?disabled="${x => x.disabled}"
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
						</vwc-popup>
        </template>
    `;
