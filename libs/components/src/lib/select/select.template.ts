import { html, ref, slotted, ViewTemplate, when } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import { Listbox } from '../listbox/listbox';
import { Popup } from '../popup/popup';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
// import { focusTemplateFactory } from '../shared/patterns/focus.js';
import type { Select } from './select';



const getStateClasses = ({
	shape,
	disabled,
	appearance,
	label
}: Select) => classNames(
	['disabled', disabled],
	[`appearance-${appearance}`, Boolean(appearance)],
	['no-label', !label],
	[`shape-${shape}`, Boolean(shape)],
);

/**
 *
 */
function renderLabel() {
	return html<Select>`
	  <label for="control" class="label">
		  ${x => x.label}
	  </label>`;
}


/**
 * @param context
 */
function renderControl(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);
	// const focusTemplate = focusTemplateFactory(context);
	const popupTag = context.tagFor(Popup);

	return html<Select>`
			${when(x => x.label, renderLabel())}
			<div class="control-wrapper">
				<div
					class="control"
					?disabled="${x => x.disabled}"
					id="control"
					${ref('control')}
				>
					<div class="selected-value">
						${x => x.displayValue}
					</div>
					${() => affixIconTemplate('chevron-down-line')}
				</div>
				<${popupTag}
					?open="${x => (x.collapsible ? x.open : true)}"
					anchor="control"
							strategy="absolute"
							${ref('_popup')}
							class="popup"
							>
							<div
                id="${x => x.listboxId}"
                role="listbox"
                ?disabled="${x => x.disabled}"
                ${ref('listbox')}
								class="list-box"
								>
                <slot
                    ${slotted({
		filter: Listbox.slottedOptionFilter as any,
		flatten: true,
		property: 'slottedOptions',
	})}
                ></slot>
            </div>
					</${popupTag}>
			</div>
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
) => ViewTemplate<Select> = (context: ElementDefinitionContext) => {
	// const popupTag = context.tagFor(Popup);

	return html<Select>`
	  <div class="base ${getStateClasses}"
				 		${ref('_anchor')}
            aria-activedescendant="${x => x.ariaActiveDescendant}"
            aria-controls="${x => x.ariaControls}"
            aria-disabled="${x => x.ariaDisabled}"
            aria-expanded="${x => x.ariaExpanded}"
            aria-haspopup="${x => (x.collapsible ? 'listbox' : null)}"
            aria-multiselectable="${x => x.ariaMultiSelectable}"
            ?open="${x => x.open}"
            role="select"
            tabindex="${x => (!x.disabled ? '0' : null)}"
            @click="${(x, c) => x.clickHandler(c.event as MouseEvent)}"
            @focusin="${(x, c) => x.focusinHandler(c.event as FocusEvent)}"
            @focusout="${(x, c) => x.focusoutHandler(c.event as FocusEvent)}"
            @keydown="${(x, c) => x.keydownHandler(c.event as KeyboardEvent)}"
            @mousedown="${(x, c) => x.mousedownHandler(c.event as MouseEvent)}"
        >
            ${when(x => x.collapsible, renderControl(context))}
		</div>

	`;
};
