import { html, slotted, when } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import { getFeedbackTemplate } from '../../shared/patterns';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { Checkbox } from './checkbox';

const getClasses = ({
	connotation,
	readOnly,
	checked,
	disabled,
	indeterminate,
	errorValidationMessage,
	successText,
	label,
	slottedContent,
}: Checkbox) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		['readonly', Boolean(readOnly)],
		['checked', Boolean(checked) || Boolean(indeterminate)],
		['disabled', Boolean(disabled)],
		['error connotation-alert', Boolean(errorValidationMessage)],
		['success connotation-success', !!successText],
		['hide-label', !label && !slottedContent?.length]
	);

export const CheckboxTemplate = (context: VividElementDefinitionContext) => {
	const iconTag = context.tagFor(Icon);

	return html`<template>
		<div
			class="${getClasses}"
			${delegateAria({
				role: 'checkbox',
				ariaChecked: (x) => (x.indeterminate ? 'mixed' : x.checked),
				ariaRequired: (x) => x.required,
				ariaDisabled: (x) => x.disabled,
				ariaReadOnly: (x) => x.readOnly,
			})}
			tabindex="${(x) =>
				x.tabindex !== null ? x.tabindex : x.disabled ? null : 0}"
			@keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
			@click="${(x, c) => x.clickHandler(c.event)}"
		>
			<div class="control">
				${when(
					(x) => x.checked,
					html<Checkbox>`<${iconTag} name="check-solid" class="icon"></${iconTag}>`
				)}
				${when(
					(x) => x.indeterminate,
					html<Checkbox>`<${iconTag} name="minus-solid" class="icon"></${iconTag}>`
				)}
			</div>
			${html<Checkbox>`<label
				>${(x) => x.label}<slot ${slotted('slottedContent')}></slot
			></label>`}
		</div>
		${getFeedbackTemplate(context)}
	</template>`;
};
