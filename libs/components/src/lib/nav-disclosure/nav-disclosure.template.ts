import { html, ref } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import { Icon } from '../icon/icon';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import { delegateAria } from '../../shared/aria/delegates-aria';
import type { NavDisclosure } from './nav-disclosure';

const getClasses = ({
	appearance,
	connotation,
	current,
	open,
}: NavDisclosure) =>
	classNames(
		'control',
		[`appearance-${appearance}`, Boolean(appearance)],
		[`connotation-${connotation}`, Boolean(connotation)],
		['current-closed selected', Boolean(current) && !open]
	);

export const NavDisclosureTemplate = (
	context: VividElementDefinitionContext
) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	const iconTag = context.tagFor(Icon);

	return html<NavDisclosure>`<details class="base" ${ref('details')} ?open=${(
		x
	) => x.open}>
		<summary class="${getClasses}"
			aria-controls="disclosure-content"
			${delegateAria({
				role: 'button',
				ariaExpanded: (x) => x.open,
				ariaCurrent: (x) =>
					x.open ? null : x.current || x.ariaCurrent ? 'true' : null,
			})}
		>
			${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)}
			${(x) => x.label}
			<slot name="meta"></slot>
			<${iconTag} class="toggleIcon" name=${(x) =>
		x.open ? 'chevron-up-line' : 'chevron-down-line'}
				aria-hidden="true"></${iconTag}>
		</summary>
		<div class="content" id="disclosure-content">
			<slot></slot>
		</div>
	</details>
	`;
};
