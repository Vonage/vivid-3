import { html, ref } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { TextAnchor } from './text-anchor';

const getClasses = ({ text, connotation, appearance }: TextAnchor) =>
	classNames(
		'control',
		['icon-only', !text],
		[`connotation-${connotation}`, Boolean(connotation)],
		[`appearance-${appearance}`, Boolean(appearance)]
	);

export const textAnchorTemplate = (context: VividElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);

	return html`<a
		class="${getClasses}"
		download="${(x) => x.download}"
		href="${(x) => x.href}"
		hreflang="${(x) => x.hreflang}"
		ping="${(x) => x.ping}"
		referrerpolicy="${(x) => x.referrerpolicy}"
		rel="${(x) => x.rel}"
		target="${(x) => x.target}"
		type="${(x) => x.type}"
		aria-atomic="${(x) => x.ariaAtomic}"
		aria-busy="${(x) => x.ariaBusy}"
		aria-current="${(x) => x.ariaCurrent}"
		aria-details="${(x) => x.ariaDetails}"
		aria-disabled="${(x) => x.ariaDisabled}"
		aria-errormessage="${(x) => x.ariaErrormessage}"
		aria-expanded="${(x) => x.ariaExpanded}"
		aria-haspopup="${(x) => x.ariaHaspopup}"
		aria-hidden="${(x) => x.ariaHidden}"
		aria-invalid="${(x) => x.ariaInvalid}"
		aria-keyshortcuts="${(x) => x.ariaKeyshortcuts}"
		aria-label="${(x) => x.ariaLabel}"
		aria-live="${(x) => x.ariaLive}"
		aria-relevant="${(x) => x.ariaRelevant}"
		aria-roledescription="${(x) => x.ariaRoledescription}"
		${ref('control')}
	>
		${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)} ${(x) => x.text}
		${(x) => x.getBodyTemplate?.() ?? ''}
	</a> `;
};
