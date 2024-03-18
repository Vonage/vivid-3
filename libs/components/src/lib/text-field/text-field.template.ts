import type { ViewTemplate } from '@microsoft/fast-element';
import { html, slotted, when } from '@microsoft/fast-element';
import type {
	ElementDefinitionContext,
	FoundationElementDefinition,
} from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { getFeedbackTemplate } from '../../shared/patterns';
import type { TextField } from './text-field';

const getStateClasses = ({
	errorValidationMessage,
	disabled,
	value,
	readOnly,
	placeholder,
	appearance,
	shape,
	label,
	successText,
	actionItemsSlottedContent,
	leadingActionItemsSlottedContent,
	icon,
	customPart,
}: TextField) =>
	classNames(
		['error', Boolean(errorValidationMessage)],
		['disabled', disabled],
		['has-value', Boolean(value)],
		['readonly', readOnly],
		['placeholder', Boolean(placeholder)],
		[`appearance-${appearance}`, Boolean(appearance)],
		[`shape-${shape}`, Boolean(shape)],
		['no-label', !label],
		['has-icon', !!icon],
		['success', Boolean(successText)],
		['action-items', !!actionItemsSlottedContent?.length],
		['leading-action-items', !!leadingActionItemsSlottedContent?.length],
		['no-leading', !(leadingActionItemsSlottedContent?.length || icon)],
		['custom-part', Boolean(customPart)]
	);

/**
 *
 */
function renderCharCount() {
	return html<TextField>`
		<span class="char-count">${x => x.value ? x.value.length : 0 } / ${ x => x.maxlength }</span>
	`;
}

/**
 * The template for the TextField component.
 *
 * @param context - element definition context
 * @public
 */
export const TextfieldTemplate: (
	context: ElementDefinitionContext,
	definition: FoundationElementDefinition
) => ViewTemplate<TextField> = (context: ElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<TextField>`
	<div class="base ${getStateClasses}">
    ${when(x => x.charCount && x.maxlength, renderCharCount())}
    <slot class="label" name="_label"></slot>
    <div class="fieldset">
			<div class="leading-items-wrapper">
				<slot name="leading-action-items"  ${slotted('leadingActionItemsSlottedContent')}></slot>
				${x => affixIconTemplate(x.icon)}
			</div>

			<div class="wrapper">
				<slot class="control" name="_control"></slot>
			</div>
			<div class="action-items-wrapper">
				<slot name="action-items"  ${slotted('actionItemsSlottedContent')}></slot>
			</div>

    </div>
	  ${when(x => !x.successText && !x.errorValidationMessage && x.helperText?.length, getFeedbackTemplate('helper', context))}
	  ${when(x => !x.successText && x.errorValidationMessage, getFeedbackTemplate('error', context))}
	  ${when(x => x.successText, getFeedbackTemplate('success', context))}
	</div>`;
};
