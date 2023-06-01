import { html, ref, slotted, ViewTemplate, when } from '@microsoft/fast-element';
import type { ElementDefinitionContext, FoundationElementDefinition } from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import { Listbox } from '../listbox/listbox';
import { Popup } from '../popup/popup';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { getFeedbackTemplate} from '../../shared/patterns';
import { focusTemplateFactory } from './../../shared/patterns/focus';
import type { Select } from './select';



const getStateClasses = ({
	shape,
	disabled,
	appearance,
	metaSlottedContent,
	errorValidationMessage,
	successText
}: Select) => classNames(
	['disabled', disabled],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
	['has-meta', Boolean(metaSlottedContent?.length)],
	['error connotation-alert', Boolean(errorValidationMessage)],
	['success connotation-success', !!successText]
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

function selectValue(context: ElementDefinitionContext) {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const focusTemplate = focusTemplateFactory(context);
	return html<Select>`
		<div
					class="control ${getStateClasses}"
					?disabled="${x => x.disabled}"
					id="control"
					${ref('_anchor')}
				>
					<div class="selected-value">
						${x => affixIconTemplate(x.icon)}
						<span class="text">${x => x.displayValue}</span>
						<slot name="meta" ${slotted('metaSlottedContent')}></slot>
					</div>
					${() => affixIconTemplate('chevron-down-line')}
					${() => focusTemplate}
				</div>
	`;
}

/**
 * @param context
 */
function renderControl(context: ElementDefinitionContext) {
	const focusTemplate = focusTemplateFactory(context);
	const popupTag = context.tagFor(Popup);

	return html<Select>`
			${when(x => x.label, renderLabel())}
			<div class="control-wrapper">
				${when(x => !x.multiple, selectValue(context))}
				<${popupTag}
					?open="${x => (x.collapsible ? x.open : true)}"
					anchor="control"
					placement="bottom-start"
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
								${when(x => x.multiple, focusTemplate)}
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
			${when(x =>  x.helperText?.length, getFeedbackTemplate('helper', context))}
			${when(x => !x.successText && x.errorValidationMessage, getFeedbackTemplate('error', context))}
			${when(x => x.successText, getFeedbackTemplate('success', context))}
		`;

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

	return html<Select>`
	  <template class="base"
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
            ${renderControl(context)}
		</template>
	`;
};
