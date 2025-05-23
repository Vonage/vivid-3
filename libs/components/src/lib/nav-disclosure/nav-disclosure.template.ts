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

function getAriaCurrent(ariaCurrent: string | null, open: boolean) {
	return open ? null : ariaCurrent;
}

const getClasses = ({ appearance, connotation }: NavDisclosure) =>
	classNames(
		'control',
		[`appearance-${appearance}`, Boolean(appearance)],
		[`connotation-${connotation}`, Boolean(connotation)]
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
								ariaCurrent: (x) => getAriaCurrent(x.ariaCurrent, x.open),
							})}
		>
			${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)}
			${(x) => x.label}
			<slot name="meta"></slot>
			<${iconTag} class="toggleIcon" name=${(x) =>
		x.open ? 'chevron-up-solid' : 'chevron-down-solid'}
									aria-hidden="true"></${iconTag}>
		</summary>
		<div class="content" id="disclosure-content">
			<slot></slot>
		</div>
	</details>
	`;
};
