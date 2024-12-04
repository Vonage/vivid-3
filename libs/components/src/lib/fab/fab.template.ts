import { html, ref } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { Fab } from './fab';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';

const getClasses = ({
	connotation,
	size,
	icon,
	label,
	iconTrailing,
	disabled,
	iconSlottedContent,
}: Fab) =>
	classNames(
		'control',
		[`connotation-${connotation}`, Boolean(connotation)],
		[`size-${size}`, Boolean(size)],
		['icon-only', !label && !!(icon || iconSlottedContent?.length)],
		['icon-trailing', iconTrailing],
		['disabled', disabled]
	);

export const FabTemplate = (context: VividElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html`
		<button
			class="${getClasses} "
			?autofocus="${(x) => x.autofocus}"
			?disabled="${(x) => x.disabled}"
			form="${(x) => x.formId}"
			formaction="${(x) => x.formaction}"
			formenctype="${(x) => x.formenctype}"
			formmethod="${(x) => x.formmethod}"
			formnovalidate="${(x) => x.formnovalidate}"
			formtarget="${(x) => x.formtarget}"
			name="${(x) => x.name}"
			type="${(x) => x.type}"
			value="${(x) => x.value}"
			aria-atomic="${(x) => x.ariaAtomic}"
			aria-busy="${(x) => x.ariaBusy}"
			aria-current="${(x) => x.ariaCurrent}"
			aria-details="${(x) => x.ariaDetails}"
			aria-disabled="${(x) => x.ariaDisabled}"
			aria-expanded="${(x) => x.ariaExpanded}"
			aria-haspopup="${(x) => x.ariaHaspopup}"
			aria-hidden="${(x) => x.ariaHidden}"
			aria-invalid="${(x) => x.ariaInvalid}"
			aria-keyshortcuts="${(x) => x.ariaKeyshortcuts}"
			aria-label="${(x) => x.ariaLabel}"
			aria-live="${(x) => x.ariaLive}"
			aria-pressed="${(x) => x.ariaPressed}"
			aria-relevant="${(x) => x.ariaRelevant}"
			aria-roledescription="${(x) => x.ariaRoledescription}"
			${ref('control')}
		>
			${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)} ${(x) => x.label}
		</button>
	`;
};
