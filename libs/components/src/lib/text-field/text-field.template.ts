import { html, ref, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { affixIconTemplateFactory } from '../../shared/patterns/affix';
import { getFeedbackTemplate } from '../../shared/patterns';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { renderInLightDOM } from '../../shared/templating/render-in-light-dom';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { TextField } from './text-field';

const getControlId = (id: string) => `vvd-text-field-control-${id}`;
const getHelperTextId = (id: string) => `vvd-text-field-helper-text-${id}`;

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

	return html<TextField>`
		<div class="base ${getStateClasses}">
			${when((x) => x.charCount && x.maxlength, renderCharCount())}
			<slot class="label" name="_label"></slot>
			${renderInLightDOM(html<TextField>`
				${when(
					(x) => x.label,
					html<TextField>`
						<label slot="_label" for="${(x) => getControlId(x._uniqueId)}">
							${(x) => x.label}
						</label>
					`
				)}
			`)}
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
					${renderInLightDOM(
						html<TextField>`<input
							slot="_control"
							id="${(x) => getControlId(x._uniqueId)}"
							class="_vvd-3-text-field-safari-workaround"
							@input="${(x) => x.handleTextInput()}"
							@change="${(x) => x.handleChange()}"
							@blur="${(x) => {
								x.$emit('blur', undefined, { bubbles: false });
							}}"
							@focus="${(x) => {
								x.$emit('focus', undefined, { bubbles: false });
							}}"
							?autofocus="${(x) => x.autofocus}"
							?disabled="${(x) => x.disabled}"
							?readonly="${(x) => x.readOnly}"
							?required="${(x) => x.required}"
							?spellcheck="${(x) => x.spellcheck}"
							list="${(x) => x.list}"
							maxlength="${(x) => x.maxlength}"
							minlength="${(x) => x.minlength}"
							pattern="${(x) => x.pattern}"
							placeholder="${(x) => x.placeholder}"
							size="${(x) => x.size}"
							autocomplete="${(x) => x.autoComplete}"
							type="${(x) => x.type}"
							inputmode="${(x) => x.inputMode}"
							aria-describedby="${(x) =>
								x._mirroredHelperText ? getHelperTextId(x._uniqueId) : null}"
							value="${(x) => x.initialValue}"
							${delegateAria()}
							${ref('control')}
						/>`
					)}
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
		<slot name="_mirrored-helper-text"></slot>
		${renderInLightDOM(html<TextField>`
			<div
				id="${(x) => getHelperTextId(x._uniqueId)}"
				slot="_mirrored-helper-text"
			>
				${(x) => x._mirroredHelperText}
			</div>
		`)}
	`;
};
