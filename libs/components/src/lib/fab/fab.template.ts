import { html, ref } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { Fab } from './fab';

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
			${delegateAria()}
			${ref('control')}
		>
			${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)} ${(x) => x.label}
		</button>
	`;
};
