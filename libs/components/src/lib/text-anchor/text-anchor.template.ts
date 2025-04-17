import { html, ref } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { delegateAria } from '../../shared/aria/delegates-aria';
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

	return html<TextAnchor>`<a
		class="${getClasses}"
		download="${(x) => x.download}"
		href="${(x) => x.href}"
		hreflang="${(x) => x.hreflang}"
		ping="${(x) => x.ping}"
		referrerpolicy="${(x) => x.referrerpolicy}"
		rel="${(x) => x.rel}"
		target="${(x) => x.target}"
		type="${(x) => x.type}"
		${delegateAria()}
		${ref('control')}
	>
		${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)} ${(x) => x.text}
		${(x) => x.getBodyTemplate?.() ?? ''}
	</a> `;
};
