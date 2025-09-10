import { html } from '@microsoft/fast-element';
import { classNames } from '@microsoft/fast-web-utilities';
import {
	affixIconTemplateFactory,
	IconWrapper,
} from '../../shared/patterns/affix';
import type { VividElementDefinitionContext } from '../../shared/design-system/defineVividComponent';
import type { NavItem } from './nav-item';

const getClasses = ({ text, connotation, appearance, current }: NavItem) =>
	classNames(
		'control',
		['icon-only', !text],
		[`connotation-${connotation}`, Boolean(connotation)],
		[`appearance-${appearance}`, Boolean(appearance)],
		['current selected', Boolean(current)]
	);

export const NavItemTemplate = (context: VividElementDefinitionContext) => {
	const affixIconTemplate = affixIconTemplateFactory(context);
	return html<NavItem>`${(x) =>
		x._renderLinkElement(
			html`${(x) => affixIconTemplate(x.icon, IconWrapper.Slot)}
				${(x) => x.text} <slot name="meta"></slot>`,
			getClasses
		)}`;
};
