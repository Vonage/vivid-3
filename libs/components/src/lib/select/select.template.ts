import { html, ref, slotted, ViewTemplate, when } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
// import { classNames } from '@microsoft/fast-web-utilities';
import { Listbox } from '../listbox/listbox.js';
import { affixIconTemplateFactory } from '../shared/patterns/affix.js';
// import { focusTemplateFactory } from '../shared/patterns/focus.js';
import type { Select } from './select';


// const getStateClasses = ({
// 	disabled,
// }: Select) => classNames(
// 	['disabled', disabled],
// );

// function renderInput(context: ElementDefinitionContext) {
// 	const affixIconTemplate = affixIconTemplateFactory(context);
// 	const focusTemplate = focusTemplateFactory(context);

// 	return html<Select>`
//       <div class="base ${getStateClasses}">

// 			<div class="fieldset">
// 				<button
// 					id="control"
// 					class="control"
// 					aria-activedescendant="${x =>	x.open ? x.ariaActiveDescendant : null}"
// 					aria-autocomplete="${x => x.ariaAutoComplete}"
// 					aria-controls="${x => x.ariaControls}"
// 					aria-disabled="${x => x.ariaDisabled}"
// 					aria-expanded="${x => x.ariaExpanded}"
// 					aria-haspopup="listbox"
// 					role="combobox"
// 					type="text"
// 					?disabled="${x => x.disabled}"
// 					:value="${x => x.value}"
// 					${ref('control')}
// 				/></button>
// 				${() => affixIconTemplate('chevron-down-line')}
// 				${() => focusTemplate}
// 			</div>
// 		</div>`;
// }

/**
 * @param context
 */
function renderControl(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);
	// const focusTemplate = focusTemplateFactory(context);

	return html<Select>`
		<div
			class="control"
			?disabled="${x => x.disabled}"
			${ref('control')}
			>
			<div class="selected-value">
				${x => x.displayValue}
			</div>
		</div>
		${() => affixIconTemplate('chevron-down-line')}
		`;
	// ${() => focusTemplate}
}


/**
 * The template for the {@link @microsoft/fast-foundation#Select} component.
 *
 * @param
 * @param context
 * @public
 */
export const SelectTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<Select> = (context: ElementDefinitionContext) => html<Select>`
	  <template
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
            @mousedown="${(x, c) => x.mousedownHandler(c.event as MouseEvent)}"
        >
            ${when(x => x.collapsible, renderControl(context))}

            <div
                class="listbox"
                id="${x => x.listboxId}"
                part="listbox"
                role="listbox"
                ?disabled="${x => x.disabled}"
                ?hidden="${x => (x.collapsible ? !x.open : false)}"
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
        </template>`;
