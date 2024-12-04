import { html, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { getFeedbackTemplate } from '../../shared/patterns';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
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
	scale,
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
		[`size-${scale}`, Boolean(scale)]
	);

/**
 *
 */
function renderCharCount() {
	return html<TextField>`
		<span class="char-count"
			>${(x) => (x.value ? x.value.length : 0)} / ${(x) => x.maxlength}</span
		>
	`;
}

export const TextfieldTemplate = (context: VividElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html<TextField>` <div class="base ${getStateClasses}">
			${when((x) => x.charCount && x.maxlength, renderCharCount())}
			<slot class="label" name="_label"></slot>
			<div class="fieldset">
				<div class="leading-items-wrapper">
					<slot
						name="leading-action-items"
						${slotted('leadingActionItemsSlottedContent')}
					></slot>
					${(x) => affixIconTemplate(x.icon)}
				</div>

				<div class="wrapper">
					<slot class="control" name="_control"></slot>
				</div>
				<div class="action-items-wrapper">
					<slot
						name="action-items"
						${slotted('actionItemsSlottedContent')}
					></slot>
				</div>
			</div>
			${getFeedbackTemplate(context)}
		</div>
		<slot name="_mirrored-helper-text"></slot>`;
};
