import type {ViewTemplate} from '@microsoft/fast-element';
import {html, ref, when} from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import {classNames} from '@microsoft/fast-web-utilities';
import {Shape} from '../enums';
import {getFeedbackTemplate} from '../../shared/patterns';
import {focusTemplateFactory} from '../../shared/patterns/focus';
import {Button} from '../button/button';
import {Divider} from '../divider/divider';
import type {NumberField} from './number-field';

const ADD = 1;
const SUBTRACT = -1;

const getStateClasses = ({
	errorValidationMessage,
	disabled,
	value,
	readOnly,
	placeholder,
	appearance,
	shape,
	label,
	successText
}: NumberField) => classNames(
	['error connotation-alert', Boolean(errorValidationMessage)],
	['disabled', disabled],
	['has-value', Boolean(value)],
	['readonly', readOnly],
	['placeholder', Boolean(placeholder)],
	[`appearance-${appearance}`, Boolean(appearance)],
	[`shape-${shape}`, Boolean(shape)],
	['no-label', !label],
	['success connotation-success', !!successText]
);

/**
 *
 *
 * @returns HTMLElement - template
 */
function renderLabel() {
	return html<NumberField>`
	  <label for="control" class="label">
		  ${x => x.label}
	  </label>`;
}

/**
 *
 *
 * @param NumberField - number
 * @param direction - direction
 */
function adjustValueByStep(numberField: NumberField, direction = ADD) {
	numberField.value = (Number(numberField.value) + direction * (numberField.step ? numberField.step : 1)).toString();
}

/**
 *
 *
 * @param  numberField - number field
 * @returns  control
 */
function setControlButtonShape(numberField: NumberField) {
	return numberField.shape === Shape.Pill ? Shape.Pill : null;
}

/**
 *
 *
 * @param  numberField - number field
 * @returns  tabindex
 */
function getTabIndex(numberField: NumberField) {
	return (numberField.disabled || numberField.readOnly) ? '-1' : null;
}

/**
 *
 *
 * @param  ElementDefinitionContext - context element definition
 * @returns HTMLElement - template
 */
function numberControlButtons(context: ElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);
	const dividerTag = context.tagFor(Divider);

	return html<NumberField>`
			<div class="control-buttons"
			     ?inert="${x => x.disabled || x.readOnly}">
				<${buttonTag} id="subtract" icon="minus-line"
					  					aria-controls="control"
					            shape="${ setControlButtonShape }"
					            size="condensed"
					  					tabindex="${getTabIndex}"
					            @click="${x => adjustValueByStep(x, SUBTRACT)}"></${buttonTag}>
				<${dividerTag} class="divider" orientation="vertical"></${dividerTag}>
				<${buttonTag} id="add" icon="plus-line"
					  					aria-controls="control"
					            shape="${ setControlButtonShape }"
					            size="condensed"
					  					tabindex="${getTabIndex}"
					            @click="${x => adjustValueByStep(x)}"></${buttonTag}>
		    </div>
	`;
}

/**
 * The template for the {@link @microsoft/fast-foundation#NumberField} component.
 *
 * @param  ElementDefinitionContext - context element definition
 * @returns HTMLElement - template
 */
export const NumberFieldTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<NumberField> = (context) => {
	const focusTemplate = focusTemplateFactory(context);

	return html<NumberField>`
	<div class="base ${getStateClasses}">
    ${when(x => x.label, renderLabel())}
    <div class="fieldset">
      <input class="control"
             id="control"
             @input="${x => x.handleTextInput()}"
             @change="${x => x.handleChange()}"
             ?autofocus="${x => x.autofocus}"
             ?disabled="${x => x.disabled}"
             list="${x => x.list}"
             step="${x => x.step ? x.step : null}"
             max="${x => x.max}"
             min="${x => x.min}"
             maxlength="${x => x.maxlength}"
             minlength="${x => x.minlength}"
             placeholder="${x => x.placeholder}"
             ?readonly="${x => x.readOnly}"
             ?required="${x => x.required}"
             size="${x => x.size}"
             autocomplete="${x => x.autoComplete}"
             name="${x => x.name}"
             ?spellcheck="${x => x.spellcheck}"
             :value="${x => x.value}"
             type="text"
             aria-atomic="${x => x.ariaAtomic}"
             aria-busy="${x => x.ariaBusy}"
             aria-controls="${x => x.ariaControls}"
             aria-current="${x => x.ariaCurrent}"
             aria-describedby="${x => x.ariaDescribedby}"
             aria-details="${x => x.ariaDetails}"
             aria-disabled="${x => x.ariaDisabled}"
             aria-errormessage="${x => x.ariaErrormessage}"
             aria-flowto="${x => x.ariaFlowto}"
             aria-haspopup="${x => x.ariaHaspopup}"
             aria-hidden="${x => x.ariaHidden}"
             aria-invalid="${x => x.ariaInvalid}"
             aria-keyshortcuts="${x => x.ariaKeyshortcuts}"
             aria-label="${x => x.ariaLabel}"
             aria-labelledby="${x => x.ariaLabelledby}"
             aria-live="${x => x.ariaLive}"
             aria-owns="${x => x.ariaOwns}"
             aria-relevant="${x => x.ariaRelevant}"
             aria-roledescription="${x => x.ariaRoledescription}"
             ${ref('control')}
      />
      ${() => focusTemplate}
      ${() => numberControlButtons(context)}
    </div>
	  ${when(x => !x.successText && !x.errorValidationMessage && x.helperText?.length, getFeedbackTemplate('helper', context))}
	  ${when(x => !x.successText && x.errorValidationMessage, getFeedbackTemplate('error', context))}
	  ${when(x => x.successText, getFeedbackTemplate('success', context))}
	</div>
`;
};
