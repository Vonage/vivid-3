import { html, when } from '@microsoft/fast-element';
import type { ViewTemplate } from '@microsoft/fast-element';
import type { CheckboxOptions, FoundationElementTemplate } from '@microsoft/fast-foundation';
import { classNames } from '@microsoft/fast-web-utilities';
import { getFeedbackTemplate } from '../../shared/patterns';
import { focusTemplateFactory } from '../../shared/patterns/focus';
import { Icon } from '../icon/icon';
import type { Checkbox } from './checkbox';

const getClasses = ({
	connotation,
	readOnly,
	checked,
	disabled,
	indeterminate,
	errorValidationMessage,
	successText
}: Checkbox) =>
	classNames(
		'base',
		[`connotation-${connotation}`, Boolean(connotation)],
		['readonly', Boolean(readOnly)],
		['checked', Boolean(checked) || Boolean(indeterminate)],
		['disabled', Boolean(disabled)],
		['error connotation-alert', Boolean(errorValidationMessage)],
		['success connotation-success', !!successText]
	);

/**
 * The template for the Checkbox component.
 *
 * @param context - element definition context
 * @public
 */
export const CheckboxTemplate: FoundationElementTemplate<ViewTemplate<Checkbox>, CheckboxOptions> = (context) => {
	const focusTemplate = focusTemplateFactory(context);
	const iconTag = context.tagFor(Icon);

	return html`<div class="${getClasses}"
			role="checkbox"
			aria-checked="${x => x.checked}"
			aria-required="${x => x.required}"
			aria-disabled="${x => x.disabled}"
			aria-readonly="${x => x.readOnly}"
			tabindex="${x => (x.disabled ? null : 0)}"
			@keypress="${(x, c) => x.keypressHandler(c.event as KeyboardEvent)}"
			@click="${(x, c) => x.clickHandler(c.event)}">
			<div class="control">
				${when(x => x.checked, html<Checkbox>`<${iconTag} name="check-solid" class="icon"></${iconTag}>`)}
				${when(x => x.indeterminate, html<Checkbox>`<${iconTag} name="minus-solid" class="icon"></${iconTag}>`)}
				${() => focusTemplate}
			</div>
			${() => html<Checkbox>`<label>${x => x.label}<slot></slot></label>`}
		</div>
		${when(x => x.helperText?.length, getFeedbackTemplate('helper', context))}
		${when(x => !x.successText && x.errorValidationMessage, getFeedbackTemplate('error', context))}
		${when(x => x.successText, getFeedbackTemplate('success', context))}`;
};
