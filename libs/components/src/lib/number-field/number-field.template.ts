import { html, ref, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { Shape } from '../enums';
import { Button } from '../button/button';
import { Divider } from '../divider/divider';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { delegateAria } from '../../shared/aria/delegates-aria';
import { VisuallyHidden } from '../visually-hidden/visually-hidden';
import type { NumberField } from './number-field';

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
	scale,
}: NumberField) =>
	classNames(
		['error', Boolean(errorValidationMessage)],
		['disabled', disabled],
		['has-value', Boolean(value)],
		['readonly', readOnly],
		['placeholder', Boolean(placeholder)],
		[`appearance-${appearance}`, Boolean(appearance)],
		[`shape-${shape}`, Boolean(shape)],
		['no-label', !label],
		['success', !!successText],
		[`size-${scale}`, Boolean(scale)]
	);

function renderLabel() {
	return html<NumberField>` <label for="control" class="label">
		${(x) => x.label}
	</label>`;
}

function setControlButtonShape(numberField: NumberField) {
	return numberField.shape === Shape.Pill ? Shape.Pill : null;
}

function getTabIndex(numberField: NumberField) {
	return numberField.disabled || numberField.readOnly ? '-1' : null;
}

/**
 * @param context - element definition context
 */
function numberControlButtons(context: VividElementDefinitionContext) {
	const buttonTag = context.tagFor(Button);
	const dividerTag = context.tagFor(Divider);

	return html<NumberField>`
		<div class="control-buttons" ?inert="${(x) => x.disabled || x.readOnly}">
			<${buttonTag} id="subtract" icon="minus-line"
				?disabled="${(x) => x.disabled || x.readOnly}"
				aria-label=${(x) =>
					x.decrementButtonAriaLabel ||
					x.locale.numberField.decrementButtonLabel(x.step)}
				shape="${setControlButtonShape}"
				type="button"
				size="${(x) => (x.scale === 'condensed' ? 'super-condensed' : 'condensed')}"
				tabindex="${getTabIndex}"
				@click="${(x) => x.stepDown()}"></${buttonTag}>
			<${dividerTag} class="divider" orientation="vertical"></${dividerTag}>
			<${buttonTag} id="add" icon="plus-line"
				?disabled="${(x) => x.disabled || x.readOnly}"
				aria-label=${(x) =>
					x.incrementButtonAriaLabel ||
					x.locale.numberField.incrementButtonLabel(x.step)}
				shape="${setControlButtonShape}"
				type="button"
				size="${(x) => (x.scale === 'condensed' ? 'super-condensed' : 'condensed')}"
				tabindex="${getTabIndex}"
				@click="${(x) => x.stepUp()}"></${buttonTag}>
			</div>
	`;
}

export const NumberFieldTemplate = (context: VividElementDefinitionContext) => {
	const visuallyHiddenTag = context.tagFor(VisuallyHidden);
	return html<NumberField>`
		<div class="base ${getStateClasses}">
			${when((x) => x.label, renderLabel())}
			<div class="fieldset">
				<div class="wrapper">
					<input
						class="control"
						id="control"
						@input="${(x) => x.handleTextInput()}"
						@change="${(x) => x.handleChange()}"
						@keydown="${(x, c) => x.handleKeyDown(c.event as KeyboardEvent)}"
						?autofocus="${(x) => x.autofocus}"
						?disabled="${(x) => x.disabled}"
						list="${(x) => x.list}"
						maxlength="${(x) => x.maxlength}"
						minlength="${(x) => x.minlength}"
						placeholder="${(x) => x.placeholder}"
						?readonly="${(x) => x.readOnly}"
						?required="${(x) => x.required}"
						size="${(x) => x.size}"
						autocomplete="${(x) => x.autoComplete}"
						name="${(x) => x.name}"
						?spellcheck="${(x) => x.spellcheck}"
						:value="${(x) => x._presentationValue}"
						type="text"
						aria-describedby="${(x) => x._feedbackDescribedBy}"
						${delegateAria()}
						${ref('control')}
					/>
				</div>
				${() => numberControlButtons(context)}
			</div>
			${(x) => x._getFeedbackTemplate(context)}
			<${visuallyHiddenTag} id="value-announcement" role="status" aria-atomic="true">
				${(x) => x._updatedValueAnnouncement}</${visuallyHiddenTag}>
		</div>
	`;
};
